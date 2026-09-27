"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionVariant = "pill" | "panel";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: AccordionVariant;
};

const HEADER_BASE_STYLES = "relative flex w-full items-center justify-center px-12 py-3";

const headerVariantStyles: Record<AccordionVariant, string> = {
  pill: "bg-navy text-cream",
  panel: "bg-cream text-navy",
};

const contentVariantStyles: Record<AccordionVariant, string> = {
  pill: "bg-cream text-navy",
  panel: "bg-white text-navy",
};

function TriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={cn("h-2.5 w-2.5 shrink-0 fill-current transition-transform duration-200", className)}
    >
      <polygon points="0,0 10,5 0,10" />
    </svg>
  );
}

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("flex w-full flex-col gap-3", className)}>{children}</div>;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  variant = "pill",
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          HEADER_BASE_STYLES,
          headerVariantStyles[variant],
          isOpen ? "rounded-t-2xl" : "rounded-full"
        )}
      >
        <TriangleIcon
          className={cn("absolute left-5 top-1/2 -translate-y-1/2", isOpen && "rotate-90")}
        />
        <span className="font-semibold">{title}</span>
      </button>

      {isOpen && (
        <div id={contentId} className={cn("rounded-b-2xl px-6 py-4", contentVariantStyles[variant])}>
          {children}
        </div>
      )}
    </div>
  );
}
