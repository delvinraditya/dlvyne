'use client'

import * as React from 'react'
import {
  Camera,
  Check,
  Code2,
  Compass,
  Copy,
  Mail,
  MessageCircle,
  Palette,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { BrandLogo } from './brandlogo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* WAJIB DIGANTI sebelum dipakai                                       */
/* ------------------------------------------------------------------ */

// Email tujuan brief. Nilai di bawah hanya contoh, ganti dengan email Anda.
const CONTACT_EMAIL = 'your-email@example.com'

// Opsional. Isi dengan nomor format internasional tanpa tanda plus
// (contoh: 628123456789) untuk menampilkan tombol WhatsApp.
// Biarkan kosong kalau tidak dipakai.
const WHATSAPP_NUMBER = ''

/* ------------------------------------------------------------------ */

type ServiceId = 'design' | 'brand' | 'photo' | 'web' | 'unsure'
type TimelineId = 'asap' | 'month' | 'flexible'

const serviceOptions: { id: ServiceId; label: string; icon: LucideIcon }[] = [
  { id: 'design', label: 'Graphic design', icon: Palette },
  { id: 'brand', label: 'Brand identity', icon: Sparkles },
  { id: 'photo', label: 'Photography', icon: Camera },
  { id: 'web', label: 'Website', icon: Code2 },
  { id: 'unsure', label: 'Not sure yet', icon: Compass },
]

const timelineOptions: { id: TimelineId; label: string }[] = [
  { id: 'asap', label: 'As soon as possible' },
  { id: 'month', label: 'Within a month' },
  { id: 'flexible', label: 'No rush' },
]

const steps = [
  {
    title: 'You send the brief',
    body: 'Two minutes, and only the questions that matter.',
  },
  {
    title: 'We reply with ideas',
    body: 'A first take on how we would approach it, plus a free discovery call.',
  },
  {
    title: 'You decide',
    body: 'No commitment. We only start when you are sure.',
  },
]

// Hilangkan baris baru dari field satu baris supaya subjek email tetap bersih.
const clean = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

// Potongan setengah lingkaran di sambungan tiket (atas dan bawah perforasi).
const notchMask = (edge: 'top' | 'bottom'): React.CSSProperties => {
  const y = edge === 'top' ? '0' : '100%'
  const image = `radial-gradient(circle 12px at 0 ${y}, transparent 11px, #000 12px), radial-gradient(circle 12px at 100% ${y}, transparent 11px, #000 12px)`
  return {
    WebkitMaskImage: image,
    maskImage: image,
    WebkitMaskComposite: 'source-in',
    maskComposite: 'intersect',
  }
}

const fieldClass =
  'w-full rounded-xl border border-white/30 bg-white/[0.12] px-4 text-base text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/55 hover:bg-white/[0.18] focus:border-white/70 focus:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary-foreground/60'

const optionClass =
  'border border-white/30 bg-white/[0.12] text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20 peer-checked:border-primary-foreground peer-checked:bg-primary-foreground peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary-foreground peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-primary'

function TicketRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-dashed border-foreground/15 py-3 first:border-t-0 first:pt-0">
      <dt className="pt-0.5 text-xs text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-sm">{children}</dd>
    </div>
  )
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="italic text-muted-foreground/60">{children}</span>
}

export function FinalCta() {
  const baseId = React.useId()
  const [services, setServices] = React.useState<ServiceId[]>([])
  const [problem, setProblem] = React.useState('')
  const [timeline, setTimeline] = React.useState<TimelineId | null>(null)
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [copyState, setCopyState] = React.useState<'idle' | 'ok' | 'fail'>(
    'idle',
  )
  const [opened, setOpened] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const toggleService = (id: ServiceId) => {
    setServices((prev) => {
      if (id === 'unsure') return prev.includes('unsure') ? [] : ['unsure']
      const rest = prev.filter((s) => s !== 'unsure')
      return rest.includes(id) ? rest.filter((s) => s !== id) : [...rest, id]
    })
  }

  /* ---------- Turunan ---------- */
  const nameC = clean(name)
  const contactC = clean(contact)
  const problemC = problem.trim()
  const unsure = services.includes('unsure')
  const serviceLabels = serviceOptions
    .filter((s) => services.includes(s.id))
    .map((s) => s.label)
  const needsText = unsure
    ? 'Not sure yet, please help me choose'
    : serviceLabels.join(', ')
  const timelineLabel = timelineOptions.find((t) => t.id === timeline)?.label

  const filled = [
    services.length > 0,
    problemC.length > 0,
    timeline !== null,
    nameC.length > 0,
    contactC.length > 0,
  ]
  const count = filled.filter(Boolean).length
  const allFilled = count === filled.length

  const missing: string[] = []
  if (!nameC) missing.push('your name')
  if (!contactC) missing.push('a way to reach you')
  if (services.length === 0 && !problemC) {
    missing.push('what you need or the problem')
  }
  const canSend = missing.length === 0

  const subject = `Project brief from ${nameC || 'a new client'}`
  const briefText = [
    'Hi dlvyne,',
    '',
    `I'm ${nameC || '(name)'}.`,
    '',
    `What I need: ${needsText || 'Not chosen yet'}`,
    `The problem: ${problemC || 'Not described yet'}`,
    `Timeline: ${timelineLabel ?? 'Not decided yet'}`,
    `Reach me at: ${contactC || '(contact)'}`,
    '',
    'Sent from the dlvyne website.',
  ].join('\n')

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(briefText)}`
  const whatsapp = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(briefText)}`
    : ''

  // Kalau isi brief berubah setelah dikirim, pesan konfirmasi lama tidak relevan lagi.
  React.useEffect(() => {
    setOpened(false)
  }, [briefText])

  const handleSend = (e: React.MouseEvent) => {
    if (!canSend) {
      e.preventDefault()
      return
    }
    setOpened(true)
  }

  const copyBrief = async () => {
    if (!canSend) return
    try {
      await navigator.clipboard.writeText(briefText)
      setCopyState('ok')
    } catch {
      setCopyState('fail')
    }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), 3000)
  }

  const feedback = opened
    ? `Your email app should be opening. Nothing happened? Copy the brief and send it to ${CONTACT_EMAIL}.`
    : copyState === 'ok'
      ? 'Copied. Paste it into an email or a chat.'
      : copyState === 'fail'
        ? 'Your browser blocked copying. Use Send my brief instead.'
        : ''

  return (
    <section
      id="contact"
      className="group/cta mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
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

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Kiri: janji, alur, dan form */}
          <div className="lg:col-span-7">
            <h2
              id="cta-heading"
              className="font-heading text-balance text-4xl font-bold leading-[1.05] tracking-tight text-primary-foreground sm:text-5xl"
            >
              Tell us the problem. We will make it fine.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Fill in a two minute brief and watch it turn into a ticket as you
              go. Send it over for a free discovery call, no commitment, no
              pressure.
            </p>

            <ol className="relative mt-8 flex flex-col gap-5">
              <span
                aria-hidden
                className="absolute bottom-4 left-4 top-4 w-px bg-primary-foreground/25"
              />
              {steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-primary font-mono text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-primary-foreground">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-sm text-primary-foreground/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <form
              noValidate
              onSubmit={(e) => e.preventDefault()}
              className="relative mt-8 overflow-hidden rounded-3xl border border-white/30 bg-white/[0.12] p-5 backdrop-blur-2xl backdrop-saturate-150 sm:p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/25 via-transparent to-transparent"
              />
              <div className="relative flex flex-col gap-7">
                <fieldset>
                  <legend className="text-sm font-medium text-primary-foreground">
                    What do you need?
                  </legend>
                  <p className="mt-0.5 text-sm text-primary-foreground/70">
                    Pick as many as you like.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {serviceOptions.map((option) => (
                      <label key={option.id} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={services.includes(option.id)}
                          onChange={() => toggleService(option.id)}
                        />
                        <span
                          className={cn(
                            optionClass,
                            'inline-flex items-center gap-2 rounded-full px-4 py-2.5',
                          )}
                        >
                          <option.icon className="size-4" />
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor={`${baseId}-problem`}
                    className="text-sm font-medium text-primary-foreground"
                  >
                    What is the problem?
                  </label>
                  <textarea
                    id={`${baseId}-problem`}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    placeholder="e.g. Our logo feels outdated and our website does not bring in inquiries."
                    className={cn(fieldClass, 'mt-2 min-h-28 resize-none py-3')}
                  />
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-primary-foreground">
                    When do you need it?
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {timelineOptions.map((option) => (
                      <label key={option.id} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name={`${baseId}-timeline`}
                          className="peer sr-only"
                          checked={timeline === option.id}
                          onChange={() => setTimeline(option.id)}
                        />
                        <span
                          className={cn(
                            optionClass,
                            'flex items-center justify-center rounded-xl px-3 py-3 text-center',
                          )}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${baseId}-name`}
                      className="text-sm font-medium text-primary-foreground"
                    >
                      Your name
                    </label>
                    <input
                      id={`${baseId}-name`}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      autoComplete="name"
                      placeholder="Your name"
                      className={cn(fieldClass, 'mt-2 h-12')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${baseId}-contact`}
                      className="text-sm font-medium text-primary-foreground"
                    >
                      Email or WhatsApp
                    </label>
                    <input
                      id={`${baseId}-contact`}
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      maxLength={120}
                      autoComplete="off"
                      placeholder="How should we reach you?"
                      className={cn(fieldClass, 'mt-2 h-12')}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Kanan: brief yang berubah jadi tiket secara langsung */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div
                role="group"
                aria-label="Live preview of your brief"
                className="mx-auto max-w-md transition-transform duration-500 ease-out motion-reduce:transition-none lg:rotate-[1.5deg] lg:group-focus-within/cta:rotate-0"
              >
                {/* Bagian atas tiket: isi brief */}
                <div
                  style={notchMask('bottom')}
                  className="relative overflow-hidden rounded-t-3xl border border-b-0 border-white/50 bg-background/85 p-6 pb-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-60 dark:from-white/12"
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <BrandLogo className="size-7" />
                        <span className="font-heading text-base font-semibold tracking-tight">
                          dlvyne
                        </span>
                      </div>
                      <div className="relative flex h-8 min-w-[7.5rem] items-center justify-end">
                        <span
                          className={cn(
                            'text-xs text-muted-foreground transition-opacity duration-200',
                            allFilled && 'opacity-0',
                          )}
                        >
                          {count} of {filled.length} filled
                        </span>
                        {/* Stempel muncul saat semua terisi */}
                        <span
                          aria-hidden
                          className={cn(
                            'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 -rotate-6 rounded-lg border-2 border-primary px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-widest text-primary transition-all duration-300 ease-out motion-reduce:transition-none',
                            allFilled
                              ? 'scale-100 opacity-100'
                              : 'scale-150 opacity-0',
                          )}
                        >
                          Make it fine
                        </span>
                      </div>
                    </div>

                    <dl>
                      <TicketRow label="From">
                        {nameC ? (
                          <span className="font-medium">{nameC}</span>
                        ) : (
                          <Placeholder>Your name</Placeholder>
                        )}
                      </TicketRow>
                      <TicketRow label="Needs">
                        {services.length > 0 ? (
                          <span className="flex flex-wrap gap-1.5">
                            {unsure ? (
                              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                Not sure yet, help me choose
                              </span>
                            ) : (
                              serviceLabels.map((label) => (
                                <span
                                  key={label}
                                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                                >
                                  {label}
                                </span>
                              ))
                            )}
                          </span>
                        ) : (
                          <Placeholder>Pick what you need</Placeholder>
                        )}
                      </TicketRow>
                      <TicketRow label="Problem">
                        {problemC ? (
                          <span className="line-clamp-4 whitespace-pre-line">
                            {problemC}
                          </span>
                        ) : (
                          <Placeholder>What is not working?</Placeholder>
                        )}
                      </TicketRow>
                      <TicketRow label="Timeline">
                        {timelineLabel ?? <Placeholder>When you need it</Placeholder>}
                      </TicketRow>
                      <TicketRow label="Reach you at">
                        {contactC ? (
                          <span className="font-medium">{contactC}</span>
                        ) : (
                          <Placeholder>Email or WhatsApp</Placeholder>
                        )}
                      </TicketRow>
                    </dl>
                  </div>

                  {/* Strip kemajuan di ujung bawah, versi lain dari strip navbar */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-[3px] rounded-r-full bg-primary shadow-[0_0_14px_2px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ width: `${(count / filled.length) * 100}%` }}
                  />
                </div>

                {/* Bagian bawah tiket: aksi kirim */}
                <div
                  style={notchMask('top')}
                  className="relative overflow-hidden rounded-b-3xl border border-t-0 border-white/50 bg-background/85 p-6 pt-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150"
                >
                  {/* Garis perforasi di sambungan tiket */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-0 border-t-2 border-dashed border-foreground/20"
                  />
                  <div className="flex flex-col gap-2.5">
                    <Button
                      className="h-12 w-full rounded-xl text-base shadow-[0_6px_20px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)] aria-disabled:pointer-events-none aria-disabled:opacity-50"
                      nativeButton={false}
                      render={
                        <a
                          href={mailto}
                          onClick={handleSend}
                          aria-disabled={!canSend}
                        />
                      }
                    >
                      <Mail data-icon="inline-start" />
                      <span>Send my brief</span>
                    </Button>

                    <div className="flex gap-2.5">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 flex-1 rounded-xl"
                        onClick={copyBrief}
                        disabled={!canSend}
                      >
                        {copyState === 'ok' ? (
                          <Check data-icon="inline-start" />
                        ) : (
                          <Copy data-icon="inline-start" />
                        )}
                        <span>{copyState === 'ok' ? 'Copied' : 'Copy brief'}</span>
                      </Button>
                      {whatsapp ? (
                        <Button
                          variant="outline"
                          className="h-11 flex-1 rounded-xl"
                          nativeButton={false}
                          render={
                            <a
                              href={whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                if (!canSend) e.preventDefault()
                              }}
                              aria-disabled={!canSend}
                            />
                          }
                        >
                          <MessageCircle data-icon="inline-start" />
                          <span>WhatsApp</span>
                        </Button>
                      ) : null}
                    </div>

                    {!canSend ? (
                      <p className="text-center text-xs text-muted-foreground">
                        Still needed: {missing.join(', ')}.
                      </p>
                    ) : (
                      <p className="text-center text-xs text-muted-foreground">
                        Free discovery call. No commitment.
                      </p>
                    )}
                    <p
                      role="status"
                      aria-live="polite"
                      className="min-h-4 text-pretty text-center text-xs text-foreground"
                    >
                      {feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}