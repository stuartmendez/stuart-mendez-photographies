// All editable site content lives here: name, copy, photos and services.
// To use your own photographs, drop them into public/img/ and change `file`
// (plus the real `width`/`height` of the image).

export const site = {
  name: 'Stuart Mendez',
  wordmark: 'Stuart Mendez',
  tagline: 'Photography',
  role: 'Portrait, wedding & travel photographer',
  email: 'stewymendez@gmail.com',
  instagram: 'stewymendez',
  description:
    'Stuart Mendez Photography — editorial portraits, weddings and travel photography made with natural light and a quiet, documentary eye.',
}

export type Category = 'portraits' | 'weddings' | 'street'

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'street', label: 'Street' },
]

export type Photo = {
  id: string
  file: string
  title: string
  place: string
  year: number
  width: number
  height: number
  alt: string
}

export type PortfolioPhoto = Photo & { category: Category }

/** Portfolio — commissioned and personal work, filterable by category. */
export const portfolio: PortfolioPhoto[] = [
  { id: 'portrait-1', file: 'retrato-1.png', title: 'Carmen, 81', place: 'Úbeda', year: 2025, category: 'portraits', width: 928, height: 1152, alt: 'Portrait of an older woman with silver hair lit by window light' },
  { id: 'wedding-1', file: 'boda-1.png', title: 'Petals', place: 'Empordà', year: 2025, category: 'weddings', width: 1376, height: 768, alt: 'A couple laughing beneath a shower of petals in a stone courtyard' },
  { id: 'portrait-2', file: 'retrato-2.png', title: 'Julián in August', place: 'Tierra de Campos', year: 2023, category: 'portraits', width: 768, height: 1376, alt: 'Freckled young man standing in a wheat field at golden hour' },
  { id: 'street-1', file: 'calle-2.png', title: 'After the Rain', place: 'Girona', year: 2023, category: 'street', width: 1376, height: 768, alt: 'Wet cobbled street at night with a figure under an umbrella' },
  { id: 'wedding-2', file: 'boda-2.png', title: 'Hands', place: 'Sitges', year: 2024, category: 'weddings', width: 768, height: 1376, alt: 'Close-up of a couple’s hands wearing wedding rings' },
  { id: 'street-2', file: 'calle-1.png', title: 'Five O’Clock Light', place: 'Lisbon', year: 2024, category: 'street', width: 768, height: 1376, alt: 'A cyclist crossing a shaft of light in an old alley' },
]

export type TravelStory = Photo & { country: string; note: string }

/** Travel — an ongoing series of journeys, shown as an editorial sequence. */
export const travel: TravelStory[] = [
  {
    id: 'travel-iceland', file: 'hero.png', title: 'Black Sand', place: 'South Coast', country: 'Iceland', year: 2025, width: 1376, height: 768,
    alt: 'A lone figure walking across a black sand beach in the fog',
    note: 'Four days of sea fog and almost no colour. I waited for one figure to cross the beach — this was the only frame.',
  },
  {
    id: 'travel-aran', file: 'paisaje-1.png', title: 'Valley Mist', place: 'Val d’Aran', country: 'Pyrenees', year: 2024, width: 1408, height: 768,
    alt: 'A mountain valley at dawn with layers of mist between the ridges',
    note: 'A 4 a.m. climb above the treeline, rewarded by twenty minutes of mist folding through the valley before the sun burned it away.',
  },
  {
    id: 'travel-jaen', file: 'paisaje-2.png', title: 'Olive Grove, Last Light', place: 'Jaén', country: 'Andalusia', year: 2025, width: 1408, height: 768,
    alt: 'An olive grove at sunset with long shadows across rolling hills',
    note: 'Endless rows of olive trees and the long shadows of an Andalusian evening — a landscape that rewards patience.',
  },
]

export const hero = {
  file: 'hero-mountains.jpg',
  caption: 'South Coast, Iceland — 2025',
  alt: 'A lone hiker standing on a rocky overlook, gazing at snow-capped mountain peaks under a deep blue sky',
}

export const about = {
  file: 'studio.png',
  width: 928,
  height: 1152,
  alt: 'A vintage film camera, film rolls and a contact sheet on a wooden table by a window',
  paragraphs: [
    'I photograph people and places with one simple rule: wait for the light rather than manufacture it. Most of my work is made with natural light, on digital and on 35mm film.',
    'My practice moves between portrait commissions, a small number of weddings each year and long-form travel projects. Whatever the subject, I look for the honest, unposed moment — the one that still feels true years later.',
  ],
  principles: [
    { title: 'Natural light', detail: 'Window light, golden hour, fog — never a flash where patience will do.' },
    { title: 'Digital & film', detail: 'Modern digital alongside 35mm film for a timeless, tactile finish.' },
    { title: 'Worldwide', detail: 'Available for commissions and destination work, wherever the story is.' },
  ],
}

export const services = [
  {
    name: 'Portraits',
    detail: 'Unhurried sessions in the studio or on location, with a curated set of edited images and a private online gallery.',
  },
  {
    name: 'Weddings',
    detail: 'Documentary coverage of the whole day, a planning call beforehand and a carefully edited collection of your story.',
  },
  {
    name: 'Travel & editorial',
    detail: 'Destination, hospitality and editorial assignments for brands, hotels and publications. Quoted per project.',
  },
]

export const testimonial = {
  quote:
    'We never posed once. And yet every photograph is exactly how we remember that day — the wind, the laughter, everyone we love in one place.',
  author: 'Laia & Oriol',
  context: 'Wedding, Empordà',
}

export const sessionTypes = ['Portrait', 'Wedding', 'Travel or editorial', 'Something else']
