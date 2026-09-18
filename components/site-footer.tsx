import { Sparkles, Camera, Send, AtSign, Mail } from 'lucide-react'
import { BrandLogo } from './brandlogo'
const footerNav = [
  {
    heading: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Selected work', href: '#works' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Graphic design', href: '#services' },
      { label: 'Photography', href: '#services' },
      { label: 'Web development', href: '#services' },
      { label: 'Brand identity', href: '#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
      { label: 'Log in', href: '#login' },
    ],
  },
]

const socials = [
  { label: 'Instagram', href: '#', icon: Camera },
  { label: 'Twitter', href: '#', icon: Send },
  { label: 'LinkedIn', href: '#', icon: AtSign },
  { label: 'Email', href: '#contact', icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-2" aria-label="dlvyne home">
              <span className="flex size-8 items-center justify-center rounded-[var(--radius)]">
                <BrandLogo className="size-8" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight">
                dlvyne
              </span>
            </a>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              A creative studio for graphic design, photography and web — soft,
              adaptive and expressive work that helps brands be seen.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-[var(--radius)] border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="font-heading text-sm font-semibold">
                {group.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} dlvyne. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
