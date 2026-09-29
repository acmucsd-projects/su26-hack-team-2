"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, User } from "lucide-react";
import { AvatarMenu } from "./AvatarMenu";
import Logo from "./Logo";
import { SearchBar } from "./SearchBar";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export type NavbarVariant = "transparent" | "cream";

const NAV_LINKS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/clubs", label: "My Clubs", icon: User },
  { href: "/calendar", label: "Calendar", icon: Calendar },
];

const variantStyles: Record<NavbarVariant, string> = {
  transparent: "bg-transparent",
  cream: "bg-cream",
};

type NavbarProps = {
  variant?: NavbarVariant;
  isAuthenticated?: boolean;
  userName?: string;
  userImageUrl?: string;
  onSignOut?: () => void;
};

export default function Navbar({
  variant,
  isAuthenticated = false,
  userName,
  userImageUrl,
  onSignOut,
}: NavbarProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === "/" ? "transparent" : "cream");
  const creamOnDark = resolvedVariant === "transparent";

  return (
    <nav
      className={cn(
        "flex h-(--navbar-height) w-full items-center justify-between gap-6 px-8",
        variantStyles[resolvedVariant]
      )}
    >
      <div className="flex items-center gap-4">
        <Logo variant={resolvedVariant} />
        <span
          className={cn("h-6 w-px bg-navy/20", creamOnDark && "dark:bg-cream/20")}
          aria-hidden="true"
        />
        <ul className="flex list-none items-center gap-6">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(`${href}/`);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 font-semibold hover:opacity-80",
                    isActive ? "text-blue-600" : "text-navy",
                    !isActive && creamOnDark && "dark:text-cream"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar creamOnDark={creamOnDark} />
        {isAuthenticated ? (
          <AvatarMenu name={userName} imageUrl={userImageUrl} onSignOut={onSignOut} />
        ) : (
          <Button href="/login" variant="primary" size="sm">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
