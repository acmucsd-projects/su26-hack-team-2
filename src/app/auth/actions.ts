'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const supabase = await createClient()
  const requestHeaders = await headers()
  const forwardedHost = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  const origin =
    requestHeaders.get('origin') ??
    (forwardedHost
      ? `${requestHeaders.get('x-forwarded-proto') ?? 'http'}://${forwardedHost}`
      : null)

  if (!origin) {
    redirect('/login?error=missing_origin')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`)
  if (!data.url) redirect('/login?error=oauth_url_missing')

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}