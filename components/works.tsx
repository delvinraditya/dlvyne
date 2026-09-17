import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const works = [
  {
    image: '/work-branding.png',
    title: 'Everly — Brand Identity',
    category: 'Graphic Design',
    alt: 'Brand identity mockup with business cards and stationery for Everly',
  },
  {
    image: '/work-photography.png',
    title: 'Cascade — Product Story',
    category: 'Photography',
    alt: 'Editorial product photography with cool blue color grading for Cascade',
  },
  {
    image: '/work-web.png',
    title: 'Lumen — Marketing Site',
    category: 'Web Development',
    alt: 'Responsive website design shown on laptop and phone for Lumen',
  },
]

export function Works() {
  return (
    <section
      id="works"
      className="border-t border-border bg-muted/40"
      aria-labelledby="works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2
              id="works-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Selected work
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              A glimpse of recent projects across design, photography and the
              web. Every piece is made to earn attention and hold it.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start your project
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <a
              key={work.title}
              href="#contact"
              className="group relative overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-5">
                <div className="flex flex-col gap-1">
                  <Badge
                    variant="secondary"
                    className="w-fit bg-accent text-accent-foreground"
                  >
                    {work.category}
                  </Badge>
                  <span className="font-heading text-lg font-semibold">
                    {work.title}
                  </span>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
