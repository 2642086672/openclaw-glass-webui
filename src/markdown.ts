// Markdown 渲染(marked + DOMPurify 净化)与消息内容工具
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { ChatMessage, MessageBlock } from './gateway/types';

marked.setOptions({ gfm: true, breaks: true });

/** 渲染 Markdown 为安全 HTML。 */
export function renderMarkdown(text: string): string {
  const html = marked.parse(text, { async: false }) as string;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li', 'blockquote',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'hr', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'del', 's', 'span',
    ],
    ALLOWED_ATTR: ['href', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

/** 从 content(string 或 blocks)提取纯文本(用于会话列表摘要等)。 */
export function extractText(content: string | MessageBlock[] | undefined): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return content
    .map(block => {
      if (block?.type === 'text' && typeof block.text === 'string') return block.text;
      if (block?.type === 'toolCall') return '';
      return '';
    })
    .join('')
    .trim();
}

/** 会话消息的可见化拆分:user/assistant 气泡 + toolCall/toolResult 卡片。 */
export type VisibleItem =
  | { kind: 'message'; role: 'user' | 'assistant'; text: string; timestamp?: number; aborted?: boolean }
  | { kind: 'tool'; toolName?: string; callId?: string; output?: string; isError?: boolean; timestamp?: number };

export function toVisibleItems(messages: ChatMessage[]): VisibleItem[] {
  const items: VisibleItem[] = [];
  for (const m of messages) {
    const blocks = Array.isArray(m.content) ? m.content : typeof m.content === 'string' ? [{ type: 'text', text: m.content } as MessageBlock] : [];
    if (m.role === 'user') {
      const text = extractText(m.content);
      if (text) items.push({ kind: 'message', role: 'user', text, timestamp: m.timestamp });
      continue;
    }
    if (m.role === 'assistant') {
      const text = extractText(m.content);
      const toolCalls = blocks.filter(b => b.type === 'toolCall');
      for (const tc of toolCalls) {
        items.push({ kind: 'tool', toolName: (tc as any).name, callId: (tc as any).id, timestamp: m.timestamp });
      }
      if (text) items.push({ kind: 'message', role: 'assistant', text, timestamp: m.timestamp, aborted: m.aborted });
      continue;
    }
    if (m.role === 'toolResult') {
      const text = extractText(m.content);
      items.push({ kind: 'tool', toolName: m.toolName, callId: m.toolCallId, output: text, isError: m.isError, timestamp: m.timestamp });
      continue;
    }
    // system / 其他:跳过
  }
  // 合并相邻 toolResult 到前一个同名 tool 调用
  const merged: VisibleItem[] = [];
  const findLastIdx = (pred: (m: VisibleItem) => boolean): number => {
    for (let i = merged.length - 1; i >= 0; i--) if (pred(merged[i])) return i;
    return -1;
  };
  for (const item of items) {
    if (item.kind === 'tool' && item.output === undefined && item.callId) {
      const dup = findLastIdx(m => m.kind === 'tool' && m.callId === item.callId && m.output === undefined);
      if (dup >= 0) { merged.push(item); continue; }
    }
    if (item.kind === 'tool' && item.output !== undefined && item.callId) {
      const idx = findLastIdx(m => m.kind === 'tool' && m.callId === item.callId && m.output === undefined);
      if (idx >= 0) {
        const target = merged[idx] as Extract<VisibleItem, { kind: 'tool' }>;
        target.output = item.output;
        target.isError = item.isError;
        continue;
      }
    }
    merged.push(item);
  }
  return merged;
}
