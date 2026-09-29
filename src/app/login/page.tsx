import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { getUser } from "@/lib/supabase/session";
import { GoogleSignInButton } from "./GoogleSignInButton";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getUser()) redirect("/clubs");
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-8">
        <div className="flex w-full max-w-sm flex-col gap-6 text-center">
          <div>
            <h1 className="text-4xl font-bold text-navy">Log in</h1>
            <p className="text-navy">Sign in with your UCSD Google account.</p>
          </div>
          <GoogleSignInButton />
          {error && (
            <p role="alert" className="text-sm text-red-600">
              Sign-in failed. Please try again.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
