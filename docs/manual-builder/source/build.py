#!/usr/bin/env python3
"""Ensambla cada página del manual: plantilla común + cuerpo en pages/NN.html.

Cada cuerpo empieza con una línea  <!--META {json} -->  con:
  num, slug, part, title, sub, [aside], [lead], [h1] (clase extra), [cover] (bool)
Los iconos se escriben como {{i:nombre}} o {{i:nombre:clase}}.
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).parent
PAGES = ROOT / "pages"
BUILD = ROOT / "build"
BUILD.mkdir(exist_ok=True)

ICONS = {
 "check": '<path d="M20 6 9 17l-5-5"/>',
 "x": '<path d="M18 6 6 18M6 6l12 12"/>',
 "book": '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
 "users": '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>',
 "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
 "box": '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 "nodes": '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M10.8 7.2 6.2 16.8M13.2 7.2l4.6 9.6M7.5 19h9"/>',
 "gear": '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
 "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
 "layers": '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
 "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 "home": '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
 "file": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
 "cloud": '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18"/><path d="M12 12v9M8.5 15.5 12 12l3.5 3.5"/>',
 "lock": '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 "list": '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 "trash": '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
 "info": '<circle cx="12" cy="12" r="10"/><path d="M12 16v-5M12 8h.01"/>',
 "alert": '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
 "code": '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
 "globe": '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
 "keyboard": '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
 "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
 "flag": '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
 "chart": '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 "database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
 "branch": '<circle cx="6" cy="5" r="2.5"/><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 7.5v9M18 10.5c0 4-6 3-11.2 6.5"/>',
 "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
 "chev": '<path d="m6 9 6 6 6-6"/>',
 "chevr": '<path d="m9 6 6 6-6 6"/>',
 "bell": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
 "menu": '<path d="M4 6h16M4 12h16M4 18h16"/>',
 "zap": '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
 "monitor": '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
 "phone": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
 "tablet": '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M11 18h2"/>',
 "spark": '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
 "clip": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
 "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 "moon": '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
 "anchor": '<circle cx="12" cy="5" r="3"/><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>',
 "grid": '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 "sliders": '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
 "refresh": '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
 "route": '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>',
 "tag": '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
 "landmark": '<path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-7 10 7z"/>',
 "table": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
 "more": '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
 "plus": '<path d="M12 5v14M5 12h14"/>',
 "swap": '<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
 "a11y": '<circle cx="12" cy="4" r="2"/><path d="M4 8l8 2 8-2M12 10v5M8 22l4-7 4 7"/>',
 "type": '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
 "palette": '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.6 5.6 0 0 0 22 10c0-4.4-4.5-8-10-8z"/>',
 "ruler": '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>',
 "cursor": '<path d="m4 4 7 17 2.5-7.5L21 11z"/>',
 "window": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
 "panel": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',
 "msg": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 "hash": '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
 "pin": '<path d="M12 17v5M9 10.8V4h6v6.8l3 3.2H6z"/>',
 "doc": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
 "download": '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
 "pkg": '<path d="m7.5 4.3 9 5.2M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',
 "compass": '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
 "loader": '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.2 16.2l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.2 7.8l2.8-2.8"/>',
}

def icon(m):
    name = m.group(1); cls = m.group(2) or ""
    return f'<svg class="ic {cls}" viewBox="0 0 24 24">{ICONS[name]}</svg>'

HEADER = '''<div class="hdr">
  <div class="brand"><img src="../assets/img/anclora-group-lockup-horizontal-sobre-claro.png" alt="Anclora Group"></div>
  <div class="hdr-t"><div>SISTEMA DE DISEÑO ANCLORA V1</div><div>MANUAL MAESTRO · GUÍA VISUAL, TÉCNICA Y DE IMPLEMENTACIÓN</div></div>
  <div class="hdr-n">{num:02d}</div>
</div>'''

WAVE = '''<svg class="wave" viewBox="0 0 1055 150" preserveAspectRatio="none">
 <defs>
  <linearGradient id="wg1" x1="0" x2="1"><stop offset="0" stop-color="#9fb9c2" stop-opacity=".10"/><stop offset=".5" stop-color="#6f9fa8" stop-opacity=".30"/><stop offset="1" stop-color="#9fb9c2" stop-opacity=".12"/></linearGradient>
  <linearGradient id="wg2" x1="0" x2="1"><stop offset="0" stop-color="#c9d3db" stop-opacity=".35"/><stop offset=".6" stop-color="#a9c4ca" stop-opacity=".30"/><stop offset="1" stop-color="#dfe6ea" stop-opacity=".2"/></linearGradient>
  <linearGradient id="wg3" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".0"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#ffffff" stop-opacity=".2"/></linearGradient>
 </defs>
 <path d="M0 70 C 180 20 330 20 520 62 S 860 118 1055 52 L1055 150 L0 150 Z" fill="url(#wg2)"/>
 <path d="M0 98 C 200 50 360 70 560 96 S 880 120 1055 78 L1055 150 L0 150 Z" fill="url(#wg1)"/>
 <path d="M0 116 C 220 88 420 100 600 118 S 900 132 1055 104" fill="none" stroke="url(#wg3)" stroke-width="2"/>
 <path d="M0 84 C 190 40 350 44 540 80 S 870 116 1055 66" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.2"/>
 <path d="M870 150 A 190 190 0 0 1 1055 10" fill="none" stroke="#0f6b73" stroke-opacity=".28" stroke-width="1"/>
 <path d="M930 150 A 150 150 0 0 1 1055 40" fill="none" stroke="#0f6b73" stroke-opacity=".2" stroke-width="1"/>
</svg>'''

FOOTER = '''<div class="ftr">
  <div><div class="k">VERSIÓN</div><div class="v">1.0.0</div></div>
  <div><div class="k">ORGANIZACIÓN</div><div class="v">Anclora Group</div></div>
  <div><div class="k">DOCUMENTO</div><div class="v">Manual maestro del ecosistema</div></div>
  <div class="hz"><span>UN MISMO<br>HORIZONTE</span></div>
</div>'''

def build(path):
    raw = path.read_text()
    m = re.match(r'\s*<!--META (.*?) -->\s*', raw, re.S)
    meta = json.loads(m.group(1)); body = raw[m.end():]
    body = re.sub(r'\{\{i:([a-z0-9]+)(?::([a-z0-9 -]+))?\}\}', icon, body)
    if meta.get("cover"):
        main = body
    else:
        aside = f'<div class="aside">{meta["aside"]}</div>' if meta.get("aside") else ""
        lead = f'<p class="lead">{meta["lead"]}</p>' if meta.get("lead") else ""
        main = f'''<div class="main"><div class="tb">
  <div class="eyebrow">{meta["part"]}</div>
  <div class="tb-row"><h1 class="{meta.get("h1","")}">{meta["title"]}</h1>{aside}</div>
  <div class="rule"></div>
  <p class="sub">{meta["sub"]}</p>{lead}
</div>
<div class="content">
{body}
</div></div>'''
    html = f'''<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>{meta["num"]:02d} · {re.sub("<[^>]+>", " ", meta["title"])}</title>
<link rel="stylesheet" href="../manual.css"></head><body>
<div class="page" data-num="{meta["num"]}">
{HEADER.format(num=meta["num"])}
{main}
{WAVE}
{FOOTER}
</div></body></html>'''
    out = BUILD / f'{meta["num"]:02d}-{meta["slug"]}.html'
    out.write_text(html)
    return out

def build_complete(generated):
    """Create the print-ready document consumed by the PDF renderer."""
    bodies = []
    pages = sorted(BUILD.glob("*.html"))
    for page in pages:
        if page.name == "_manual-completo.html":
            continue
        html = page.read_text()
        bodies.append(html.split("<body>", 1)[1].rsplit("</body>", 1)[0])
    complete = '''<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Sistema de Diseño Anclora V1 · Manual maestro</title>
<link rel="stylesheet" href="../manual.css"><style>@page{size:1055px 1491px;margin:0}html,body{background:#fff!important}.page{background-color:#edf7f5!important;background-image:radial-gradient(120% 60% at 80% 0%,#fff 0%,rgba(255,255,255,0) 60%),linear-gradient(180deg,#f8fcfb 0%,#edf7f5 55%,#deefec 100%)!important;page-break-after:always;break-after:page}*{box-shadow:none!important;filter:none!important}.wave{-webkit-mask-image:none!important}</style></head><body>
''' + "\n".join(bodies) + "\n</body></html>"
    out = BUILD / "_manual-completo.html"
    out.write_text(complete)
    return out

if __name__ == "__main__":
    import sys
    sel = set(sys.argv[1:])
    generated = []
    for p in sorted(PAGES.glob("*.html")):
        if sel and p.stem not in sel: continue
        generated.append(build(p))
        print(generated[-1].name)
    if not sel:
        print(build_complete(generated).name)
