import removeMarkdown from "remove-markdown";

// rendered styles for rendered content
export const renderedStyles = {
  p: "text-primary text-md",
  h2: "text-xl text-secondary",
  h3: "text-md text-secondary",
  ol: "list-decimal pl-8",
  ul: "list-disc pl-4",
  a: "underline underline-offset-8 hover:brightness-125 text-primary text-md",
};

export const getExcerpt = (content?: string | null) => {
  if (!content) {
    return "";
  }

  const text = removeMarkdown(content);

  if (text.length > 300) {
    return `${text.slice(0, 300)}...`;
  }

  return text;
};
