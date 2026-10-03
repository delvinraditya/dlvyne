import Image from 'next/image'
import { Camera, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tool = {
  name: string
  role: string
  // Urutan prioritas ikon: logo (file di /public) > ikon lucide > teks singkat.
  // Teks singkat dipakai sebagai cadangan, ganti dengan logo resmi kalau ada.
  logo?: string
  icon?: LucideIcon
  mark?: string
}

const webStack: Tool[] = [
  {
    name: 'HTML',
    mark: 'H5',
    role: 'Clean, accessible structure that search engines and screen readers understand.',
  },
  {
    name: 'CSS',
    mark: 'C3',
    role: 'Responsive layouts that follow your brand on every screen.',
  },
  {
    name: 'JavaScript',
    mark: 'JS',
    role: 'Interactions that feel smooth and respond the way people expect.',
  },
  {
    name: 'Next.js',
    mark: 'Nx',
    role: 'Fast page loads and a solid base for search visibility.',
  },
  {
    name: 'Supabase',
    mark: 'Sb',
    role: 'Database, login and file storage when your project needs them.',
  },
  {
    name: 'GitHub',
    mark: 'Gh',
    role: 'Project management system that track every changes.',
  },
  {
    name: 'Vercel',
    mark: 'Vc',
    role: 'Makes the website go online for free.',
  },
]

const design: Tool[] = [
  {
    name: 'Adobe Illustrator',
    mark: 'Ai',
    role: 'Logos and vector identity that stay sharp at any size.',
  },
  {
    name: 'Adobe Photoshop',
    mark: 'Ps',
    role: 'Retouching and image compositing with a clean, finished look.',
  },
  {
    name: 'Canva',
    mark: 'Ca',
    role: 'Quick social and marketing visuals, delivered fast.',
  },
]

const photography: Tool[] = [
  {
    name: 'Sony A5100',
    icon: Camera,
    role: '24MP APS-C mirrorless camera for sharp detail and rich texture.',
  },
  {
    name: 'Adobe Lightroom',
    mark: 'Lr',
    role: 'Color grading and consistent edits across an entire set of photos.',
  },
]

// Resep kaca yang sama dengan section lain.
const glass =
  'relative overflow-hidden rounded-3xl border border-white/40 bg-white/45 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/[0.06]'

function Sheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/50 via-white/5 to-transparent opacity-70 dark:from-white/12 dark:via-transparent"
    />
  )
}

function ToolMark({ tool }: { tool: Tool }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-primary/10 text-primary dark:border-white/10">
      {tool.logo ? (
        <Image src={tool.logo} alt="" width={24} height={24} className="size-6" />
      ) : tool.icon ? (
        <tool.icon className="size-5" />
      ) : (
        <span className="font-mono text-sm font-semibold">{tool.mark}</span>
      )}
    </span>
  )
}

function ToolRow({ tool, className }: { tool: Tool; className?: string }) {
  return (
    <li
      className={cn(
        'group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-3.5 pl-4 pr-5 transition-colors hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10',
        className,
      )}
    >
      {/* Strip di sisi kiri, sama seperti menu mobile dan panel hero */}
      <span
        aria-hidden
        className="absolute inset-y-2 left-0 w-[3px] origin-center scale-y-0 rounded-r-full bg-primary transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
      />
      <ToolMark tool={tool} />
      <div className="min-w-0">
        <p className="font-heading text-base font-semibold leading-tight">
          {tool.name}
        </p>
        <p className="mt-0.5 text-pretty text-sm leading-snug text-muted-foreground">
          {tool.role}
        </p>
      </div>
    </li>
  )
}

function Panel({
  title,
  blurb,
  children,
  className,
}: {
  title: string
  blurb: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(glass, 'p-5 sm:p-6', className)}>
      <Sheen />
      <div className="relative">
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
        {children}
      </div>
    </div>
  )
}


export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Cahaya samar di belakang panel kaca */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-40 size-80 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-secondary/15 blur-3xl dark:bg-secondary/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <h2
            id="skills-heading"
            className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            What your project is built with.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
            Every tool here earns its place. This is what each one does for you,
            so you know exactly what you are getting.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start">
          {/* Web: lima layer, dari struktur sampai data */}
          <Panel
            title="Web development"
            blurb="A modern stack, from the first line of HTML to a live database."
            className="lg:col-span-7"
          >
            <ol className="mt-6 flex flex-col gap-2">
              {webStack.map((tool, i) => (
                <ToolRow key={tool.name} tool={tool} />
              ))}
            </ol>
          </Panel>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <Panel
              title="Graphic design"
              blurb="Tools for identity, print and social."
            >
              <ul className="mt-5 flex flex-col gap-2">
                {design.map((tool) => (
                  <ToolRow key={tool.name} tool={tool} />
                ))}
              </ul>
            </Panel>

            <Panel title="Photography" blurb="From capture to final color.">
              <ul className="mt-5 flex flex-col gap-2">
                {photography.map((tool) => (
                  <ToolRow key={tool.name} tool={tool} />
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        <p className="mt-10 text-pretty text-center text-sm text-muted-foreground">
          Not sure what your project needs? You do not have to pick.{' '}
          <a
            href="#contact"
            className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Tell us about it
          </a>{' '}
          and we will choose the right tools for the job.
        </p>
      </div>
    </section>
  )
}
