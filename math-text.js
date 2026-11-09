export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

// Small, dependency-free renderer for the index notation used in this quiz.
// Escape both ordinary text and index contents; never accept HTML from the bank.
export function formatMathText(value) {
  const token = /([\p{L}\p{N}∑∏∫)][\p{M}′″]*)((?:[_^](?:\{[^{}]+\}|[\p{L}\p{N}\p{M}]+))+)/gu;
  const text = String(value);
  let result = "";
  let cursor = 0;
  for (const match of text.matchAll(token)) {
    result += escapeHtml(text.slice(cursor, match.index) + match[1]);
    for (const index of match[2].matchAll(/([_^])(?:\{([^{}]+)\}|([\p{L}\p{N}\p{M}]+))/gu)) {
      const tag = index[1] === "_" ? "sub" : "sup";
      result += `<${tag}>${formatMathText(index[2] ?? index[3])}</${tag}>`;
    }
    cursor = match.index + match[0].length;
  }
  return result + escapeHtml(text.slice(cursor));
}


