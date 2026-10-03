import Image from 'next/image'
import { CheckCircle2, Palette, Camera, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Resep kaca yang sama dengan navbar dan footer.
const glass =
  'border border-white/40 bg-background/65 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] dark:border-white/15'

// Tiap baris: masalah yang dicoret, lalu solusi yang muncul menggantikannya.
const fixes = [
  {
    icon: Palette,
    problem: 'People forget your logo',
    fix: 'A brand system they recognize',
  },
  {
    icon: Camera,
    problem: 'Photos that feels boring',
    fix: 'Visuals that has meaning',
  },
  {
    icon: Code2,
    problem: 'A website nobody acts on',
    fix: 'A site that reach people easily',
  },
]

function Sheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-70 dark:from-white/12 dark:via-transparent"
    />
  )
}

export function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-3 pb-16 pt-4 sm:px-4 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[24rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Panggung: karya dlvyne jadi latar, kaca blur duduk di atasnya */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/40 sm:rounded-[2.5rem] dark:border-white/15">
        <Image
          src="/hero-showcase.png"
          alt="A collage of dlvyne creative work spanning graphic design, photography and web interfaces"
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />

        <div className="relative flex min-h-[40rem] flex-col justify-end gap-4 p-3 pt-56 sm:p-6 sm:pt-64 lg:min-h-[46rem] lg:flex-row lg:items-end lg:justify-between lg:p-10">
          {/* Slab utama: hook, penjelasan, ajakan */}
          <div
            className={cn(
              glass,
              'relative w-full overflow-hidden rounded-3xl p-6 sm:p-8 lg:max-w-[38rem] lg:p-10',
            )}
          >
            <Sheen />
            <div className="relative flex flex-col items-start gap-6">
              <h1
                id="hero-heading"
                className="font-heading text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Got a problem? Let&apos;s make it fine.
              </h1>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                dlvyne is a creative studio for graphic design, photography and
                web. Tell us what is not working, and we turn it into work that
                looks sharp, feels consistent and earns trust at first glance.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="h-12 rounded-xl px-6 text-base shadow-[0_6px_20px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
                  nativeButton={false}
                  render={<a href="#contact" />}
                >
                  <span>Let&apos;s Make It Fine</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/50 bg-white/30 px-6 text-base backdrop-blur-md hover:bg-white/50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                  nativeButton={false}
                  render={<a href="#works" />}
                >
                  <span>See My Works</span>
                </Button>
              </div>

              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary" />
                Free consultation. Just email me :)
              </p>
            </div>
          </div>

          {/* Panel masalah ke solusi: satu momen animasi saat halaman dibuka */}
          <div
            className={cn(
              glass,
              'relative w-full overflow-hidden rounded-2xl p-4 sm:p-5 lg:w-[21rem] lg:self-start',
            )}
          >
            <Sheen />
            <div className="relative">
              <h2 className="font-heading text-base font-semibold">
                What&apos;s holding your brand back?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a problem to see how we fix it.
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {fixes.map((item, i) => {
                  // Urutan: coret masalah, lalu solusi muncul, baris demi baris.
                  const strikeAt = 0.5 + i * 0.9
                  const fixAt = strikeAt + 0.45
                  return (
                    <li key={item.problem}>
                      <a
                        href="#services"
                        className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-white/40 bg-white/30 p-3 pl-4 transition-colors hover:bg-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        {/* Strip di sisi kiri, sama seperti menu mobile */}
                        <span
                          aria-hidden
                          className="absolute inset-y-2 left-0 w-[3px] origin-center scale-y-0 rounded-r-full bg-primary transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                        />
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <item.icon className="size-5" />
                        </span>
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span className="relative w-fit text-sm text-muted-foreground">
                            {item.problem}
                            <span
                              aria-hidden
                              className="absolute left-0 top-1/2 h-px w-full origin-left bg-foreground/60 animate-[hero-strike_0.45s_ease-out_both] motion-reduce:animate-none"
                              style={{ animationDelay: `${strikeAt}s` }}
                            />
                          </span>
                          <span className="sr-only">becomes</span>
                          <span
                            className="text-sm font-medium text-foreground animate-[hero-fix_0.5s_ease-out_both] motion-reduce:animate-none"
                            style={{ animationDelay: `${fixAt}s` }}
                          >
                            {item.fix}
                          </span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}