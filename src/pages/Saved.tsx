import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useSaved, { removeSaved } from '../hooks/useSaved'
import type { Property } from '../types'
import { formatArea, formatPrice, pluralise } from '../utils/format'
import { imageAt } from '../utils/image'

const MAX_COMPARE = 3

interface Row {
  label: string
  value: (home: Property) => string | number
  /** The number that decides which home wins this row, if any. */
  score?: (home: Property) => number | null
  best?: 'low' | 'high'
}

const pricePerSqm = (home: Property) => Math.round(home.price / home.size)

const ROWS: Row[] = [
  { label: 'Asking price', value: (h) => formatPrice(h.price), score: (h) => h.price, best: 'low' },
  { label: 'Price per m²', value: (h) => formatPrice(pricePerSqm(h)), score: pricePerSqm, best: 'low' },
  { label: 'Living area', value: (h) => formatArea(h.size), score: (h) => h.size, best: 'high' },
  { label: 'Plot', value: (h) => (h.plot ? formatArea(h.plot) : 'None'), score: (h) => h.plot, best: 'high' },
  { label: 'Bedrooms', value: (h) => h.beds, score: (h) => h.beds, best: 'high' },
  { label: 'Bathrooms', value: (h) => h.baths, score: (h) => h.baths, best: 'high' },
  { label: 'Type', value: (h) => h.type },
  { label: 'Year built', value: (h) => h.yearBuilt, score: (h) => h.yearBuilt, best: 'high' },
  { label: 'Location', value: (h) => `${h.neighbourhood}, ${h.location}` },
]

/** Index of the single best home in a row, or -1 when there is a tie or nothing to compare. */
function winner(row: Row, homes: Property[]): number {
  if (!row.score || homes.length < 2) return -1
  const scores = homes.map(row.score)
  const valid = scores.filter((s): s is number => s !== null)
  if (valid.length < 2) return -1
  const target = row.best === 'low' ? Math.min(...valid) : Math.max(...valid)
  return scores.filter((s) => s === target).length === 1 ? scores.indexOf(target) : -1
}

export default function Saved() {
  useDocumentTitle('Saved homes')
  const savedSlugs = useSaved()
  const saved = savedSlugs
    .map((slug) => properties.find((property) => property.slug === slug))
    .filter((home): home is Property => Boolean(home))

  // Which saved homes are in the comparison. By default the first three.
  const [picked, setPicked] = useState<string[] | null>(null)
  const compareSlugs = (picked ?? saved.slice(0, MAX_COMPARE).map((h) => h.slug)).filter((slug) => savedSlugs.includes(slug))
  const compared = saved.filter((home) => compareSlugs.includes(home.slug))

  const togglePick = (slug: string) => {
    const current = compareSlugs
    setPicked(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug].slice(-MAX_COMPARE))
  }

  return (
    <>
      <PageHeader
        eyebrow="Your shortlist"
        title="Saved homes"
        intro="Tap the heart on any home to keep it here, then compare up to three side by side. Your list stays on this device."
      />

      <div className="container-page py-12 lg:py-16">
        {saved.length === 0 ? (
          <EmptyState
            icon="heart"
            title="No saved homes yet"
            message="Tap the heart on a home you like and it will appear here, ready to compare."
            action={
              <Link to="/properties" className="btn-primary">
                Browse homes
              </Link>
            }
          />
        ) : (
          <>
            <section aria-labelledby="compare-heading">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 id="compare-heading" className="text-3xl font-normal text-ink">
                  Compare
                </h2>
                <p className="text-sm text-muted">
                  {saved.length > MAX_COMPARE
                    ? `Choose up to ${MAX_COMPARE} homes below to compare.`
                    : saved.length === 1
                      ? 'Save one more home to compare them.'
                      : 'The best value in each row is marked.'}
                </p>
              </div>

              {compared.length > 0 && (
                <div className="mt-6 overflow-x-auto rounded-2xl bg-paper ring-1 ring-stone/70">
                  <table className="w-full min-w-[40rem] table-fixed border-collapse text-left text-sm">
                    <caption className="sr-only">Side-by-side comparison of {pluralise(compared.length, 'saved home')}</caption>
                    <thead>
                      <tr>
                        <td className="w-36 p-4 sm:w-44" />
                        {compared.map((home) => (
                          <th key={home.slug} scope="col" className="p-4 align-top font-normal">
                            <Link to={`/properties/${home.slug}`} className="group block">
                              <img
                                src={imageAt(home.images[0].src, 480)}
                                alt=""
                                className="aspect-[4/3] w-full rounded-xl bg-stone object-cover"
                              />
                              <span className="mt-3 block font-display text-lg text-ink group-hover:text-pine">{home.title}</span>
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ROWS.map((row) => {
                        const best = winner(row, compared)
                        return (
                          <tr key={row.label} className="border-t border-stone/70">
                            <th scope="row" className="p-4 font-semibold text-muted">
                              {row.label}
                            </th>
                            {compared.map((home, i) => (
                              <td key={home.slug} className={`p-4 tabular-nums ${i === best ? 'font-semibold text-pine' : 'text-ink'}`}>
                                {row.value(home)}
                                {i === best && (
                                  <span className="ml-2 rounded-full bg-pine/10 px-2 py-0.5 text-xs font-semibold text-pine">Best</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section aria-labelledby="saved-heading" className="mt-16">
              <h2 id="saved-heading" className="font-sans text-base font-semibold text-ink">
                {pluralise(saved.length, 'saved home')}
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {saved.map((home) => {
                  const inCompare = compareSlugs.includes(home.slug)
                  return (
                    <li key={home.slug} className="flex flex-col gap-3">
                      <PropertyCard property={home} />
                      <div className="flex items-center justify-between gap-3">
                        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={inCompare}
                            onChange={() => togglePick(home.slug)}
                            className="size-5 cursor-pointer accent-pine"
                          />
                          Compare
                        </label>
                        <button
                          type="button"
                          onClick={() => removeSaved(home.slug)}
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted hover:text-danger"
                        >
                          <Icon name="close" className="size-4" strokeWidth={2} />
                          Remove
                          <span className="sr-only">{home.title}</span>
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          </>
        )}
      </div>
    </>
  )
}
