import { Fragment } from "react";

/**
 * Minimal markdown renderer for study content: paragraphs, `- ` bullet lists,
 * and **bold** inline. Deliberately tiny — swap for MDX/remark when content grows.
 */
export function MiniMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (!list.length) return;
    blocks.push(
      <ul key={key}>
        {list.map((item, i) => (
          <li key={i}>{inline(item.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (/^[-*]\s+/.test(line)) {
      list.push(line);
    } else {
      flushList(`ul-${i}`);
      if (line) blocks.push(<p key={`p-${i}`}>{inline(line)}</p>);
    }
  });
  flushList("ul-end");

  return <div className="prose-med">{blocks}</div>;
}

function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
