import Link from "next/link";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

type MemberListItemProps = {
  avatarImageUrl?: string;
  avatarName?: string;
  avatarClassName?: string;
  title: string;
  titleHref?: string;
  subtitle: string;
  className?: string;
};

export function MemberListItem({
  avatarImageUrl,
  avatarName,
  avatarClassName,
  title,
  titleHref,
  subtitle,
  className,
}: MemberListItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar
        imageUrl={avatarImageUrl}
        name={avatarName ?? title}
        size="lg"
        className={cn("h-13 w-13", avatarClassName)}
      />
      <div className="min-w-0">
        {titleHref ? (
          <Link href={titleHref} className="block text-lg font-semibold leading-snug text-navy hover:underline">
            {title}
          </Link>
        ) : (
          <p className="text-lg font-semibold leading-snug text-navy">{title}</p>
        )}
        <p className="truncate text-sm text-navy">{subtitle}</p>
      </div>
    </div>
  );
}
