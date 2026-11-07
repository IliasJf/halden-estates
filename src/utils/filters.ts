/**
 * Property filtering. Filters live in the URL query string
 * (e.g. /properties?location=Lisbon&beds=2) so searches can be shared and bookmarked.
 */

import { LOCATIONS, PROPERTY_TYPES } from '../data/properties'
import type { FilterKey, Filters, Option, Property } from '../types'
import { formatCompactPrice } from './format'

export const FILTER_KEYS: FilterKey[] = ['location', 'type', 'minPrice', 'maxPrice', 'beds']

export const EMPTY_FILTERS: Filters = { location: '', type: '', minPrice: '', maxPrice: '', beds: '' }

export const PRICE_STEPS = [500000, 750000, 1000000, 1500000, 2000000, 3000000, 4000000]

export const BED_OPTIONS = [1, 2, 3, 4, 5]

// Ready-made { value, label } lists for the <SelectField> dropdowns
export const LOCATION_OPTIONS: Option[] = LOCATIONS.map((location) => ({ value: location, label: location }))
export const TYPE_OPTIONS: Option[] = PROPERTY_TYPES.map((type) => ({ value: type, label: type }))
export const PRICE_OPTIONS: Option[] = PRICE_STEPS.map((price) => ({ value: String(price), label: formatCompactPrice(price) }))
export const BED_SELECT_OPTIONS: Option[] = BED_OPTIONS.map((beds) => ({ value: String(beds), label: `${beds}+ bedrooms` }))

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'size-desc'

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size-desc', label: 'Largest first' },
]

export function filtersFromParams(searchParams: URLSearchParams): Filters {
  return Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) ?? ''])) as unknown as Filters
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams()
  for (const key of FILTER_KEYS) {
    if (filters[key]) params.set(key, filters[key])
  }
  return params
}

export function countActiveFilters(filters: Filters): number {
  return FILTER_KEYS.filter((key) => filters[key]).length
}

export function filterProperties(list: Property[], filters: Filters): Property[] {
  const minPrice = Number(filters.minPrice) || 0
  const maxPrice = Number(filters.maxPrice) || Infinity
  const minBeds = Number(filters.beds) || 0

  return list.filter(
    (property) =>
      (!filters.location || property.location === filters.location) &&
      (!filters.type || property.type === filters.type) &&
      property.price >= minPrice &&
      property.price <= maxPrice &&
      property.beds >= minBeds,
  )
}

export function sortProperties(list: Property[], sort: string): Property[] {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'size-desc':
      return sorted.sort((a, b) => b.size - a.size)
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
}
