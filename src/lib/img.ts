// Sirve las imágenes de public/img a través de Netlify Image CDN, redimensionadas y en WebP.
export function img(file: string, width: number, quality = 75) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=${quality}`
}

export function srcSet(file: string, widths: number[]) {
  return widths.map((w) => `${img(file, w)} ${w}w`).join(', ')
}
