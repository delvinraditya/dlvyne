import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Works } from '@/components/works'
import { Skills } from '@/components/skills'
import { Faq } from '@/components/faq'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <Works />
        <Skills />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
