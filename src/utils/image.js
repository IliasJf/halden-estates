/**
 * Helpers for responsive images. Unsplash (and most image CDNs) resize on the fly
 * from a `w` query parameter, so one source URL can serve every screen size.
 */

export function imageAt(src, width) {
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  return url.toString()
}

export function srcSetFor(src, widths = [480, 800, 1200, 1600]) {
  return widths.map((width) => `${imageAt(src, width)} ${width}w`).join(', ')
}
