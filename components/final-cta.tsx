'use client'

import Image from 'next/image'
import * as React from 'react'
import {
  Check,
  CheckCheck,
  Clock,
  Hash,
  Mail,
  MessageCircle,
  SendHorizontal,
  type LucideIcon,
} from 'lucide-react'
import { BrandLogo } from './brandlogo'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* WAJIB DIGANTI sebelum dipakai                                       */
/* ------------------------------------------------------------------ */

// Sapaan awal yang sudah terisi di semua channel. Sengaja hanya sapaan,
// form lengkap Anda kirim sendiri setelah client membalas.
const GREETING =
  'Hi dlvyne, I just visited your website. Do you have a moment to chat?'
const EMAIL_SUBJECT = 'Hello from your website'

// Nilai di bawah ini hanya contoh. Ganti semuanya dengan milik Anda.
const CONTACT_EMAIL = 'dlvyne.visuals@gmail.com'
const WHATSAPP_NUMBER = '6281338382787' // format internasional tanpa tanda plus
const DISCORD_URL = 'https://discordapp.com/users/535805666829271060' // link invite server atau profil

// Jam studio, dipakai untuk status "open / closed" yang dihitung langsung.
const STUDIO = {
  timeZone: 'Asia/Jakarta',
  openHour: 9,
  closeHour: 21,
  zoneLabel: 'WIB',
}

// Jumlah slot proyek baru yang masih tersedia bulan ini.
// Isi HANYA dengan angka yang benar. Biarkan null kalau tidak mau menampilkannya.
// Angka 0 akan menampilkan pesan "waitlist".
const OPEN_SLOTS: number | null = 2

/* ------------------------------------------------------------------ */

type ChannelId = 'whatsapp' | 'email' | 'discord'

type Channel = {
  id: ChannelId
  label: string
  hint: string
  icon: string
  href: string
  external: boolean
}

const channels: Channel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    hint: 'Opens a chat with your hello already typed',
    icon: "/whatsapp.png",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GREETING)}`,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    hint: 'Opens your mail app with your hello ready',
    icon: "/gmail.png",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      EMAIL_SUBJECT,
    )}&body=${encodeURIComponent(GREETING)}`,
    external: false,
  },
  {
    id: 'discord',
    label: 'Discord',
    hint: 'Copies your hello, then opens our server',
    icon: "/discord.png",
    href: DISCORD_URL,
    external: true,
  },
]

const steps = [
  {
    title: 'Say hi',
    body: 'One tap. The friendly line is already written for you.',
    tag: 'Right now',
  },
  {
    title: 'You get a short project form',
    body: 'Sent after you reply, to people who are ready to move. It lets us scope your project properly.',
  },
  {
    title: 'Make it fine',
    body: 'Design, photography or web, built around your answers.',
  },
]

/* ---------- Hook kecil ---------- */

function useTypewriter(text: string, active: boolean) {
  const [value, setValue] = React.useState('')
  React.useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(text)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setValue(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [text, active])
  return value
}

function useStudioClock() {
  const [state, setState] = React.useState<{
    open: boolean
    month: string
  } | null>(null)

  React.useEffect(() => {
    const compute = () => {
      const now = new Date()
      const hour = parseInt(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: STUDIO.timeZone,
          hour: 'numeric',
          hourCycle: 'h23',
        }).format(now),
        10,
      )
      const month = new Intl.DateTimeFormat('en-US', {
        timeZone: STUDIO.timeZone,
        month: 'long',
      }).format(now)
      setState({
        open: hour >= STUDIO.openHour && hour < STUDIO.closeHour,
        month,
      })
    }
    compute()
    const id = setInterval(compute, 60_000)
    return () => clearInterval(id)
  }, [])

  return state
}

const pad = (n: number) => String(n).padStart(2, '0')

/* ---------- Tombol channel dengan cahaya yang mengikuti kursor ---------- */

function ChannelButton({
  channel,
  sent,
  onSelect,
  onHover,
}: {
  channel: Channel
  sent: boolean
  onSelect: (id: ChannelId) => void
  onHover: (id: ChannelId | null) => void
}) {
  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      onClick={() => onSelect(channel.id)}
      onPointerMove={handleMove}
      onPointerEnter={() => onHover(channel.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(channel.id)}
      onBlur={() => onHover(null)}
      className={cn(
        'group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-[transform,background-color,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] motion-reduce:transition-none',
        sent
          ? 'border-primary/50 bg-primary/10'
          : 'border-foreground/10 bg-foreground/[0.04] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-foreground/[0.07] hover:shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--primary)_55%,transparent)] motion-reduce:hover:translate-y-0',
      )}
    >
      {/* Cahaya mengikuti kursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)',
        }}
      />

      <span
        className={cn(
          'relative flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
          sent
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
        )}
      >
        {/* <channel.icon className="size-5" /> */}
        <Image
          src={channel.icon}
          alt={channel.label}
          width={24}
          height={24}
          className="size-full"
        />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="block font-heading text-base font-semibold leading-tight">
          {sent ? `Opened in ${channel.label}` : `Say hi on ${channel.label}`}
        </span>
        <span className="mt-0.5 block text-pretty text-xs leading-snug text-muted-foreground">
          {channel.hint}
        </span>
      </span>

      <span className="relative flex size-8 shrink-0 items-center justify-center">
        {sent ? (
          <Check className="size-5 text-primary" />
        ) : (
          <SendHorizontal className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none" />
        )}
      </span>

      {/* Strip di ujung bawah saat hover, sama seperti navbar */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-t-full bg-primary shadow-[0_0_14px_2px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  )
}

/* ---------- Section ---------- */

export function FinalCta() {
  const windowRef = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)
  const [hovered, setHovered] = React.useState<ChannelId | null>(null)
  const [sentVia, setSentVia] = React.useState<ChannelId | null>(null)
  const clock = useStudioClock()
  const typed = useTypewriter(GREETING, inView)
  const typing = inView && typed.length < GREETING.length

  // Mulai mengetik saat jendela chat terlihat, bukan saat halaman dibuka.
  React.useEffect(() => {
    const el = windowRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleSelect = (id: ChannelId) => {
    setSentVia(id)
    // Discord tidak bisa diisi otomatis, jadi sapaan disalin dulu.
    if (id === 'discord') {
      navigator.clipboard?.writeText(GREETING).catch(() => { })
    }
  }

  const label = (id: ChannelId) => channels.find((c) => c.id === id)?.label
  const metaText = sentVia
    ? sentVia === 'discord'
      ? 'Hello copied. Paste it in Discord and hit send.'
      : `Opened in ${label(sentVia)}. Hit send there and we are talking.`
    : hovered
      ? `Will open in ${label(hovered)}`
      : 'Draft, not sent yet'

  const openLabel = clock
    ? clock.open
      ? 'Studio open now'
      : `Studio opens at ${pad(STUDIO.openHour)}:00 ${STUDIO.zoneLabel}`
    : `Studio hours ${pad(STUDIO.openHour)}:00 to ${pad(STUDIO.closeHour)}:00 ${STUDIO.zoneLabel}`

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Panggung berwarna primary, kaca duduk di atasnya */}
      <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 sm:rounded-[2.5rem] sm:p-8 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-20 -top-20 size-96 rounded-full bg-primary-foreground/15 blur-3xl" />
          <div className="absolute -bottom-28 -right-12 size-[26rem] rounded-full bg-secondary/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          {/* A: janji dan jaminan */}
          <div className="lg:col-span-7 lg:row-start-1">
            <h2
              id="cta-heading"
              className="font-heading text-balance text-4xl font-bold leading-[1.05] tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              The fix starts with one word: Hi.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              No need to prepare. Just send one friendly hello :)
            </p>

            {/* Tiga jaminan, semuanya benar dan dihitung langsung */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.12] px-4 py-2 text-sm text-primary-foreground backdrop-blur-md">
                <span className="relative flex size-2">
                  {clock?.open ? (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75 motion-reduce:animate-none" />
                  ) : null}
                  <span
                    className={cn(
                      'relative inline-flex size-2 rounded-full',
                      clock?.open ? 'bg-emerald-300' : 'bg-amber-300',
                    )}
                  />
                </span>
                {openLabel}
              </span>

              {OPEN_SLOTS !== null && clock ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.12] px-4 py-2 text-sm text-primary-foreground backdrop-blur-md">
                  <span aria-hidden className="flex gap-1">
                    {Array.from({ length: Math.min(Math.max(OPEN_SLOTS, 1), 5) }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'size-2 rounded-full',
                            OPEN_SLOTS > 0
                              ? 'bg-primary-foreground'
                              : 'bg-primary-foreground/30',
                          )}
                        />
                      ),
                    )}
                  </span>
                  {OPEN_SLOTS > 0
                    ? `ONLY ${OPEN_SLOTS} ${OPEN_SLOTS > 1 ? ' SLOTS' : ' SLOT'} OPEN IN ${clock.month}`
                    : `Booked for ${clock.month}. Say hi to join the waitlist`}
                </span>
              ) : null}

              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.12] px-4 py-2 text-sm text-primary-foreground backdrop-blur-md">
                <Clock className="size-4" />
                Free discovery call. No commitment.
              </span>
            </div>
          </div>

          {/* B: jendela chat interaktif */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div
              ref={windowRef}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/50 bg-background/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-60 dark:from-white/12"
              />

              <div className="relative">
                {/* Header chat */}
                <div className="flex items-center gap-3 border-b border-foreground/10 px-5 py-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <BrandLogo className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-heading text-base font-semibold leading-tight">
                      dlvyne
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        aria-hidden
                        className={cn(
                          'size-1.5 rounded-full',
                          clock?.open ? 'bg-emerald-500' : 'bg-amber-500',
                        )}
                      />
                      {clock
                        ? clock.open
                          ? 'Open now'
                          : `Back at ${pad(STUDIO.openHour)}:00 ${STUDIO.zoneLabel}. Say hi now and you are first in line.`
                        : 'Creative studio'}
                    </p>
                  </div>
                </div>

                {/* Isi chat */}
                <div className="flex flex-col gap-3 px-5 py-5">
                  <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-foreground/[0.06] px-4 py-2.5 text-sm leading-relaxed">
                    Got a problem with your brand, photos or website? Say hi and
                    we will take it from there.
                  </p>

                  <div className="flex flex-col items-end gap-1.5">
                    <p className="relative max-w-[88%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                      <span className="sr-only">{GREETING}</span>
                      {/* Teks penuh tak terlihat menjaga tinggi bubble tetap stabil */}
                      <span aria-hidden className="invisible">
                        {GREETING}
                      </span>
                      <span aria-hidden className="absolute inset-x-4 top-2.5">
                        {typed}
                        {typing ? (
                          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-current motion-reduce:animate-none" />
                        ) : null}
                      </span>
                    </p>
                    <p
                      role="status"
                      aria-live="polite"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      {sentVia ? (
                        <CheckCheck className="size-3.5 text-primary" />
                      ) : null}
                      {metaText}
                    </p>
                  </div>

                  {/* Muncul setelah sapaan dikirim */}
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none',
                      sentVia
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                    )}
                    aria-hidden={!sentVia}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 px-4 py-3 text-sm leading-relaxed">
                        <span className="font-medium">Next:</span> we reply with
                        a short project form. It is how we scope your project
                        properly, and it only goes to people who are ready to
                        move.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pilih tempat mengirim sapaan */}
                <div className="border-t border-foreground/10 p-4 sm:p-5">
                  <p className="font-heading text-sm font-semibold">
                    Where do you want to say it?
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Same hello, your choice of app.
                  </p>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {channels.map((channel) => (
                      <ChannelButton
                        key={channel.id}
                        channel={channel}
                        sent={sentVia === channel.id}
                        onSelect={handleSelect}
                        onHover={setHovered}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Your hello is already written. One tap and you are in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* C: tangga komitmen dan alasan bertindak sekarang */}
          <div className="lg:col-span-7 lg:row-start-2">
            <ol className="relative flex flex-col gap-5">
              <span
                aria-hidden
                className="absolute bottom-4 left-4 top-4 w-px bg-primary-foreground/25"
              />
              {steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center">
                    {i === 0 ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 animate-ping rounded-full bg-primary-foreground/40 motion-reduce:animate-none"
                      />
                    ) : null}
                    <span
                      className={cn(
                        'relative flex size-8 items-center justify-center rounded-full border font-mono text-xs font-semibold',
                        i === 0
                          ? 'border-primary-foreground bg-primary-foreground text-primary'
                          : 'border-white/40 bg-primary text-primary-foreground',
                      )}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <p className="flex flex-wrap items-center gap-2 font-heading font-semibold text-primary-foreground">
                      {step.title}
                      {step.tag ? (
                        <span className="rounded-full bg-primary-foreground px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {step.tag}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 max-w-md text-pretty text-sm text-primary-foreground/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-xl border-l-[3px] border-primary-foreground/60 pl-4 text-pretty text-base leading-relaxed text-primary-foreground/90">
              Every week a weak logo, flat photos or a silent website stays
              live is a week of first impressions lost.{' '}
              <a
                href="#works"
                className="font-medium text-primary-foreground underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
              >
                Look at the work again
              </a>
              , then say hi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}