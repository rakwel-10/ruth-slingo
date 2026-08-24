# Fonts

Ceasura and Peristiwa are **not** on Google Fonts and are not installed on this
machine, so they have to be self-hosted. Drop the files here using exactly
these names and the site picks them up with no further changes:

    ceasura.woff2     (or ceasura.otf / ceasura.ttf)
    peristiwa.woff2   (or peristiwa.otf / peristiwa.ttf)

`.woff2` is preferred — typically a third the size of `.otf`, which matters
because a heading font blocks nothing but is downloaded on every page. `.otf`
and `.ttf` work too; the @font-face rule lists all three, so whichever you
supply is used.

Until the files are here, headings fall back to **Fraunces** and the page
renders normally — nothing looks broken, it just isn't the intended face.

Where each one is used:

- **Ceasura**  — all headings (`.display`): page titles, section headings,
  card titles, pull-quotes.
- **Peristiwa** — accent words inside headings only (`.display em`): the
  italic emphasis, e.g. "Create Legacy" in the hero.
- **DM Sans** — everything else: body copy, nav, buttons, form labels.
  Unchanged.

If a font ships only one weight, that is already handled:
`font-synthesis-weight: none` is set, so the browser will not fake a bold and
smear the letterforms.

**Licensing:** marketplace fonts license desktop and web use separately. A
standard purchase often does not cover `@font-face` embedding on a public
site. Worth confirming before launch.
