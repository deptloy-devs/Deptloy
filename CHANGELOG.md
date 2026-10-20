# Changelog — `redesign/polish`

A refinement pass on the existing site, not a rebuild. Stack, routes, content and functionality are unchanged except where noted below. Every copy change is listed under **Copy changes**, so you can review it.

---

## Design system (applies to every page)

**Why:** colors, sizes and spacing were hard-coded in place (159 color values, 10 accent hues, 6 corner sizes, 54 places with 10–11px text). The site also leaned purple while the logo is indigo → electric blue.

- **One token file:** `src/app/globals.css` now holds every design decision in three layers: raw palette → named roles → Tailwind utilities.
  - **Colors:** sampled from the logo file (`#4840F5` → `#376FF8` → `#1EBBFE`) on blue-tinted near-blacks.
  - **Roles:** `canvas`, `surface`, `card`, `raised`, `line`, and `fg` / `fg-soft` / `fg-muted` / `fg-subtle`.
  - **Status colors:** `success`, `warning` and `danger` are used for status only.
- **Contrast:** every text/background pair meets WCAG AA. The main button was **2.1:1** (white on light cyan) and is now **≥ 5.2:1**.
- **Type:** Outfit for headings (close to the logo wordmark) and Geist for body, both via `next/font`. Fluid scale: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-caption`, `text-eyebrow`. The smallest text on the site is now 12px.
- **Spacing, shape and depth:** section rhythm (`py-section`, `py-section-sm`), three radii (`rounded-control` / `card` / `panel`), elevation (`shadow-card` / `raised` / `glow`), and one easing curve.
- **Motion:** a subtle scroll fade (`Reveal`) only for content below the fold. Content is never hidden if JavaScript fails. A global `prefers-reduced-motion` rule stops all animation.
- **Shared components:**
  - **Button:** a single primary style. Link buttons now pass `onClick` through, which fixes the mobile menu staying open after you tap a button.
  - **Field:** labels, errors linked to their fields, 48px controls.
  - **Badge**, **Card**, **Container**, **Section**, **SectionHeading** (pick the heading level), **PageHero**.
  - **Modal:** focus moves into it and returns afterwards; Escape and Tab behave correctly.
  - **Logo:** exact logo colors.
  - **PlaceholderTag:** visible marker on anything you still need to supply.
- **Removed:**
  - dead CSS (`glass-panel`, `glow-card`, `pulse-subtle`)
  - animation classes from a plugin that was never installed
  - the unused `Skeleton` component
  - the Create Next App template SVGs in `public/`

## Global

- **Navbar:**
  - Sticky, and slightly more solid once you scroll.
  - One primary action (**Book a Consultation**) plus a quiet **Try the AI demo** link. The mock dashboard moved to the footer.
  - The Services dropdown now works from the keyboard (Escape returns focus), closes on outside click, and only opens on hover with a mouse.
  - Mobile menu:
    - labelled toggle with a visible focus ring
    - 48px rows
    - closes on navigation and on Escape
    - locks page scroll while open
  - New skip-to-content link and "current page" markup.
- **Second sticky bar removed.** The "Quick Navigation" strip stacked under the header and took about 130px of the screen on phones.
- **Footer:**
  - Fixed the broken industry links ("Clinics & and", "Consulting & &", "Real & Estate").
  - Email and phone are now clickable links.
  - New Company column (About, Projects, Contact, AI demo, Client portal preview).

## Home

- New section order, putting trust first: hero → proof strip → services → receptionist showcase → how it works → industries → impact → projects → testimonials → final CTA.
- **Hero:** larger display type and a single primary CTA.
  - The simulated call card is the hero visual, framed with CSS-only signal rings, a brand glow and two status chips. No images, so no layout shift.
  - It's now rendered on the server, so less JavaScript runs in the browser.
- **Proof strip (new):** four headline numbers already used elsewhere on the site, plus client-logo slots (placeholders).
- **Services:** the one-at-a-time swipe carousel is now a 4-card grid, so every service is visible. Each whole card is a link.
- **Projects:** new card with a cover illustration, service tags, a hover lift and a "Sample scenario" label.
- **Testimonials (new):** three placeholder quotes, clearly marked.
- **Industries:** each card links to the services it recommends. Previously "Learn more" went to `/industries`, which just redirected.

## Services (`/services` and the 4 detail pages)

- Shared PageHero and the same service grid as the home page; the industries section was added to `/services`.
- Detail pages and demo:
  - type scale
  - no skipped heading levels
  - 12px minimum text
  - radius and shadow tokens
  - decorative colors moved to brand; green and red reserved for status
  - full-width buttons on phones
- **AI Receptionist page:** consultation is now the primary button and the demo secondary.

## Projects

- Full case-study cards: cover, tags, the challenge and solution side by side, a metrics strip, the outcome, and **Discuss This Project**.
- Filters wrap on phones, announce their pressed state, and read out the result count to screen readers.

## About (new page, `/about`)

- Company description, then:
  - your story (placeholder)
  - at-a-glance numbers
  - industries served
  - values (draft)
  - team (placeholders)
  - CTA
- The navbar and footer "About" links now go here. They used to jump to the home page's CTA box.

## Contact

- Form validation:
  - an error summary that screen readers announce
  - focus jumps to the first invalid field
  - fields re-check as you fix them
  - focus moves to the success message
  - autofill hints
- **Bug fix:** the default budget and timeline values didn't match any dropdown option.
- Email and phone are clickable.
- **Still demo mode:** nothing is sent yet (see *Needs your input*).

## SEO and assets

- Every page has its own title, description and canonical URL, including the two pages rendered in the browser (AI Receptionist, Demo).
- **Share image (Open Graph / Twitter):** a 1200×630 brand banner with alt text. The old one was the square logo JPG.
- **Favicon:** `favicon.ico` was still the **default Vercel triangle**. It's now the Deptloy icon (16/32/48px), the SVG favicon is recolored, and there's a 180px Apple touch icon.
- `robots.txt` and `sitemap.xml` added. The sample-data dashboard is excluded from search.

## Verification

- `tsc`, `eslint` and `next build` pass, and all 21 routes prerender as static pages.
- Automated audit of every marketing page at 1440px and 390px, all passing:
  - no sideways overflow
  - one h1 per page
  - no skipped heading levels
  - no text under 12px
  - no images missing alt text
  - no unlabeled buttons or links
  - no duplicate IDs

---

## Copy changes (please review)

| Where | Before | After |
|---|---|---|
| Navbar | "Try AI Demo" button; "Dashboard" link | "Try the AI demo" link + **Book a Consultation** button; Dashboard → footer "Client portal preview" |
| Services dropdown | "Swipe service cards on Homepage", "Custom Scope →" | "View all services" |
| Mobile menu | "About Deptloy", "Experience AI Demo", "Book Consultation", "Client Dashboard Preview" | "About", "Try the AI demo", "Book a Consultation" (dashboard moved to footer) |
| Footer columns | "Tailored Services", "Platform", "Live AI Demo", "Client Dashboard", "About Deptloy" | "Industries", "Company", "AI demo", "Client portal preview", "About" |
| Home › Services intro | "Explore our specialized services one at a time. Swipe left or right, or click the tabs below to browse." | "Four core services, built to work together. Start with one, or combine them." |
| Home › Service cards | "Explore AI Receptionist" etc. | "Explore" |
| Home › How it works | "Phase 01 Duration" | "Typical timing" |
| Home › Industries | "Tailored Service" tag, "Learn more" | removed; recommended services shown as links |
| Home › Project cards | "Project Blueprint", "Read Project", "Tested Blueprint" | "Sample scenario", "Read the project" |
| Home › New sections | — | Proof strip line "Built for service businesses in healthcare, beauty, real estate and the trades"; testimonials heading "What Our Clients Say" + "How working with Deptloy changes the day-to-day for service teams." |
| /services hero | "Swipe Service Cards on Homepage" | "Book a Consultation" |
| /services cards | "View Service Details" | "Explore" |
| Projects page | sidebar "Measured Results" / "Solution Architecture: Enterprise Custom" | metrics under "Measured Impact"; "Sample scenario" label on each project |
| Contact | — | "Sending…" while submitting; error summary "Please fix N fields highlighted below." |
| About page | — | **All new, draft:** title, "Built for the businesses that can't afford to miss a call", four values, section intros |
| Page titles/descriptions | missing on 6 pages | written for About, Projects, Contact, AI Receptionist, Demo |

---

## Needs your input

1. **Contact form backend (most important).** Enquiries are not sent anywhere yet. Pick an email or CRM service and I'll wire it up as a separate task.
2. **Claims to confirm or remove:**
   - "HIPAA-compliant" (clinics industry card)
   - "SOC2 Type II Ready Architecture" (footer)
   - "99.9% uptime SLA" (Terms + Benefits)
   - "bank-grade privacy" (hero)
   - "Sub-4 Hour Response" (contact)
   - headline numbers (< 2.4s, 22+ hrs, 99.8%, 3–7 days, "~68% industry average")
3. **Projects are sample scenarios** with invented clients and figures, but the page headline says "Featured Client Projects". Either supply real case studies or rename it, e.g. "Sample Projects".
4. **Real content for the placeholders:**
   - 5 client logos (SVG preferred)
   - 3 approved testimonials (quote, name, role, company)
   - team names, roles, short bios and photos
   - the About story (2–3 paragraphs)
   - project images or screenshots to replace the cover illustrations

   Every placeholder has `isPlaceholder` in `src/lib/site.ts`.
5. **Draft copy to approve:** the About page and the values. See the copy table above.
6. **Business details:** confirm the phone number, address and the `deptloy.com` domain (used in metadata and the sitemap).
7. **Legal:** Privacy Policy and Terms are short modals. A launch needs proper legal pages.

## Developer notes

- **Dev server caching:** in `next dev`, the `@tailwindcss/turbopack` loader sometimes misses new Tailwind classes, and the server sometimes keeps rendering an old version of an edited component.
  - Workaround: save `src/app/globals.css` or restart `npm run dev`. If that's not enough, delete `.next/dev/cache`.
  - Production builds are not affected.
  - Switching to the standard `@tailwindcss/postcss` setup would likely fix it. That's a small new dev dependency, so it hasn't been done without your OK.
- `cn()` concatenates classes and does **not** merge conflicting ones, so pass variants as props (`tone`, `radius`, `padding`) rather than overriding with `className`.
- `npm audit` reports 5 high-severity issues in third-party packages. They predate this work.
