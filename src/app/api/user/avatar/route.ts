import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 2 * 1024 * 1024 // 2 MB

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP or GIF allowed' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 2 MB' }, { status: 400 })
  }

  const admin = createAdminClient()
  const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
  const path = `${user.id}/avatar.${ext}`

  // Ensure bucket exists
  const { data: buckets } = await admin.storage.listBuckets()
  if (!buckets?.find(b => b.name === 'avatars')) {
    await admin.storage.createBucket('avatars', { public: true })
  }

  const bytes = await file.arrayBuffer()
  const { error: uploadError } = await admin.storage
    .from('avatars')
    .upload(path, bytes, { upsert: true, contentType: file.type })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = admin.storage.from('avatars').getPublicUrl(path)

  return NextResponse.json({ url: publicUrl })
}
