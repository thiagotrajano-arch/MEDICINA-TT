import { Fragment } from "react";

/**
 * Minimal markdown renderer for study content: paragraphs, `- ` bullet lists,
 * GFM-style tables, and **bold** / *italic* inline.
 * Deliberately tiny — swap for MDX/remark when content grows.
 */
export function MiniMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let table: string[] = [];

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

  const flushTable = (key: string) => {
    if (!table.length) return;
    blocks.push(<Table key={key} rows={table} />);
    table = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    const isTableRow = line.startsWith("|") && line.endsWith("|");

    if (isTableRow) {
      flushList(`ul-${i}`);
      table.push(line);
      return;
    }
    flushTable(`tb-${i}`);

    if (/^[-*]\s+/.test(line)) {
      list.push(line);
    } else {
      flushList(`ul-${i}`);
      if (line) blocks.push(<p key={`p-${i}`}>{inline(line)}</p>);
    }
  });
  flushList("ul-end");
  flushTable("tb-end");

  return <div className="prose-med">{blocks}</div>;
}

/** Splits a GFM table row into trimmed cells. */
function cells(row: string): string[] {
  return row
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
}

/** True for the `|---|---|` separator row. */
function isSeparator(row: string): boolean {
  return /^\|[\s:|-]+\|$/.test(row) && row.includes("-");
}

function Table({ rows }: { rows: string[] }) {
  const header = rows[0] ? cells(rows[0]) : [];
  const body = rows.slice(1).filter((r) => !isSeparator(r)).map(cells);
  // A table whose first column header is empty is a comparison matrix — its
  // first column holds row labels and deserves the same emphasis as the header.
  const firstColIsLabel = header[0] === "";

  return (
    <div className="my-3 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-[13px]">
        {header.length > 0 && (
          <thead>
            <tr className="bg-surface-2">
              {header.map((h, i) => (
                <th
                  key={i}
                  className="border-b border-border px-3 py-2 font-bold text-text"
                >
                  {inline(h)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 ? "bg-surface-2/40" : undefined}>
              {row.map((c, ci) => (
                <td
                  key={ci}
                  className={`border-b border-border px-3 py-2 align-top ${
                    ci === 0 && firstColIsLabel
                      ? "font-semibold text-text"
                      : "text-text-muted"
                  }`}
                >
                  {inline(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function inline(text: string): React.ReactNode {
  // Split on **bold** and *italic*, keeping the delimiters for detection.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
