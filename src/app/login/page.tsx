import Image from "next/image";
import { redirect } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { getUser } from "@/lib/supabase/session";
import { GoogleSignInButton } from "./GoogleSignInButton";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getUser()) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-sky px-6 py-16 sm:px-10 lg:px-16">
      <Image
        src="/BG.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-cream/75" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <section className="max-w-md text-navy">
          <Logo variant="cream" />
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-navy/75">
            The Triton Clubhouse
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Your club. One tool.
          </h1>
          <p className="mt-6 max-w-xs text-base leading-7 text-navy/80 sm:text-lg">
            Start, manage, and grow your club. All in one place.
          </p>
        </section>

        <section className="w-full max-w-md rounded-3xl bg-cream/65 p-8 backdrop-blur-sm sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Welcome back
          </h2>
          <p className="mt-3 text-base text-navy/80">
            Log in using your UCSD email.
          </p>
          <div className="mt-8">
            <GoogleSignInButton />
          </div>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              Sign-in failed. Please try again.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
