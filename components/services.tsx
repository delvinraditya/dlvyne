import {
  Palette,
  Camera,
  Code2,
  PenTool,
  LayoutGrid,
  Megaphone,
} from 'lucide-react'
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
      'Logos, brand systems and print-ready collateral crafted to give your identity a distinct, cohesive voice.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description:
      'Product, portrait and lifestyle photography that captures mood, texture and story in every frame.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Fast, responsive and accessible websites built with modern tooling and pixel-perfect attention.',
  },
  {
    icon: PenTool,
    title: 'Brand Identity',
    description:
      'Naming, tone and visual direction that make your brand feel intentional from the very first touch.',
  },
  {
    icon: LayoutGrid,
    title: 'UI / UX Design',
    description:
      'Interfaces that are soft, adaptive and genuinely enjoyable — designed around how people actually think.',
  },
  {
    icon: Megaphone,
    title: 'Art Direction',
    description:
      'A guiding creative eye across campaigns and channels so every asset feels part of one clear story.',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="services-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Everything your brand needs to be seen
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          One studio across design, photography and the web — so your work stays
          consistent, considered and unmistakably you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.title}
            className="group transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardHeader>
              <span className="flex size-12 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="size-6" />
              </span>
              <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
