import Link from "next/link";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

type MemberListItemProps = {
  avatarImageUrl?: string;
  avatarName?: string;
  title: string;
  titleHref?: string;
  subtitle: string;
  className?: string;
};

export function MemberListItem({
  avatarImageUrl,
  avatarName,
  title,
  titleHref,
  subtitle,
  className,
}: MemberListItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar imageUrl={avatarImageUrl} name={avatarName ?? title} size="md" />
      <div className="min-w-0">
        {titleHref ? (
          <Link href={titleHref} className="block truncate font-semibold text-navy hover:underline">
            {title}
          </Link>
        ) : (
          <p className="truncate font-semibold text-navy">{title}</p>
        )}
        <p className="truncate text-sm text-navy/70">{subtitle}</p>
      </div>
    </div>
  );
}
