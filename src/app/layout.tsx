import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import { signOut } from "@/app/auth/actions";
import { getUser } from "@/lib/supabase/session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club Portal",
  description: "Manage club events, fundraising, and board activities.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getUser();
  const userName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0];

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar
          isAuthenticated={Boolean(user)}
          userName={userName}
          userImageUrl={user?.user_metadata?.avatar_url}
          onSignOut={signOut}
        />
        {children}
      </body>
    </html>
  );
}
