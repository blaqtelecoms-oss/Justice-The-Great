import React from "react";

// Splits a string into segments, marking *...* segments as italic.
function parseInline(line) {
  const parts = line.split(/(\*[^*]+\*)/);
  return parts.filter(Boolean).map((seg) => {
    const italic = /^\*[^*]+\*$/.test(seg);
    return { text: italic ? seg.slice(1, -1) : seg, italic };
  });
}

// Plain text with *...* rendered in Instrument Serif italic (no animation).
export function InlineItalic({ text, className = "" }) {
  return (
    <span className={className}>
      {parseInline(text).map((p, i) =>
        p.italic ? (
          <span key={i} className="font-serif italic font-normal text-landing-mut">
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </span>
  );
}

// Hero headline with a masked, word-by-word slide-up reveal.
// Format: "|" = line break; a line starting with "*" is fully italic;
// inline *...* within a line marks that phrase italic.
export default function Headline({ text, baseIndex = 0, className = "" }) {
  const lines = text.split("|");
  let n = baseIndex;
  return (
    <span className={className}>
      {lines.map((line, li) => {
        const wholeItalic = line.startsWith("*");
        const clean = wholeItalic ? line.slice(1) : line;
        const segments = wholeItalic ? [{ text: clean, italic: true }] : parseInline(clean);
        return (
          <span key={li} className="block">
            {segments.map((seg, si) =>
              seg.text.split(" ").map((w, wi) => (
                <span key={`${si}-${wi}`} className="jtg-word">
                  <span style={{ "--i": n++ }} className={seg.italic ? "font-serif italic font-normal" : ""}>
                    {w}
                  </span>{" "}
                </span>
              ))
            )}
          </span>
        );
      })}
    </span>
  );
}