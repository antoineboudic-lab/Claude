export const locales = ['en', 'es', 'fr', 'de', 'pt', 'hi', 'ja', 'id', 'th', 'ms', 'zh', 'pl', 'ar'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'
export const rtlLocales: Locale[] = ['ar']

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  hi: 'हिन्दी',
  ja: '日本語',
  id: 'Bahasa Indonesia',
  th: 'ภาษาไทย',
  ms: 'Bahasa Melayu',
  zh: '中文',
  pl: 'Polski',
  ar: 'العربية',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
  hi: '🇮🇳',
  ja: '🇯🇵',
  id: '🇮🇩',
  th: '🇹🇭',
  ms: '🇲🇾',
  zh: '🇸🇬',
  pl: '🇵🇱',
  ar: '🇸🇦',
}

export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const tags = acceptLanguage.split(',').map(l => l.split(';')[0].trim().toLowerCase())
  for (const tag of tags) {
    const lang = tag.split('-')[0]
    if (locales.includes(lang as Locale)) return lang as Locale
    // special mappings
    if (tag.startsWith('zh')) return 'zh'
    if (tag.startsWith('pt')) return 'pt'
  }
  return defaultLocale
}
