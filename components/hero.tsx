import Image from 'next/image'
import { CheckCircle2, PlayCircle, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[24rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <Badge
            variant="secondary"
            className="rounded-full bg-accent text-accent-foreground"
          >
            Creative studio · Design · Photo · Web
          </Badge>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Creative work that feels{' '}
            <span className="text-primary">soft, adaptive</span> and
            unmistakably yours
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            dlvyne is a creative brand crafting graphic design, photography, and
            web experiences. We shape brands that move with you — expressive,
            considered, and built to be seen.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-12 px-6 text-base" nativeButton={false} render={<a href="#contact" />}>
              <span>Start a project</span>
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 text-base"
              nativeButton={false}
              render={<a href="#works" />}
            >
              <PlayCircle data-icon="inline-start" />
              <span>See our work</span>
            </Button>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary" />
            Free discovery call · No commitment required
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[calc(var(--radius)*2)] border border-border bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent p-2 shadow-2xl shadow-primary/10">
            <div className="overflow-hidden rounded-[calc(var(--radius)*1.6)] border border-border bg-card">
              <Image
                src="/hero-showcase.png"
                alt="A collage of dlvyne creative work spanning graphic design, photography and web interfaces"
                width={1024}
                height={1024}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
