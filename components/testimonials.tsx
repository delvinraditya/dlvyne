import { Quote, Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonials = [
  {
    quote:
      'dlvyne translated a vague idea into a brand that finally feels like us. Soft, confident, and endlessly flexible across everything we make.',
    name: 'Ava Mercer',
    title: 'Founder, Everly',
    initials: 'AM',
  },
  {
    quote:
      'The photography completely changed how our products are perceived. Sales aside, it just feels premium now — and clients notice.',
    name: 'Daniel Okafor',
    title: 'Creative Lead, Cascade',
    initials: 'DO',
  },
  {
    quote:
      'Our new site is fast, gorgeous, and easy to update. Working with dlvyne felt collaborative from the first call to launch day.',
    name: 'Sofia Reyes',
    title: 'Marketing Director, Lumen',
    initials: 'SR',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="testimonials-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Loved by the people we work with
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          We measure success by how our clients feel about their brand — and how
          it performs when it&apos;s out in the world.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="flex flex-col justify-between">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Quote className="size-8 text-primary/30" aria-hidden="true" />
                <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-secondary text-secondary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {t.quote}
              </p>
            </CardContent>
            <CardFooter className="mt-2 flex items-center gap-3 border-t border-border pt-4">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.title}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
