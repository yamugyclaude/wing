import { Fragment, type ReactNode } from "react";

// Renders a minimal subset of Markdown used in Q&A answers: **bold** only.
export function formatAnswer(text: string): ReactNode[] {
  return text.split("\n").map((line, lineIndex) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) => {
      const match = part.match(/^\*\*([^*]+)\*\*$/);
      return match ? (
        <strong key={partIndex}>{match[1]}</strong>
      ) : (
        <Fragment key={partIndex}>{part}</Fragment>
      );
    });
    return (
      <Fragment key={lineIndex}>
        {lineIndex > 0 && <br />}
        {parts}
      </Fragment>
    );
  });
}
