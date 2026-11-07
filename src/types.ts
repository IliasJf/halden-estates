import type { LOCATIONS, PROPERTY_TYPES } from './data/properties'

export type Location = (typeof LOCATIONS)[number]
export type PropertyType = (typeof PROPERTY_TYPES)[number]

export interface PropertyImage {
  src: string
  alt: string
}

export interface Property {
  id: number
  slug: string
  title: string
  location: Location
  neighbourhood: string
  /** Latitude and longitude, used to place the listing on the map. */
  coords: [number, number]
  type: PropertyType
  /** Asking price in euros. */
  price: number
  beds: number
  baths: number
  /** Living area in square metres. */
  size: number
  /** Land in square metres; null for apartments. */
  plot: number | null
  yearBuilt: number
  featured: boolean
  summary: string
  description: string[]
  features: string[]
  images: PropertyImage[]
}

/** Filter values as they appear in the URL: empty string means "any". */
export interface Filters {
  location: string
  type: string
  minPrice: string
  maxPrice: string
  beds: string
}

export type FilterKey = keyof Filters

export interface Option {
  value: string
  label: string
}
