import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { defaultLocale, locales, detectLocale, type Locale } from './config'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headersList = await headers()

  let locale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined
  if (!locale || !locales.includes(locale)) {
    locale = detectLocale(headersList.get('accept-language'))
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
