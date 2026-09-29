import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/session";

// Session check only; club membership is not verified yet.
export default async function ClubsLayout({ children }: LayoutProps<"/clubs">) {
  if (!(await getUser())) redirect("/login");

  return <div className="flex flex-1 flex-col bg-cream">{children}</div>;
}
