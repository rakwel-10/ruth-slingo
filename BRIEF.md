# Slingo Financial Services — landing page

Client: **Ruth Slingo**, financial coach and agency owner. Slingo Financial Services was founded by
her in 2019 as *Ideas by Ruth*. Consumer-facing page — families, not agent recruiting.

Deliverable: `index.html`, one self-contained static page. Tailwind + Lucide via CDN, no build step.
Double-click to open. Sections map cleanly onto GoHighLevel blocks.

---

## Source of truth

**Ruth's own document — `protect what you've built. educate. empower. create legacy.pdf` — is the
main reference.** Section order, headings, and body copy come from it, near-verbatim. Her visual
intent is followed too: gold CTAs, lavender cards with a photo on top and a purple pill button,
"Empower." set in gold in the hero.

Two earlier sources were resolved against it:

- An initial written brief said "Slingo Financial", purple `#7C3AED`, Tailwind + Lucide React. It
  contributed the sections Ruth's document doesn't cover — the stat bar, the six services, the
  three-step process — and its purple turned out to be right.
- Two mockups in `Downloads/` (`a923b1fa-….png`, `297aa4b3-….png`) showed a cream/navy/terracotta
  "Ruth Slingo" identity. **Rejected** — that is a speculative rebrand, and the woman in it is a
  model, not Ruth. `Ruth Reel 1.mp4` carries the real purple SLINGO FINANCIAL SERVICES logo.

Per instruction, ruthslingo.com is not used as a structural reference and the site URL is not
linked on the page.

## Decisions

| | |
|---|---|
| Brand | Real Slingo Financial Services identity, purple. Agency name as the wordmark. |
| Stack | Static HTML + Tailwind CDN + Lucide CDN |
| Scope | Landing page only; nav links are in-page anchors. No stat/trust bar — removed at the client's request 2026-08-20 |
| Assessment | Presentational — copy plus Ruth's scorecard artwork. The interactive quiz was removed 2026-08-20; CTA needs a live link |
| Forms | Front-end only — validate, show success, transmit nothing |
| Photography | Ruth supplied the hero shot, headshot and RS monogram; the three card photos are still reel frames. Every image marked `SWAP` |
| Contact | (818) 620-5797 · ruth@ruthslingo.com |

## Design system

Colours sampled from her reel's end-card with ffmpeg — not invented:

```
--ink      #25135C   deep violet: dark bands, headings
--violet   #5819BC   brand purple: secondary actions, rules
--bright   #7F47FD   bright violet: the portrait medallion field
--gold     #D9A441   Ruth's CTA colour, and her medallion ring
--lilac    #EDE4FB   the card fill from her document
--mist     #F7F5FC   soft neutral section ground
--body     #3E3459   body copy
```

**Buttons**, as set on 2026-08-20:

| Button | Colour | Where |
|---|---|---|
| Get started | **gold** | hero, over the photograph |
| Schedule consultation | **violet** | nav, desktop and mobile drawer |
| Learn more | violet pill | the three "what's next?" cards |
| Take the assessment · Submit · Schedule a time with Ruth | gold | further down the page |

"Watch story" was removed from the hero on 2026-08-20, along with its modal, its JavaScript and the
poster image — the hero now carries a single call to action. The hero CTA was tried in violet and in
white before returning to **gold**, which is what Ruth's
document uses for "start something" — and gold is now the only warm colour on the page, so it reads
as the primary action everywhere it appears. The nav CTA stays **violet**, which keeps the persistent
chrome from competing with the hero. `.btn-white` remains defined in the stylesheet if the white
treatment is ever wanted back. No gradients, no drop shadows.

Type — **Fraunces** (display) + **DM Sans** (body, labels, UI).

Fraunces is a soft old-style serif: warm and approachable, sturdy enough to stay legible at the
~17 px sizes the FAQ questions and card headings now use. Set at **600**, `SOFT 25` to warm the
terminals and `WONK 0` to switch off the quirky alternates, with `-0.005em` tracking.

**Set in sentence case, not caps.** The hero reads "Protect what you've built." and the three cards
read "Educate / Empower / Create Legacy". Sentence case suits a serif and suits Ruth's voice — the
page speaks rather than announces.

**Display sizes are scaled to 0.88×** of the original set, at the client's request. Fraunces has a
generous x-height, so it still reads comfortably at that size; the FAQ questions land near 17 px and
hold.

**True italics are back.** Fraunces has real italics, so Ruth's mission line, the closing "Because I
know what it feels like…" and "Create Legacy" in the hero are genuinely italic again, not the
upright substitutes Sora required.

**Still uppercase — the micro-label system**, which is DM Sans rather than the display face: nav
links, button labels, section eyebrows, form field labels, the floor-plan room labels, and the
SLINGO wordmark. These are deliberately a separate voice, small and letter-spaced. If you want them
in sentence case too, it is one CSS line (`.label { text-transform: none }`) plus the wordmark.

*Type history:* **Bodoni Moda** (too fragile small) → **Fraunces** → **Prata** (single weight) →
**Cormorant Garamond** (needed +14% size) → **Sora** (sans, no italics) → back to **Fraunces**,
smaller and in sentence case. Swapping is two lines — the Google Fonts URL and the `display`/`sans`
families in the Tailwind config — plus whatever size scale that face needs.

### The idea the page hangs on

In her own words: *"I spent more than 25 years as an interior designer, learning how to look at the
whole picture… Funny enough, that's exactly how I approach finances today."*

So the page borrows a drawing-set register — hairline rules, spec tiles, generous white space, and an
assessment that reads a household as a whole layout across six areas rather than one number.
Sections are not numbered; "How it works" is, because it is the only real sequence on the page.

## The three sub-pages

Built 2026-08-20 from Ruth's draft mock-up (the three-column image: Educate navy, Empower teal,
Create Legacy burgundy). **Copy comes from that draft; design, colour and type come from this site** —
so the tri-colour scheme in her mock-up is not used. All three run the site's purple-and-gold system.

```
educate.html          empower.html          create-legacy.html
```

Each is a plain self-contained file like `index.html`. The three "Learn more" buttons on the home
page now point at them.

**Shared chrome is byte-identical across all four files** — same `<style>` block, same Tailwind
config, same nav and footer markup, all verified by checksum. On a sub-page the nav and footer anchors
resolve to `index.html#…` and the logo goes to `index.html`; the nav itself gains no new items, as
requested. `assets/_source/pages-generator.js` is the script that produced the three files — rerun it
after changing `index.html`'s head, nav or footer to propagate those blocks.

*Bug worth remembering:* the generator originally sliced `index.html` by **line number**. Removing the
Watch story button shifted every offset below it, and the next regeneration silently emitted pages
with no opening `<header>` or `<footer>` tag and a duplicated `<body>`. It now extracts by markers
and throws if any block looks truncated. Never reintroduce line-number slicing here.

### What is on each page

| | Educate | Empower | Create Legacy |
|---|---|---|---|
| Headline | You don't know what you don't know. | You don't need more information. You need a strategy for what to do with it. | What you're building today can impact generations. |
| CTA | Start my financial overview | Find my next step | Start my legacy conversation |
| Middle | Six question tiles — 401(k)/IRA, retirement income, debt, life insurance, college, tax-advantaged retirement — then the "I don't look at just one piece" panel | Three paths — insurance professional, entrepreneur, personal brand — then "My journey. Your advantage." | Four pillars — Protect, Preserve, Provide, Pass it on — then the legacy pull-quote |
| Form | My financial overview: name, email, phone, eight checkboxes, one open question | Let's talk about what you're building: name, email, phone, five radio options, two open questions | What are you building for: name, email, phone, eight checkboxes, one open question |
| Close | "Not ready to talk yet? Start here." | "Not ready yet? Let's stay connected." | "Not ready yet? Start with a free resource." |

Forms are front-end only, like the rest of the site — they validate, show a success state, and
transmit nothing. One handler covers every form on the page (`.js-form`).

### Still to sort on these pages

- **Photography.** Every image is reel b-roll standing in, marked `SWAP`. The draft wants specific
  shots: Ruth with a couple (Educate), Ruth presenting at a whiteboard (Empower), a multigenerational
  family outdoors (Create Legacy), plus a portrait for each of the three Empower paths.
- **The two lead magnets** — "5 Questions That Could Change Your Financial Future" and "The Legacy
  Planning Guide" — are typographic stand-ins for the printed covers in the draft. Real cover artwork
  drops straight in.
- **"Send me informed"** in the draft's Empower band reads like a slip; rendered as "Keep me
  informed". Confirm.
- **The three "Explore … coaching" links** inside the Empower path cards currently jump to that
  page's own form, since no separate coaching pages exist yet.
- Footer privacy and terms links are still `#`.

## The "Let's talk about what's next?" cards

Rebuilt 2026-08-20 for a more modern read. The previous version was a flat lavender box with centred
text, a centred hairline and a purple pill button. Now:

- **Hairline plate** on the white ground — same border language as the service spec tiles, square
  corners, no shadow.
- **Copy set left**, heading in Fraunces at 1.5rem with the centred divider removed.
- **The original purple pill button**, centred at the foot of each card. A coloured track rule across
  the top of each card and an arrow-style link were both tried and removed at the client's request
  (2026-08-20).
- **The photograph eases in on hover** (`scale 1.05` over 900ms), disabled under
  `prefers-reduced-motion`.
- Buttons stay baseline-aligned across the three cards regardless of copy length (`mt-auto`).

*Copy change to confirm:* the Create Legacy card previously carried two inline links — "Read Ruth's
journey" and "schedule time with Ruth", from the "(learn more)" / "(click here)" placeholders in
Ruth's document. With an arrow link now at the foot of every card, the inline pair read as clutter,
so that sentence is plain text and the card's arrow goes to her story. Booking is already a prominent
CTA further down the page.

*Note on the lavender:* Ruth's document fills these cards with lilac. That fill is gone here in
favour of white plates on white, which is what makes them read modern. `--lilac` is still in the
token set if she wants it back.

## The assessment section

Copy on the left, **Ruth's own scorecard artwork** on the right (`assets/scorecard.png`, a
transparent PNG from her document), gold "Take the assessment" CTA beneath the copy. This matches
the layout in her document.

**The interactive quiz was removed on 2026-08-20 at the client's request** — first the floor-plan
drawing, then everything else in that column. The section is now presentational: it explains the
assessment, shows what the scorecard looks like, and sends people to it.

All of the machinery went with it rather than being left dead in the file: the plan SVG and its CSS,
the twelve questions, scoring, bands, gap logic, `localStorage` persistence, and the score-email
form and its handler. Only the newsletter form's JavaScript remains.

**The CTA has nowhere to go yet.** "Take the assessment" currently points at `#consult` and is
marked `SWAP` — repoint it at the live assessment (GoHighLevel, Typeform, or wherever it is hosted)
when that exists. Until then the section promises a thing the site cannot deliver, which is the one
loose end here.

*Note:* the six-area framing — Family, Home, Children, Debt, Wealth, Retirement — is still the spine
of the copy, and the "two areas worth reviewing first" language in the FAQ still matches what the
real scorecard delivers.

## Copy notes — decisions you may want to overrule

- **Hero subheadline is verbatim**, including "Making and defining you a road map…". It reads like a
  slip; suggested fix: *"Building and defining a road map for what it means to empower, build
  wealth, and create a legacy."* Say the word and I'll change it.
- **The EMPOWER card sentence stops mid-way in the source** ("…you'll gain the confidence and
  accountability,"). Completed on the page as "…to keep moving, month after month." Marked with an
  HTML comment. Confirm the wording.
- **"Ideas byRuth"** rendered as "Ideas by Ruth".
- **FAQs** — her document has the heading only, so all six Q&As are drafted for her review. One was rewritten when the quiz came out, since it described on-page answer storage that no longer happens.
- **Testimonials** — her document still carries the Canva template's recruitment-agency quotes
  ("the only recruiter who read my code"). Replaced with on-subject stand-ins, each labelled
  "Placeholder · replace".
- **Footer** — her document's footer is unedited Canva boilerplate (Impact Inc Recruitment, 123
  Anywhere St). Rebuilt with her real details.

## Assets — provenance and quality

**Ruth supplied three real assets (2026-08-20), and they are now the ones the page leads with.**
Client originals are kept untouched in `assets/_source/`.

| File | Source | Note |
|---|---|---|
| `hero.jpg` | her `hero-image.jpg`, 1920×1080 | The hero photograph. Updated 2026-08-20 to her lilac-graded version — the room now reads violet rather than warm neutral, which ties it to the brand. The previous warm grade is kept at `_source/hero-image-v1-warm.jpg`. Composition leaves clean negative space at the left, so the headline sits in it. |
| `logo-rs.png` | her `logo.webp` | The real **RS monogram** — deep purple R, gold S, gold bar-chart motif. Supplied on a white background with no alpha, so white was keyed out to transparent. Now used in the nav and, on a white chip, in the footer. |
| `ruth-portrait.jpg` | her square headshot | Same shoot as the hero. Replaces the soft video still in the bio medallion. |
| `card-educate/empower/legacy.jpg` | reel b-roll @14s, 100s, 39s | Still placeholders — the stock b-roll from her own reel. Re-cut untinted on 2026-08-20; they now show natural colour on a white ground. |
| `scorecard.png` | her `pdf.png` | The four-page scorecard artwork, transparent PNG. Leads the assessment panel. |

The monogram is useful confirmation: **deep purple + gold** is her real pair, which is what the page
already runs on. Note it is a *personal* monogram (RS = Ruth Slingo) while the wordmark beside it
reads "Slingo Financial Services" — if she'd rather the nav carry the company ribbon-S mark from her
reel instead, that's a one-line swap.

The three card photos are still video stills and are soft. Her own document uses real photos of her
on those cards (on a Zoom call, presenting, at her laptop) — those are the ones to ask for next.

There is no story video on the page any more — the "Watch story" button and its modal were removed
on 2026-08-20, so nothing is waiting on a film.

### How the hero behaves

**Full width, in a 20px white frame, one screen tall.** The photograph runs to within 20px of the
viewport edge at every size — the 1600px cap was removed on 2026-08-20 and replaced with an even
20px white margin on all four sides (`px-5 pb-5`, plus `pt-[92px]` = the 72px fixed nav + 20px).

The plate is `calc(100svh - 112px)` tall, the 112px being nav + the two 20px gaps, so **nav + frame +
plate + frame is exactly one screen**. `svh` rather than `vh` so mobile browser chrome doesn't push
the CTA off. Measured in the browser: 20px top, left, right and bottom, and a 1000px viewport gives a
1000px section. Verified clean to 2560px.

The copy inside sits on the same `max-w-[1300px]` grid as every section below, so the headline lines
up with the section headings rather than floating out to the image edge.

**No overlay.** The 20% black tint was removed on 2026-08-20 — Ruth's current hero export has its own
scrim baked into the left third, and doubling up only muddied the photograph.

- **sm and up** — photograph fills the frame, copy laid over it at the left.
- **Phones** — a 16:9 image cropped to a tall frame would put the copy across her face, so under
  640px the photo becomes a full-bleed band (40svh, capped at 380px) and the headline sits on solid
  violet beneath it.

**Contrast, measured at 1440 on the current export with no overlay:**

| Text | Median | Worst 10% | Needs | |
|---|---|---|---|---|
| "Protect what you've built." | 5.56:1 | 3.59:1 | 3:1 | **pass** |
| "Educate." | 5.64:1 | 3.71:1 | 3:1 | **pass** |
| "Create Legacy" | 3.05:1 | 2.14:1 | 3:1 | borderline |
| "Empower." (gold) | 4.50:1 | 1.00:1 | 3:1 | borderline |
| Body paragraph | 10.85:1 | 3.89:1 | 4.5:1 | borderline |

Better than the previous export — "Create Legacy" was failing outright at 2.76:1 median and is now
sitting exactly on the 3:1 line. Nothing fails, but three items are borderline in the same places:
where the copy crosses the lamp and the pale chair. A soft `text-shadow` on the display type is the
one-line fix that leaves the photograph untouched. Not applied.

**Hero export history** — all kept in `assets/_source/`: `hero-image-v1-warm.jpg` (warm neutral),
`hero-image-v2-lilac.jpg` (lilac grade), `hero-image-v3-lilac-scrim.jpg` (lilac plus a strong baked-in
left scrim — the best of the set for text contrast), `hero-image-v4-bright.jpg` (brighter, scrim mostly
gone), `hero-image.jpg` (current — same framing with a little more contrast back).

## Must be replaced before launch

- Real photography (above) · real permissioned testimonials · carrier logos (six neutral tiles now)
- The scheduler — "Schedule consultation" opens a mailto; point it at Calendly/GoHighLevel (`SWAP`)
- Privacy policy / Terms links are `#`
- **Licensing disclaimer** in the footer is drafted. Compliance review needed, plus state licensing
  detail if required.

## Wiring up the forms

Both forms (`scoreForm`, `newsForm`) validate and show a success state. To go live, POST in their
submit handlers at the bottom of `index.html` — a GoHighLevel inbound webhook or Formspree endpoint
both work with no backend.

## Verified

Rendered in headless Chrome at 1440 px and at a true 390 px viewport (inside an iframe, since Chrome
enforces a minimum window width on Windows): no horizontal overflow, nav collapses to a drawer,
cards and columns stack, the floor plan reflows and stays legible. The assessment was driven end to
end programmatically — twelve questions, scoring, banding, weakest-area flags, and the scorecard all
behave. Reduced motion is respected.

## Not built

Educate / Empower / Create Legacy sub-pages (the three "Learn more" buttons currently jump to the
matching section) · live form delivery · deployment · a web cut of the story film.
