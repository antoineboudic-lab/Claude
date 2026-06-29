'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { PAPER, PANEL, INK, COBALT, COBALT_TX, LIGHT, SERIF, MONO, SANS } from './theme'

// The editorial marketing footer, shared across landing + secondary pages.
export default function EditorialFooter() {
  const tFooter = useTranslations('home.footer')
  return (
    <footer style={{ background: PANEL }}>
      {/* Brand statement band */}
      <div style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <span className="block mb-4" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.7rem', letterSpacing: '-0.01em', color: INK }}>OpusLearn</span>
            <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'rgba(26,27,31,0.85)', maxWidth: '30rem', lineHeight: 1.22, letterSpacing: '-0.01em' }}>
              {tFooter('aiTrainingTagline')}
            </p>
          </div>
          <Link href="/assessment"
            className="flex items-center gap-2 px-6 py-3.5 text-sm flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: LIGHT, color: PAPER, borderRadius: 3, fontFamily: SANS, fontWeight: 600, letterSpacing: '-0.01em' }}>
            {tFooter('startForFree')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: COBALT_TX, fontFamily: MONO }}>{tFooter('thePlatform')}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,27,31,0.5)', fontFamily: SANS }}>
              {tFooter('platformDesc')}
            </p>
          </div>
          {[
            {
              title: tFooter('programme'),
              links: [
                { label: tFooter('links.howItWorks'), href: '/#program' },
                { label: tFooter('links.tracks'), href: '/tracks' },
                { label: tFooter('links.assessment'), href: '/assessment' },
                { label: tFooter('links.certificates'), href: '/certificates' },
              ],
            },
            {
              title: tFooter('company'),
              links: [
                { label: tFooter('links.about'), href: '/#about' },
                { label: tFooter('links.blog'), href: '/blog' },
                { label: tFooter('links.careers'), href: '/careers' },
                { label: tFooter('links.press'), href: '/press' },
              ],
            },
            {
              title: tFooter('support'),
              links: [
                { label: tFooter('links.helpCentre'), href: '/help' },
                { label: tFooter('links.contact'), href: '/contact' },
                { label: tFooter('links.privacy'), href: '/privacy' },
                { label: tFooter('links.terms'), href: '/terms' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <p className="text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(26,27,31,0.4)', fontFamily: MONO }}>{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:opacity-60"
                      style={{ color: 'rgba(26,27,31,0.6)', fontFamily: SANS }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.10)' }}>
          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(26,27,31,0.35)', fontFamily: MONO }}>© 2026 OpusLearn · {tFooter('rights')}</p>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(26,27,31,0.35)', fontFamily: MONO }}>{tFooter('tagline2')}</p>
        </div>
      </div>
    </footer>
  )
}
