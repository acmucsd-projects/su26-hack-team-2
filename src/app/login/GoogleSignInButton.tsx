import { signInWithGoogle } from '@/app/auth/actions'
import { Button } from '@/components/ui/Button'

export function GoogleSignInButton() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit" variant="solid" fullWidth>
        Continue with Google
      </Button>
    </form>
  )
}
