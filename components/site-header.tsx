'use client'

import Link from 'next/link'
import * as React from 'react'
import { Menu } from 'lucide-react'
import { BrandLogo } from './brandlogo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'FAQ', href: '#faq' },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

// Padding horizontal link desktop (px-4 = 16px). Dipakai supaya strip
// lebarnya pas selebar teks, bukan selebar seluruh area klik.
const LINK_PAD = 16

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [hoverId, setHoverId] = React.useState<string | null>(null)

  // Strip: ikut link yang di-hover/fokus, kalau tidak ada, balik ke section aktif.
  const targetId = hoverId ?? activeId

  const navRef = React.useRef<HTMLElement>(null)
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({})
  const [indicator, setIndicator] = React.useState<{
    x: number
    w: number
  } | null>(null)
  const [animate, setAnimate] = React.useState(false)

  /* ---------- Scroll state + scroll-spy ---------- */
  React.useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)

      // Garis acuan di 30% tinggi layar: section yang melewati garis ini = aktif.
      const line = window.innerHeight * 0.3
      let current: string | null = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) current = id
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* ---------- Posisi strip ---------- */
  const measure = React.useCallback(() => {
    if (!targetId) return
    const el = linkRefs.current[targetId]
    if (!el) return
    setIndicator({
      x: el.offsetLeft + LINK_PAD,
      w: Math.max(el.offsetWidth - LINK_PAD * 2, 0),
    })
  }, [targetId])

  React.useEffect(() => {
    measure()
  }, [measure])

  // Setelah posisi pertama terpasang, baru nyalakan transisi
  // supaya strip tidak "meluncur" dari pojok kiri saat pertama muncul.
  React.useEffect(() => {
    if (!indicator || animate) return
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(id)
  }, [indicator, animate])

  // Ukur ulang kalau lebar nav berubah (resize, font selesai load, dll).
  React.useEffect(() => {
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [measure])

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          'pointer-events-auto relative mx-auto h-16 max-w-6xl overflow-hidden rounded-2xl border',
          'backdrop-blur-xl backdrop-saturate-150',
          'transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none',
          scrolled
            ? 'border-white/40 bg-white/55 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/[0.07]'
            : 'border-white/25 bg-white/35 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-white/[0.04]',
        )}
      >
        {/* Kilau kaca di tepi atas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-70 dark:from-white/12 dark:via-transparent"
        />

        <div className="relative flex h-full items-center justify-between px-4 sm:px-5 lg:px-6">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="dlvyne home"
          >
            <BrandLogo className="size-8" />
            <span className="font-heading text-lg font-semibold tracking-tight">
              dlvyne
            </span>
          </Link>

          {/* Link dibuat setinggi navbar supaya strip menempel di ujung bawah */}
          <nav
            ref={navRef}
            className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-stretch md:flex"
            aria-label="Primary"
            onPointerLeave={() => setHoverId(null)}
          >
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeId === id
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[id] = el
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setActiveId(id)}
                  onPointerEnter={() => setHoverId(id)}
                  onFocus={() => setHoverId(id)}
                  onBlur={() => setHoverId(null)}
                  className={cn(
                    'flex items-center px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    isActive || hoverId === id
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Strip berwarna di ujung bawah navbar */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute bottom-0 left-0 h-[3px] rounded-t-full bg-primary',
                'shadow-[0_0_14px_2px_color-mix(in_oklab,var(--primary)_65%,transparent)]',
                animate &&
                  'transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                // Strip saat hover dibuat sedikit lebih redup dari strip section aktif
                targetId
                  ? hoverId && hoverId !== activeId
                    ? 'opacity-60'
                    : 'opacity-100'
                  : 'opacity-0',
              )}
              style={{
                width: indicator?.w ?? 0,
                transform: `translateX(${indicator?.x ?? 0}px)`,
              }}
            />
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              className="h-10 rounded-xl px-5 shadow-[0_6px_20px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
              nativeButton={false}
              render={<Link href="#contact">Start a project</Link>}
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu />
                  </Button>
                }
              />
              <SheetContent
                side="right"
                className="w-4/5 max-w-xs border-l border-white/30 bg-background/60 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <BrandLogo className="size-7" />
                    <span className="font-heading text-lg font-semibold tracking-tight">
                      dlvyne
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-1 px-4"
                  aria-label="Mobile primary"
                >
                  {navLinks.map((link) => {
                    const id = link.href.slice(1)
                    const isActive = activeId === id
                    return (
                      <SheetClose
                        nativeButton={false}
                        key={link.href}
                        render={
                          <Link
                            href={link.href}
                            aria-current={isActive ? 'location' : undefined}
                            data-active={isActive}
                            onClick={() => setActiveId(id)}
                            className={cn(
                              'relative rounded-xl px-4 py-2.5 text-base font-medium transition-colors',
                              'hover:bg-white/30 dark:hover:bg-white/10',
                              'data-[active=true]:bg-white/40 dark:data-[active=true]:bg-white/10',
                              // Strip vertikal di sisi kiri (versi mobile dari strip desktop)
                              'before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:origin-center before:scale-y-0 before:rounded-r-full before:bg-primary before:transition-transform before:duration-300 motion-reduce:before:transition-none',
                              'data-[active=true]:before:scale-y-100',
                              isActive ? 'text-foreground' : 'text-foreground/70',
                            )}
                          >
                            {link.label}
                          </Link>
                        }
                      />
                    )
                  })}
                </nav>
                <div className="mt-auto flex flex-col gap-2 p-4">
                  <Button
                    className="h-11 w-full rounded-xl text-base"
                    nativeButton={false}
                    render={<Link href="#contact">Start a project</Link>}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}