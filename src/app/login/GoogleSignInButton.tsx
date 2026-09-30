import { ArrowRight } from "lucide-react";
import { signInWithGoogle } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";

export function GoogleSignInButton() {
  return (
    <form action={signInWithGoogle} className="w-full">
      <Button
        type="submit"
        variant="solid"
        size="md"
        className="w-full justify-between rounded-2xl px-7 text-base"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-bold text-[#4285f4]"
          >
            G
          </span>
          Continue with Google
        </span>
        <ArrowRight className="h-5 w-5" />
      </Button>
    </form>
  )
}