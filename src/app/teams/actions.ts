'use server'

export type DemoRequestState = {
  status: 'idle' | 'success' | 'error'
  emailId?: string
  error?: string
}

export async function sendDemoRequest(
  _prev: DemoRequestState,
  formData: FormData,
): Promise<DemoRequestState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const size = (formData.get('size') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !company || !size) {
    return { status: 'error', error: 'Please fill in all required fields.' }
  }

  try {
    const res = await fetch('https://www.opuslearn.ai/api/team/demo-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, size, message }),
    })
    const json = await res.json() as { ok?: boolean; emailId?: string; error?: string }
    if (!res.ok || !json.ok) {
      return { status: 'error', error: json.error ?? 'Something went wrong.' }
    }
    return { status: 'success', emailId: json.emailId }
  } catch (err) {
    console.error('Demo request server action failed:', err)
    return { status: 'error', error: 'Network error — please try again.' }
  }
}
