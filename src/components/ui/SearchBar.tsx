"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  placeholder = "Search clubs, events, people...",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex w-72 items-center gap-2 rounded-full bg-navy/8 px-4 py-2",
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-navy/50" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label="Search clubs, events, people"
        className="w-full bg-transparent text-sm text-navy placeholder:text-navy/50 focus:outline-none"
      />
    </form>
  );
}
