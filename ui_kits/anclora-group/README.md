# Anclora Group — UI Kit

Corporate portal: the umbrella entry point that routes users to every app they're authorized for.

## Surfaces
- **Topbar** — pill-shaped, glass-blurred, with brand medallion + nav + user chip.
- **Hero** — eyebrow + display headline + lede + primary/ghost CTA row + metric stack.
- **App grid** — 4-col card grid of the 10 ecosystem apps, showing enablement per user role.
- **Login overlay** — modal with corporate SSO form.

## Component breakdown (CSS-in-HTML)
The components are expressed as CSS classes in `index.html`:
- `.topbar`, `.brand`, `.nav`, `.chip-user`
- `.hero`, `.eyebrow`, `.display`, `.lede`, `.cta-row`, `.metric`
- `.apps`, `.app-card`, `.app-logo`, `.tag`
- `.login-overlay`, `.login-card`, `.field`

## Interaction
Click **Abrir aplicación** to open the login modal. Click **Entrar** or anywhere outside dismisses it.

## Palette
Brushed silver (`#a8aeb8`) on navy ink (`#0f1520`). Cards carry silver-tinted borders and heavy downward shadows.
