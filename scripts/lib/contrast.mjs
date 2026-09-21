// WCAG 2.x relative luminance / contrast ratio, pure math, no dependencies.
// Supports #rgb, #rrggbb hex and rgb()/rgba() strings composited over a
// given background (alpha channel flattened before computing luminance).

function parseColor(input) {
  const s = input.trim();
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1 };
  }
  const m = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
  if (m) {
    return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] !== undefined ? Number(m[4]) : 1 };
  }
  throw new Error(`Unrecognized color: ${input}`);
}

function compositeOver(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

function channelLuminance(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(colorStr, backgroundStr) {
  const bg = backgroundStr ? parseColor(backgroundStr) : { r: 255, g: 255, b: 255, a: 1 };
  const composited = compositeOver(parseColor(colorStr), bg);
  return (
    0.2126 * channelLuminance(composited.r) +
    0.7152 * channelLuminance(composited.g) +
    0.0722 * channelLuminance(composited.b)
  );
}

export function contrastRatio(colorA, colorB, background) {
  const la = relativeLuminance(colorA, background);
  const lb = relativeLuminance(colorB, background);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}
