import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ReactNode } from 'react'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'antoine.boudic@gmail.com').split(',')

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    redirect('/')
  }

  return <>{children}</>
}
