import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-black/8 py-8 dark:border-white/[.145]">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-16 text-sm text-zinc-600 sm:flex-row sm:justify-between dark:text-zinc-400">
        <Logo />
        <p>&copy; {new Date().getFullYear()} Placeholder Text.</p>
      </div>
    </footer>
  );
}
