"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

type AvatarMenuProps = {
  name?: string;
  imageUrl?: string;
  onSignOut?: () => void;
  className?: string;
};

export function AvatarMenu({ name, imageUrl, onSignOut, className }: AvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <Avatar name={name} imageUrl={imageUrl} size="md" />
        <ChevronDown className="h-4 w-4 text-navy" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-cream p-2 shadow-lg"
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5"
          >
            <User className="h-4 w-4" />
            My Profile
          </Link>
          <Link
            href="/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <hr className="my-1 border-navy/10" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut?.();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-navy hover:bg-navy/5"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
