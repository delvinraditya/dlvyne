import Link from 'next/link'
import { Palette, Camera, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const services = [
  {
    icon: Palette,
    title: 'Graphic Design',
    description:
      'Logos, brand systems and print-ready materials that make your business look established from day one, and keep your message consistent on every channel.',
    deliverables: ['Logo & identity', 'Mock-Ups', 'Social Media Posts'],
  },
  {
    icon: Camera,
    title: 'Photography',
    description:
      'Product, portrait and lifestyle photos shot with a clear visual direction, so your audience feels the quality of your work before they ever reach out.',
    deliverables: ['Product', 'Portrait', 'Lifestyle'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Fast, responsive and accessible websites built to turn visitors into inquiries, and to keep running smoothly long after launch day.',
    deliverables: ['Portfolio', 'Landing Page',],
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Cahaya samar di belakang kartu, supaya efek blur kacanya terlihat */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/3 size-80 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            />
            Services
          </span>
          <h2
            id="services-heading"
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            One studio. Every touchpoint your brand needs.
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Design, photography and web from the same team, so your brand looks
            and feels the same everywhere your clients meet it. Fewer handoffs,
            faster delivery, stronger first impressions.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/45 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.3)] ring-0 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/60 hover:shadow-[0_18px_50px_-16px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/15 dark:bg-white/[0.06] dark:hover:bg-white/[0.09]"
            >
              {/* Kilau kaca di tepi atas */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-70 dark:from-white/12 dark:via-transparent"
              />

              <CardHeader className="relative">
                <span className="flex size-12 items-center justify-center rounded-xl border border-white/40 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground dark:border-white/10">
                  <service.icon className="size-6" />
                </span>
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <ul className="flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Strip di ujung bawah kartu saat hover, sama seperti strip di navbar */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-t-full bg-primary shadow-[0_0_14px_2px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
              />
            </Card>
          ))}
        </div>

        {/* Ajakan di akhir section */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 px-6 py-5 text-center backdrop-blur-xl sm:flex-row sm:text-left dark:border-white/10 dark:bg-white/[0.05]">
          <div>
            <p className="font-heading text-base font-semibold">
              Not sure where to start?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your project and we will suggest the right mix.
            </p>
          </div>
          <Button
            className="h-10 shrink-0 rounded-xl px-5 shadow-[0_6px_20px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
            nativeButton={false}
            render={<Link href="#contact">Start a project</Link>}
          />
        </div>
      </div>
    </section>
  )
}