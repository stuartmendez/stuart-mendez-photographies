# AGENTS.md

## Project overview

A single-page editorial photography portfolio (English copy) for **Stuart Mendez Photography** (Instagram @stewymendez, email stewymendez@gmail.com). Built with TanStack Start on Netlify. Sections: hero, statement, Portfolio (filterable gallery + lightbox), Travel (editorial sequence + lightbox), About (with commissions and testimonial), Contact form.

## Architecture

| Path | Purpose |
| --- | --- |
| `src/data/site.ts` | **All editable content**: name/contact, `portfolio` and `travel` photo lists (file, title, place, year, real width/height, alt), about principles, services, testimonial, session types. Edit here, not in components. |
| `src/routes/index.tsx` | The whole page, split into section components (Header, Hero, Statement, Portfolio, Travel, About, Contact, Footer). |
| `src/routes/__root.tsx` | HTML shell (`lang="en"`), meta tags from `site`, Google Fonts link, `grain` body class. Fonts: Cormorant Garamond (display) + Jost (body). |
| `src/components/Lightbox.tsx` | Full-screen photo viewer on Radix Dialog primitives; arrow keys navigate. |
| `src/components/ContactForm.tsx` | Netlify Forms contact form (`contacto` — name kept for submission continuity), AJAX POST to `/contact-form.html`. |
| `public/contact-form.html` | Static registration copy of the form so Netlify detects it at deploy. Field names must match `ContactForm.tsx` exactly. |
| `src/lib/img.ts` | `img()` / `srcSet()` helpers that build Netlify Image CDN URLs (`/.netlify/images?url=/img/...&w=...&fm=webp`). |
| `public/img/` | Source photos (AI-generated sample imagery, to be replaced by the owner's work). |
| `src/styles.css` | Theme variables (near-black warm palette, champagne `--primary`, square corners), fonts, grain overlay, `rise`/`slow-zoom`/`.reveal` animations, `.link-line` underline for minimal text links. |

## Conventions and decisions

- The palette is dark by default in `:root`; do not add the `.dark` class (it would swap in the template's neutral dark palette).
- Always render photos through `img()`/`srcSet()` — never link the multi-MB originals directly.
- `.reveal` elements are made visible by `useReveal()` (IntersectionObserver) in `index.tsx`; respect `prefers-reduced-motion`.
- Changing contact form fields requires updating both `ContactForm.tsx` and `public/contact-form.html`.
- Use theme classes (`bg-primary`, `text-muted-foreground`) rather than raw colors. Headings use `font-display`.
- Components PascalCase, `@/` import alias, strict TypeScript (no unused locals).
- `src/routeTree.gen.ts` is generated; don't edit it. UI primitives live in `src/components/ui/` (shadcn).
