"use client";

import { useEffect } from "react";

/**
 * CleanCopyHandler
 * Ensures that copying any text across the website copies ONLY the clean,
 * selected text itself without enclosing hyperlinks (<a href="...">),
 * markdown link syntax ([text](url)), or duplicated roll-text artifacts.
 */
export function CleanCopyHandler() {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      // 1. Text input / textarea selection
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        const el = document.activeElement;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        if (start !== end) {
          const selectedText = el.value.substring(start, end);
          if (e.clipboardData) {
            e.clipboardData.setData("text/plain", selectedText);
            e.clipboardData.setData("text/html", selectedText);
            e.preventDefault();
          }
          return;
        }
      }

      // 2. DOM text selection (links, headings, paragraphs, tables)
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const rawText = selection.toString();
      if (rawText && e.clipboardData) {
        // Write strictly pure text to both text/plain and text/html
        // Setting text/html to plain text permanently prevents rich editors,
        // chats, and markdown processors from auto-generating [text](url) links.
        e.clipboardData.setData("text/plain", rawText);
        e.clipboardData.setData("text/html", rawText.replace(/\n/g, "<br/>"));
        e.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return null;
}

