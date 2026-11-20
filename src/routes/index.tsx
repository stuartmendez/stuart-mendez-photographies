import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Camera, Mail, Menu } from 'lucide-react'

import { ContactForm } from '@/components/ContactForm'
import { Lightbox } from '@/components/Lightbox'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { about, categories, hero, portfolio, services, site, testimonial, travel, type Category } from '@/data/site'
import { img, srcSet } from '@/lib/img'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

const links = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#travel', label: 'Travel' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const instagramUrl = `https://instagram.com/${site.instagram}`

/** Adds `is-visible` to `.reveal` elements as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

function Home() {
  useReveal()
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Statement />
        <Portfolio />
        <Travel />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn('group flex flex-col items-center leading-none', className)} aria-label={`${site.name} ${site.tagline} — back to top`}>
      <span className="font-display text-xl font-normal uppercase tracking-[0.42em] transition-colors group-hover:text-primary sm:text-2xl">
        {site.wordmark}
      </span>
      <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.6em] text-muted-foreground">{site.tagline}</span>
    </a>
  )
}

const navLink = 'link-line text-[0.7rem] uppercase tracking-[0.32em] text-foreground/75 transition-colors hover:text-foreground'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,padding] duration-700 motion-reduce:transition-none',
        scrolled ? 'border-b border-border/60 bg-background/90 py-4 backdrop-blur-md' : 'border-b border-transparent py-7',
      )}
    >
      <div className="mx-auto grid max-w-content grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10">
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.slice(0, 2).map((l) => (
            <a key={l.href} href={l.href} className={navLink}>
              {l.label}
            </a>
          ))}
        </nav>
        <Wordmark className="col-start-1 items-start md:col-start-2 md:items-center" />
        <div className="col-start-3 flex items-center justify-end gap-10">
          <nav aria-label="Secondary" className="hidden items-center gap-10 md:flex">
            {links.slice(2).map((l) => (
              <a key={l.href} href={l.href} className={navLink}>
                {l.label}
              </a>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger
              className="flex size-10 items-center justify-center border border-foreground/20 transition-colors hover:border-primary md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-border bg-background p-10 sm:max-w-sm">
              <SheetTitle className="font-display text-2xl font-normal uppercase tracking-[0.3em]">{site.name}</SheetTitle>
              <SheetDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{site.tagline}</SheetDescription>
              <nav aria-label="Mobile" className="mt-14 flex flex-col gap-7">
                {links.map((l, i) => (
                  <SheetClose asChild key={l.href}>
                    <a href={l.href} className="font-display text-5xl font-light italic transition-colors hover:text-primary">
                      <span className="mr-5 align-middle font-sans text-[0.65rem] not-italic tracking-[0.3em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto space-y-3 text-sm text-muted-foreground">
                <a href={`mailto:${site.email}`} className="block hover:text-primary">
                  {site.email}
                </a>
                <a href={instagramUrl} target="_blank" rel="noreferrer" className="block hover:text-primary">
                  @{site.instagram}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <img
        src={img(hero.file, 1920, 80)}
        srcSet={srcSet(hero.file, [800, 1280, 1920, 2560])}
        sizes="100vw"
        alt={hero.alt}
        fetchPriority="high"
        className="slow-zoom absolute inset-0 size-full object-cover object-[57%_60%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/50" />
      <div className="relative mx-auto flex w-full max-w-content flex-col items-center px-5 pb-12 text-center sm:px-10 md:pb-16">
        <p className="rise text-[0.7rem] uppercase tracking-[0.5em] text-foreground/80" style={{ animationDelay: '250ms' }}>
          Portrait · Wedding · Travel
        </p>
        <h1
          className="rise mt-8 font-display text-[clamp(3rem,8.5vw,8rem)] font-light leading-[0.95] tracking-tight"
          style={{ animationDelay: '400ms' }}
        >
          The quiet moment,
          <br />
          <em className="text-primary">held in light.</em>
        </h1>
        <div
          className="rise mt-16 flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between"
          style={{ animationDelay: '750ms' }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground sm:w-1/3 sm:text-left">{hero.caption}</p>
          <a href="#portfolio" className="group flex flex-col items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] hover:text-primary">
            Enter
            <span aria-hidden className="h-14 w-px bg-foreground/40 transition-colors duration-500 group-hover:bg-primary" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground sm:block sm:w-1/3 sm:text-right"
          >
            <span className="link-line">@{site.instagram}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-5 text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="font-display text-base normal-case italic tracking-normal text-primary">{n}</span>
      <span className="h-px w-12 bg-border" />
      {children}
    </p>
  )
}

function Statement() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-10 md:py-44">
      <p className="reveal font-display text-3xl font-light leading-snug text-foreground/90 md:text-5xl md:leading-tight">
        Photographs made slowly, with natural light and an editor’s eye — for people who want their story told{' '}
        <em className="text-primary">honestly, and beautifully.</em>
      </p>
      <p className="reveal mt-12 text-[0.7rem] uppercase tracking-[0.5em] text-muted-foreground">{site.name}</p>
    </section>
  )
}

function Portfolio() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)
  const visible = useMemo(() => (filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)), [filter])

  return (
    <section id="portfolio" className="mx-auto max-w-content scroll-mt-24 px-5 pb-28 sm:px-10 md:pb-40">
      <div className="reveal mb-16 flex flex-col items-center text-center md:mb-24">
        <SectionLabel n="I">Portfolio</SectionLabel>
        <h2 className="mt-8 font-display text-6xl font-light leading-none md:text-8xl">
          Selected <em className="text-primary">Work</em>
        </h2>
        <div role="tablist" aria-label="Filter by category" className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                'link-line text-[0.7rem] uppercase tracking-[0.32em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
                filter === c.id ? 'text-primary' : 'text-foreground/60 hover:text-foreground',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="border border-dashed border-border py-24 text-center text-muted-foreground">No photographs in this category yet.</p>
      ) : (
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 lg:gap-10 [&>*]:mb-12">
          {visible.map((p, i) => (
            <figure
              key={`${filter}-${p.id}`}
              className="break-inside-avoid animate-in fade-in-0 slide-in-from-bottom-4 duration-700 motion-reduce:animate-none"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label={`View “${p.title}” full screen`}
              >
                <span className="block overflow-hidden bg-card">
                  <img
                    src={img(p.file, 800)}
                    srcSet={srcSet(p.file, [480, 800, 1200])}
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 92vw"
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="h-auto w-full transition-[transform,filter] duration-[1.4s] ease-out group-hover:scale-[1.03] group-hover:brightness-110 motion-reduce:transition-none"
                  />
                </span>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl font-light italic transition-colors group-hover:text-primary">{p.title}</span>
                  <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {p.place} · {p.year}
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      )}
      <Lightbox photos={visible} index={open} onChange={setOpen} />
    </section>
  )
}

function Travel() {
  const [open, setOpen] = useState<number | null>(null)
  const lightboxPhotos = useMemo(() => travel.map((t) => ({ ...t, place: `${t.place}, ${t.country}` })), [])
  const stories = travel.slice(0, -1)
  const finale = travel[travel.length - 1]

  return (
    <section id="travel" className="scroll-mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-content px-5 py-28 sm:px-10 md:py-40">
        <div className="reveal mb-20 grid gap-10 md:mb-28 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n="II">Travel</SectionLabel>
            <h2 className="mt-8 font-display text-6xl font-light leading-none md:text-8xl">
              Field <em className="text-primary">Notes</em>
            </h2>
          </div>
          <p className="max-w-reading text-lg font-light leading-relaxed text-foreground/70 md:col-span-5">
            An ongoing series from the road — coastlines, mountain valleys and quiet towns, photographed at the edges of the day when
            the light is at its most generous.
          </p>
        </div>

        <div className="space-y-24 md:space-y-36">
          {stories.map((t, i) => (
            <article key={t.id} className="reveal grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View “${t.title}” full screen`}
                className={cn(
                  'group block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:col-span-8',
                  i % 2 === 1 && 'md:order-2 md:col-start-5',
                )}
              >
                <img
                  src={img(t.file, 1400)}
                  srcSet={srcSet(t.file, [700, 1100, 1400, 1800])}
                  sizes="(min-width: 768px) 60vw, 92vw"
                  alt={t.alt}
                  width={t.width}
                  height={t.height}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </button>
              <div className={cn('md:col-span-4', i % 2 === 1 && 'md:order-1 md:col-start-1 md:row-start-1')}>
                <p className="text-[0.7rem] uppercase tracking-[0.4em] text-primary">
                  {String(i + 1).padStart(2, '0')} — {t.country}
                </p>
                <h3 className="mt-5 font-display text-4xl font-light italic leading-tight md:text-5xl">{t.title}</h3>
                <p className="mt-6 leading-relaxed text-foreground/70">{t.note}</p>
                <p className="mt-6 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {t.place} · {t.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(travel.length - 1)}
          aria-label={`View “${finale.title}” full screen`}
          className="group relative block h-[80svh] min-h-[28rem] w-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
        >
          <img
            src={img(finale.file, 1920, 80)}
            srcSet={srcSet(finale.file, [800, 1280, 1920, 2560])}
            sizes="100vw"
            alt={finale.alt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 mx-auto grid max-w-content gap-6 px-5 pb-12 text-left sm:px-10 md:grid-cols-12 md:items-end md:pb-16">
            <span className="md:col-span-6">
              <span className="block text-[0.7rem] uppercase tracking-[0.4em] text-primary">
                {String(travel.length).padStart(2, '0')} — {finale.country}
              </span>
              <span className="mt-4 block font-display text-5xl font-light italic md:text-7xl">{finale.title}</span>
            </span>
            <span className="max-w-reading leading-relaxed text-foreground/75 md:col-span-5 md:col-start-8">{finale.note}</span>
          </span>
        </button>
      </div>
      <Lightbox photos={lightboxPhotos} index={open} onChange={setOpen} />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto grid max-w-content gap-16 px-5 py-28 sm:px-10 md:grid-cols-12 md:gap-12 md:py-40">
        <div className="reveal relative md:col-span-5">
          <img
            src={img(about.file, 900)}
            srcSet={srcSet(about.file, [500, 900, 1200])}
            sizes="(min-width: 768px) 38vw, 92vw"
            alt={about.alt}
            width={about.width}
            height={about.height}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <span aria-hidden className="absolute -bottom-6 -right-4 hidden h-40 w-40 border border-primary/40 md:block md:-right-8" />
        </div>
        <div className="reveal flex flex-col justify-center md:col-span-6 md:col-start-7">
          <SectionLabel n="III">About</SectionLabel>
          <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] md:text-7xl">
            I’m Stuart. I photograph what happens <em className="text-primary">when no one is posing.</em>
          </h2>
          <div className="mt-10 space-y-6 text-lg font-light leading-relaxed text-foreground/75">
            {about.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <dl className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {about.principles.map((s) => (
              <div key={s.title}>
                <dt className="font-display text-2xl font-light italic text-primary">{s.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 pb-28 sm:px-10 md:pb-40">
        <div className="reveal mb-12 flex flex-col items-center text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">Commissions</p>
        </div>
        <ol className="grid border-t border-border md:grid-cols-3 md:border-t-0">
          {services.map((s, i) => (
            <li
              key={s.name}
              className={cn(
                'reveal group border-b border-border py-10 md:border-b-0 md:border-t md:px-10 md:py-14',
                i > 0 && 'md:border-l',
              )}
            >
              <span className="font-display text-base italic text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 font-display text-4xl font-light transition-colors group-hover:text-primary">{s.name}</h3>
              <p className="mt-5 leading-relaxed text-foreground/70">{s.detail}</p>
              <a href="#contact" className="link-line mt-8 inline-block text-[0.65rem] uppercase tracking-[0.32em] text-primary">
                Enquire
              </a>
            </li>
          ))}
        </ol>
      </div>

      <figure className="reveal border-y border-border px-5 py-28 text-center sm:px-10 md:py-40">
        <div className="mx-auto max-w-4xl">
          <span aria-hidden className="block font-display text-7xl leading-none text-primary">
            “
          </span>
          <blockquote className="font-display text-3xl font-light italic leading-snug md:text-5xl">{testimonial.quote}</blockquote>
          <figcaption className="mt-10 text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
            {testimonial.author} — {testimonial.context}
          </figcaption>
        </div>
      </figure>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-content scroll-mt-24 px-5 py-28 sm:px-10 md:py-40">
      <div className="reveal flex flex-col items-center text-center">
        <SectionLabel n="IV">Contact</SectionLabel>
        <h2 className="mt-8 font-display text-6xl font-light leading-none md:text-8xl">
          Let’s make <em className="text-primary">something lasting</em>
        </h2>
        <p className="mt-8 max-w-reading text-lg font-light leading-relaxed text-foreground/70">
          For portraits, weddings, travel and editorial commissions, tell me a little about what you have in mind. Every enquiry is
          answered personally.
        </p>
        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:gap-14">
          <a href={`mailto:${site.email}`} className="link-line inline-flex items-center gap-3 text-sm tracking-[0.08em] hover:text-primary">
            <Mail className="size-4 text-primary" aria-hidden /> {site.email}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="link-line inline-flex items-center gap-3 text-sm tracking-[0.08em] hover:text-primary"
          >
            <Camera className="size-4 text-primary" aria-hidden /> @{site.instagram}
          </a>
        </div>
      </div>
      <div className="reveal mx-auto mt-20 max-w-3xl border border-border p-6 sm:p-12 md:mt-24">
        <ContactForm />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10 px-5 py-16 text-center sm:px-10">
        <Wordmark />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={navLink}>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          Instagram <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} {site.name} {site.tagline} · All images protected by copyright
        </p>
      </div>
    </footer>
  )
}
