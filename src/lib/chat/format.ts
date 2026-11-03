/**
 * The chat bubbles show plain text, but the model sometimes answers in Markdown.
 * This removes bold, italics and headings and turns "*" or "-" bullets into "•".
 * Links written as [label](href) are left for the bubble to render.
 */
export function cleanChatText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^(\s*)[*-]\s+/gm, "$1• ")
    .replace(/(^|[^*\w])\*(?=\S)([^*\n]+?)\*(?!\w)/g, "$1$2");
}

/** Only our own pages, https links and email links become clickable in chat replies. */
export function safeChatHref(href: string): string | null {
  const url = href.trim();
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (/^https:\/\/[^\s]+$/i.test(url) || /^mailto:[^\s]+$/i.test(url)) return url;
  return null;
}

export type ChatTextPart = { text: string; href?: string };

/** Splits a reply into plain text and links, dropping any link that isn't safe. */
export function splitChatLinks(text: string): ChatTextPart[] {
  const parts: ChatTextPart[] = [];
  const regex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (let match = regex.exec(text); match; match = regex.exec(text)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) });
    const href = safeChatHref(match[2]);
    parts.push(href ? { text: match[1], href } : { text: match[1] });
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
