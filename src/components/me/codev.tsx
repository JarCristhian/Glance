"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface Options {
  dark: string;
  light: string;
}

type Props = {
  code: any;
  lang?: string;
  themes?: Options;
};

export function Codev({
  code,
  lang = "javascript",
  themes = { dark: "rose-pine", light: "catppuccin-latte" },
}: Props) {
  const [text, setText] = useState("");
  const { setTheme, theme } = useTheme();

  const fetchCode = async () => {
    const response = await codeToHtml(code, {
      lang: lang,
      theme: theme == "dark" ? themes.dark : themes.light,
    });
    const styledHtml = `<div class="overflow-x-scroll scrollbar text-[12px] dark:scrollbar-dark h-44 rounded-lg select-none">${response}</div>`;
    setText(styledHtml);
  };

  useEffect(() => {
    fetchCode();
  }, [code, theme]);

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
