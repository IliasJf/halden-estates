import { describe, expect, it } from 'vitest'
import { properties } from '../data/properties'
import type { Property } from '../types'
import {
  EMPTY_FILTERS,
  countActiveFilters,
  filterProperties,
  filtersFromParams,
  filtersToParams,
  sortProperties,
} from './filters'

const home = (overrides: Partial<Property>): Property => ({
  ...properties[0],
  ...overrides,
})

describe('filters in the URL', () => {
  it('round-trips every filter through the query string', () => {
    const filters = { location: 'Lisbon', type: 'Apartment', minPrice: '500000', maxPrice: '1500000', beds: '2' }
    const params = filtersToParams(filters)
    expect(params.toString()).toBe('location=Lisbon&type=Apartment&minPrice=500000&maxPrice=1500000&beds=2')
    expect(filtersFromParams(params)).toEqual(filters)
  })

  it('leaves empty filters out of the URL, so a clean search has a clean link', () => {
    expect(filtersToParams(EMPTY_FILTERS).toString()).toBe('')
    expect(filtersToParams({ ...EMPTY_FILTERS, beds: '3' }).toString()).toBe('beds=3')
  })

  it('reads missing or unknown parameters as "any"', () => {
    expect(filtersFromParams(new URLSearchParams('sort=price-asc&view=map&foo=bar'))).toEqual(EMPTY_FILTERS)
  })

  it('counts only the filters that are set', () => {
    expect(countActiveFilters(EMPTY_FILTERS)).toBe(0)
    expect(countActiveFilters({ ...EMPTY_FILTERS, location: 'Porto', beds: '2' })).toBe(2)
  })
})

describe('filterProperties', () => {
  const list = [
    home({ id: 1, slug: 'a', location: 'Lisbon', type: 'Apartment', price: 600000, beds: 2 }),
    home({ id: 2, slug: 'b', location: 'Lisbon', type: 'Villa', price: 2500000, beds: 5 }),
    home({ id: 3, slug: 'c', location: 'Porto', type: 'Apartment', price: 900000, beds: 3 }),
  ]
  const slugs = (result: Property[]) => result.map((p) => p.slug)

  it('returns everything when no filter is set', () => {
    expect(slugs(filterProperties(list, EMPTY_FILTERS))).toEqual(['a', 'b', 'c'])
  })

  it('combines location and type', () => {
    expect(slugs(filterProperties(list, { ...EMPTY_FILTERS, location: 'Lisbon', type: 'Apartment' }))).toEqual(['a'])
  })

  it('treats the price range as inclusive at both ends', () => {
    expect(slugs(filterProperties(list, { ...EMPTY_FILTERS, minPrice: '600000', maxPrice: '900000' }))).toEqual(['a', 'c'])
  })

  it('reads bedrooms as a minimum ("3+ bedrooms")', () => {
    expect(slugs(filterProperties(list, { ...EMPTY_FILTERS, beds: '3' }))).toEqual(['b', 'c'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterProperties(list, { ...EMPTY_FILTERS, location: 'Algarve' })).toEqual([])
  })
})

describe('sortProperties', () => {
  const list = [
    home({ slug: 'mid', price: 2, size: 200, featured: false }),
    home({ slug: 'cheap', price: 1, size: 300, featured: true }),
    home({ slug: 'dear', price: 3, size: 100, featured: false }),
  ]
  const order = (sort: string) => sortProperties(list, sort).map((p) => p.slug)

  it('sorts by price both ways and by size', () => {
    expect(order('price-asc')).toEqual(['cheap', 'mid', 'dear'])
    expect(order('price-desc')).toEqual(['dear', 'mid', 'cheap'])
    expect(order('size-desc')).toEqual(['cheap', 'mid', 'dear'])
  })

  it('puts featured homes first by default', () => {
    expect(order('featured')[0]).toBe('cheap')
  })

  it('does not reorder the list it was given', () => {
    sortProperties(list, 'price-desc')
    expect(list.map((p) => p.slug)).toEqual(['mid', 'cheap', 'dear'])
  })
})
