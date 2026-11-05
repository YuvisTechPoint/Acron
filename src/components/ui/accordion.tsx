"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-border border-y border-border ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-5 transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
            >
              <span className="font-serif text-lg sm:text-xl font-medium text-ink group-hover:text-navy-700 transition-colors">
                {item.title}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                  isOpen
                    ? "bg-navy-700 text-ivory-50 border-navy-700"
                    : "bg-surface border-border text-ink-secondary group-hover:border-navy-700 group-hover:text-navy-700"
                }`}
              >
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 transition-transform duration-200" />
                ) : (
                  <Plus className="w-3.5 h-3.5 transition-transform duration-200" />
                )}
              </div>
            </button>
            <div
              className={`grid transition-all duration-240 ease-luxury overflow-hidden ${
                isOpen ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0 pt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed pr-6">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
