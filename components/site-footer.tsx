import { Camera, Send, AtSign, Mail } from 'lucide-react'
import { BrandLogo } from './brandlogo'

const footerNav = [
  {
    heading: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Works', href: '#works' },
      { label: 'Skills', href: '#skills' },
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
    heading: 'Other',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
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
    <footer className="relative overflow-hidden px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
      {/*
        Kaca butuh sesuatu di belakangnya supaya blur-nya kelihatan.
        Dua cahaya samar ini yang jadi "isi" di balik panel footer.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-primary/25 blur-3xl dark:bg-primary/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-6 size-64 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10"
      />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/40 bg-white/55 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/[0.07]">
        {/* Kilau kaca di tepi atas, sama seperti header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-70 dark:from-white/12 dark:via-transparent"
        />

        <div className="relative px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="col-span-2 flex flex-col gap-4 md:col-span-4 lg:col-span-1">
              <a
                href="#"
                className="flex w-fit items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="dlvyne home"
              >
                <BrandLogo className="size-8" />
                <span className="font-heading text-lg font-semibold tracking-tight">
                  dlvyne
                </span>
              </a>
              <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                A creative studio for graphic design, photography and website. Solving your problems into modern solutions.
              </p>
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/40 bg-white/30 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-white/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
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
                      {/* Strip kecil muncul saat hover/fokus, versi mini dari strip di header */}
                      <a
                        href={link.href}
                        className="group relative inline-block rounded-sm py-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-primary shadow-[0_0_10px_1px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/40 pt-8 dark:border-white/10 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} dlvyne. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}