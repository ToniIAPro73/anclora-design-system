# Anclora Group — Design System

An ecosystem design system for **Anclora Group**, a connected network of AI-first digital products spanning internal operations, premium SaaS, real estate intelligence, and ultra-premium branded experiences.

## 1. The ecosystem

Anclora Group is not a single app — it is a coordinated network of products, each with its own surface and responsibility, all sharing a common motion contract and coin-medallion brand DNA.

| Product | Role | Tier | Accent |
|---|---|---|---|
| **Anclora Group** | Umbrella portal, role-based access to every app | Internal / Corporate | Brushed silver |
| **Anclora Private Estates** | Ultra-premium real estate landing & private area | Ultra premium | Gold |
| **Anclora Nexus** | Internal commercial OS (sellers, buyers, intake, scoring, outreach) | Internal SaaS | Gold-on-navy |
| **Synergi** | External partner portal — admission, vetting, referrals, workspace | Premium collaborative | Amethyst / rose |
| **Anclora Data Lab** | Territorial intelligence, multi-tenant intelligence packs | Premium analytical | Emerald / copper |
| **Anclora Content Generator AI** | Multi-channel authority engine (blog, LinkedIn, newsletter) | Activation | Copper |
| **Anclora Advisor AI** | Back-office: invoicing, fiscal, labor advisory | Internal utility | Teal |
| **Anclora Talent** | Talent acquisition & people ops | Internal | Steel blue |
| **Anclora Impulso** | Growth & distribution activation | Activation | Orange |
| **Anclora Command Center** | Executive ecosystem-wide observability | Internal executive | Signal red |

The ecosystem is layered:
1. **Entry** — Private Estates, Synergi (relationship & access).
2. **Core** — Data Lab, Nexus, Command Center (intelligence & coordination).
3. **Activation** — Content Generator, Advisor AI, Impulso (execution & growth).

## 2. Sources

This system was synthesized from a read-only seed mounted at `Anclora-DesignSystem-Seed/`:

- `docs/anclora-group-UI_MOTION_CONTRACT.md` — binding motion/surface contract for all apps.
- `docs/anclora-synergi-UI_MOTION_CONTRACT.md` — Synergi restatement of the contract.
- `docs/anclora-nexus-Arquitectura-Ecosistema-Anclora-Group.md` — canonical ecosystem architecture (state `2026-03-11`).
- `docs/anclora-private-estates-landing-2026-04-03-dark-only-i18n-and-visual-refinement-design.md` — dark-only ultra-premium refinement spec.
- `docs/anclora-private-estates-landing-tokens-css.md` — canonical `pe-*` tokens.
- `tokens/*.css` — per-product globals (group, data-lab, nexus, synergi, private-estates).
- `components/*/` — production-faithful `.tsx` components for each product.
- `branding/*.png` — logo medallions (copied into `assets/logos/`).

No Figma files. No codebase imports beyond the seed above.

---

## 3. CONTENT FUNDAMENTALS

### Voice
Anclora writes like a **high-end concierge who is also an operator**. Restrained, precise, confident; never exuberant. The tone stays *institutional* across all products — you never see "Hey!", "Welcome 👋", or marketing-startup energy.

- **Primary language is Spanish.** English and German are supported on Private Estates. The ecosystem thinks in Spanish first.
- **First-person plural** ("construimos", "operamos") on corporate & partner surfaces. **Second-person singular** ("tu rol", "tu acceso") on operator tools.
- **No emoji, anywhere.** The ecosystem never uses emoji as iconography — neither in product UI, nor in marketing copy, nor in brand lockups.
- **Casing**: sentence case for body + buttons-in-app, **UPPERCASE with 0.22em tracking** for eyebrows/tags/micro-labels. Display headings are cased normally.

### Vocabulary signatures
The ecosystem has a real lexicon — use these words specifically, not marketing synonyms:
- `ecosistema` (never "platform"), `capa` (layer), `inteligencia territorial`, `admisión` (not "signup"), `workspace`, `portal`, `operador`, `activación`, `memoria` (RAG/context), `outreach`, `señales`, `referrals`, `red curada`.
- Tier words: **premium**, **ultra premium**, **interno**, **corporativo**. These are taxonomy, not decoration.

### Example copy — real voice
Section eyebrow: `PORTAL CORPORATIVO`
Title: `Un punto único de acceso para todo el ecosistema.`
Body: `Autenticación corporativa con control por rol. Desde aquí entras a las aplicaciones habilitadas para tu perfil.`

Button labels: `Abrir aplicación`, `Solicitar acceso`, `Cerrar sesión`, `Enviar solicitud`. No "Get Started", no "Learn more", no "Click here".

Micro-copy is declarative, not promotional: "Apps habilitadas para tu rol" beats "Your apps"; "Aplicaciones en el ecosistema corporativo" beats "All our tools".

### What to avoid
- Marketing exclamations, "!", "?!", "let's", "you'll love".
- Generic taglines ("Smart • Fast • Secure").
- AI puffery ("AI-powered", "next-gen", "revolutionary").
- Emojis as bullets, status, or CTAs.
- Mixing languages in the same surface.

---

## 4. VISUAL FOUNDATIONS

### The shared DNA
Every product shares **four invariants**:
1. **Coin medallion logo** — a circular embossed bezel around a triple-wave glyph. Color changes per product; geometry never does.
2. **Deep dark canvas** with a two-point radial glow wash (one warm, one cool) behind a near-black linear gradient.
3. **Generous rounded containers** — large panels at `2rem–2.5rem` radius, cards at `1.5rem–2rem`, inputs at `1rem–1.125rem`, buttons pill-shaped.
4. **Eyebrow + display + body** triplet on every hero/section — the type hierarchy is a *signature*, not just a pattern.

### Colors
- **Canvas** is dark-first: inks between `#071411` (Data Lab) and `#130d1c` (Synergi), all sitting near-black with a faint color cast.
- **Foreground** is warm-white (`#f7f4ee`–`#ecf0f5`), never pure `#fff`.
- **Each product owns a single metallic accent** (see table above) — used sparingly for eyebrows, active states, one hero CTA, and the logo medallion.
- **Borders** are low-alpha accent tints: `rgba(accent, 0.18–0.32)`. We don't use hard lines.
- **Semantic colors** (success/warn/error) are low-saturation, sitting inside soft tinted pill backgrounds (see review badges in `colors_and_type.css`).
- Light themes exist for Data Lab and Synergi but are **secondary**. Private Estates is **dark-only**.

### Typography
- **Display (ultra premium)** → `Newsreader`, serif, weight 600, letter-spacing `-0.02em to -0.03em`. Used on Private Estates, Group, and premium hero sections.
- **Body premium** → `Manrope`, sans, weights 400/600/700/800.
- **Body internal / SaaS** → `DM Sans` (Data Lab, Synergi) and `Inter` (Nexus).
- **Mono** → `JetBrains Mono` for code, IDs, and tabular numerals in dashboards.
- **Eyebrows** → 0.76rem, 700 weight, `letter-spacing: 0.22em`, uppercase. This is a *signature* — it appears above every hero title and section title in the ecosystem.

### Backgrounds
- **Radial glow wash** — one or two soft colored blobs (brand accent + complementary tint) top-left / top-right, at ≤18% opacity, fading to transparent by 28–38%.
- **Linear gradient base** — `linear-gradient(180deg, ink 0%, slate 48%, ink 100%)` for subtle vertical depth.
- **Grid noise** — 32–120px square grid lines at 2–6% opacity, `pointer-events: none`, sometimes masked radially.
- **No hand-drawn illustrations. No stock photography. No loud gradients.** Full-bleed photography is reserved for Private Estates hero (editorial, atmospheric).

### Borders, cards, radii
- All cards: `border: 1px solid var(--border)` with `rgba(accent, 0.18)` tone.
- Card radius scale: chips/pills `999px`; inputs `1rem–1.125rem`; frames `1.5rem`; cards `2rem`; hero panels `2.125rem`.
- **Inside-highlight** — every elevated panel gets `inset 0 1px 0 rgba(255,255,255,0.05)` to simulate a subtle glass top-edge.

### Shadows (dark-first elevation)
Four levels, always with heavy downward blur and zero horizontal offset:
- `shadow-sm`: `0 14px 34px rgba(0,0,0,0.30)` — resting cards
- `shadow-md`: `0 18px 38px rgba(0,0,0,0.34)` — buttons, metric cards
- `shadow-lg`: `0 28px 70px rgba(0,0,0,0.40)` — top-level panels
- `shadow-xl`: `0 38px 90px rgba(0,0,0,0.45)` — hero panels & login shells

On hover, elevated surfaces translateY(-2px to -3px) and gain a tinted glow: `0 0 0 1px rgba(accent, 0.10), 0 10px 28px rgba(accent, 0.10)`.

### Motion (the UI Motion Contract)
Three surface families: `card`, `button`, `frame` — each with its own intensity.
- **Ease** → `cubic-bezier(0.22, 1, 0.36, 1)` (primary) or `cubic-bezier(0.16, 1, 0.3, 1)` (spring).
- **Durations** → fast `160ms`, base `220ms`, slow `360ms`.
- **Hover** → translateY + border brighten + glow — never scale, never rotate.
- **Press** → translateY(0) + slight brightness dim; we do **not** shrink buttons.
- **Signature**: ultra-premium buttons run a single `skewX(-24deg)` **metallic halo sweep** across the face once on hover (`groupHaloSweep` / `datalabHaloSweep` / `synergi-button::before`). Internal apps don't get the sweep.
- **Cards** lift on hover; **buttons** lift + sweep; **frames** lift subtly. No entrance animations on scroll — the ecosystem does not animate sections in.
- `prefers-reduced-motion` kills all lifts & sweeps — this is mandatory per the contract.

### Hover & press
- **Hover**: border tint → `rgba(accent, 0.34)`, lift `-2px` to `-3px`, glow grows.
- **Focus-visible**: same as hover + `box-shadow: 0 0 0 1px rgba(accent, 0.22), 0 12px 28px rgba(4,8,20,0.24)`.
- **Press**: lift resets to 0, shadow tightens slightly.
- Inputs in dark theme **must not** go light on autofill — fields always preserve surface background (per contract).

### Transparency & blur
- Top bars and floating nav use `backdrop-filter: blur(14–20px)` over `rgba(surface, 0.78–0.88)`. This is "dark glass".
- Drawers and modals use heavier blur over radial glow.
- Do **not** blur below large panels — only on chrome (topbar, footer, drawer, modal backdrop).

### Imagery vibe
When photography is present (Private Estates only), it is **atmospheric**, **dim-warm**, **editorial** — no color grading toward orange/teal, no stock-sunset bias. Mallorca coastal, architectural, quiet. Never people-forward for hero imagery.

### Layout rules
- Shells are `max-width: 1320px`, centered with `calc(100% - 40px)` gutters.
- All top-level sections nest as rounded panels with their own shadow; they do not bleed to the viewport edge (except hero imagery in Private Estates).
- Hero grids split roughly `1.15fr / 0.85fr` — copy left, metric stack or preview right.
- `@media (max-width: 1100px)` collapses splits to 1fr; `@media (max-width: 820px)` compacts paddings & radii.

### Capsules vs protection gradients
We favor **capsules** (rounded pill containers with borders) over protection gradients for chrome. Protection gradients appear only on hero imagery (Private Estates) to seat text on imagery.

---

## 5. ICONOGRAPHY

### Approach
Anclora is an **iconography-light** system. The brand itself does the visual heavy lifting — logos, type, motion. Iconography is **supporting chrome**, not expressive.

- **Icon library**: Lucide (`https://unpkg.com/lucide@latest`). The seed uses it directly (`lucide-react` imports in `GroupWorkspaceShell.tsx`, `PENavbar.tsx`). Stroke-only, 1.5–2px, `currentColor`. Sizes: 14, 16, 18, 22.
- **No filled icons.** No duotone. No emoji-style colored glyphs.
- **SVG-inline, always `currentColor`.** Never embed colored SVGs; tint with CSS.
- **No custom hand-drawn SVG illustrations.** When imagery is needed, use real photography (Private Estates) or a placeholder until photography exists.
- **No unicode chars as icons.** No `✓`, no `→`, no `★` — use Lucide's equivalent (`Check`, `ArrowRight`, `Star`).
- **Emoji is forbidden** everywhere, including copy.

### Logos as iconography
Product medallions (`assets/logos/*.png`) are the ecosystem's primary iconographic element. Rules:
- Render full-resolution; do **not** recolor, outline, or flatten.
- Minimum size: 40px. Above 120px they should sit inside a rounded-frame `--radius-lg` container with a soft inner highlight.
- Do not crop the bezel. Do not rotate.
- For app cards in the Group portal, center the logo in a `.group-app-logo-wrap` frame.

### Iconography asset locations
- `assets/logos/` — all 10 product medallions, at source resolution (~1000×1000).
- Lucide is pulled from CDN — no local icon font or sprite is shipped. If you need to go offline, install `lucide-react` locally and point at `/node_modules/lucide-react/dist/esm/icons/*.js`.

---

## 6. INDEX — what's in this system

```
README.md                     ← you are here
SKILL.md                      ← Agent Skill definition (for Claude Code)
colors_and_type.css           ← tokens + type styles + product scopes
assets/
  logos/                      ← 10 product medallions (PNG)
preview/                      ← individual cards rendered in the Design System tab
ui_kits/
  anclora-group/              ← corporate portal (role-based app switcher)
  anclora-private-estates/    ← ultra-premium real estate landing
  anclora-synergi/            ← partner portal (admission + workspace)
```

Each UI kit contains its own `README.md`, `index.html` entry, and `*.jsx` component files.

---

## 7. Caveats

- **Fonts** use Google Fonts equivalents where the seed didn't ship binaries: `Newsreader`, `Manrope`, `DM Sans`, `Inter`, `JetBrains Mono`. If licensed brand fonts exist (Söhne, Calibre, GT Sectra, etc.), drop them in `fonts/` and flip `--font-display`/`--font-sans` in `colors_and_type.css`.
- **No Figma or codebase links were provided** beyond the seed — component recreations are faithful to the seed's `.tsx` source, not a live repo.
- **Nexus, Content Generator, Advisor, Talent, Impulso, Command Center** are documented via logo + token file only; we did not build UI kits for them (no component source in the seed). Request component access to extend.
