import { signInWithGoogle } from '@/app/auth/actions'

export function GoogleSignInButton() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">Sign in with Google</button>
    </form>
  )
}