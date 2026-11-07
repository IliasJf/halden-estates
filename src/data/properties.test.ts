import { describe, expect, it } from 'vitest'
import { LOCATIONS, PROPERTY_TYPES, getPropertyBySlug, properties } from './properties'

// The listings file is edited by hand, so these checks catch typos before they reach the site.
describe('sample listings', () => {
  it('has unique ids and slugs', () => {
    expect(new Set(properties.map((p) => p.id)).size).toBe(properties.length)
    expect(new Set(properties.map((p) => p.slug)).size).toBe(properties.length)
  })

  it('uses only known locations and types, so every home can be found with the filters', () => {
    for (const p of properties) {
      expect(LOCATIONS).toContain(p.location)
      expect(PROPERTY_TYPES).toContain(p.type)
    }
  })

  it('places every home in mainland Portugal on the map', () => {
    for (const { slug, coords } of properties) {
      const [lat, lng] = coords
      expect(lat, slug).toBeGreaterThan(36.9)
      expect(lat, slug).toBeLessThan(42.2)
      expect(lng, slug).toBeGreaterThan(-9.6)
      expect(lng, slug).toBeLessThan(-6.1)
    }
  })

  it('gives every photo alt text', () => {
    for (const p of properties) {
      expect(p.images.length, p.slug).toBeGreaterThan(0)
      for (const image of p.images) expect(image.alt.trim().length, p.slug).toBeGreaterThan(10)
    }
  })

  it('finds a home by its slug and returns undefined for an unknown one', () => {
    expect(getPropertyBySlug('villa-mare-quinta-da-marinha')?.title).toBe('Villa Maré')
    expect(getPropertyBySlug('no-such-home')).toBeUndefined()
    expect(getPropertyBySlug(undefined)).toBeUndefined()
  })
})
