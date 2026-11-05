import React from "react";

interface GoldEyebrowProps {
  label: string;
  showDivider?: boolean;
  centered?: boolean;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function GoldEyebrow({
  label,
  showDivider = true,
  centered = false,
  align,
  className = "",
  dark = false,
}: GoldEyebrowProps) {
  const isCentered = centered || align === "center";

  return (
    <div
      className={`space-y-2 ${
        isCentered ? "flex flex-col items-center text-center" : "flex flex-col items-start"
      } ${className}`}
    >
      <span
        className={`font-sans text-[12px] font-semibold tracking-[0.16em] uppercase ${
          dark ? "text-brass-300" : "text-brass-700"
        }`}
      >
        {label}
      </span>
      {showDivider && (
        <div
          className={`h-[1.5px] w-6 ${
            dark ? "bg-brass-300" : "bg-brass-500"
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
