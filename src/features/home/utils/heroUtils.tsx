import React from "react";

export const TITLE_WORDS = [
  { text: "We", accent: false },
  { text: "Are", accent: false },
  { text: "the", accent: false },
  { text: "Fastest", accent: false },
  { text: "In", accent: false },
  { text: "Delivering", accent: true },
  { text: "Your", accent: false },
  { text: "Food", accent: true },
];

export function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-[#FFCF27]/50 text-inherit">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}