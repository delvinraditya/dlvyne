import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="relative overflow-hidden rounded-[calc(var(--radius)*2)] bg-primary px-6 py-16 text-center sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-16 -top-16 size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 size-80 rounded-full bg-secondary/30 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2
            id="cta-heading"
            className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
          >
            Let&apos;s make something worth seeing
          </h2>
          <p className="text-pretty text-lg text-primary-foreground/80">
            Tell us about your brand and where you want to take it. We&apos;ll
            bring the design, the eye, and the craft to get you there.
          </p>
          <Button
            variant="secondary"
            className="h-12 bg-primary-foreground px-7 text-base text-primary hover:bg-primary-foreground/90"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            <span>Book a free discovery call</span>
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
