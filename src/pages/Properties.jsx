import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Filters from '../components/Filters'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import SelectField from '../components/SelectField'
import { properties } from '../data/properties'
import useDocumentTitle from '../hooks/useDocumentTitle'
import {
  EMPTY_FILTERS,
  SORT_OPTIONS,
  countActiveFilters,
  filterProperties,
  filtersFromParams,
  filtersToParams,
  sortProperties,
} from '../utils/filters'
import { formatCompactPrice, pluralise } from '../utils/format'

// Human-readable labels for the "active filter" chips above the results.
function describeFilters(filters) {
  const chips = []
  if (filters.location) chips.push({ key: 'location', label: filters.location })
  if (filters.type) chips.push({ key: 'type', label: filters.type })
  if (filters.minPrice) chips.push({ key: 'minPrice', label: `From ${formatCompactPrice(filters.minPrice)}` })
  if (filters.maxPrice) chips.push({ key: 'maxPrice', label: `Up to ${formatCompactPrice(filters.maxPrice)}` })
  if (filters.beds) chips.push({ key: 'beds', label: `${filters.beds}+ bedrooms` })
  return chips
}

export default function Properties() {
  useDocumentTitle('Properties for sale')
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const filters = filtersFromParams(searchParams)
  const sort = searchParams.get('sort') ?? 'featured'
  const activeCount = countActiveFilters(filters)

  // The URL is the single source of truth for filters and sort, so results are derived on every render.
  const results = sortProperties(filterProperties(properties, filters), sort)

  const applyParams = (nextFilters, nextSort) => {
    const params = filtersToParams(nextFilters)
    if (nextSort !== 'featured') params.set('sort', nextSort)
    setSearchParams(params, { replace: true })
  }

  const updateFilter = (key, value) => applyParams({ ...filters, [key]: value }, sort)
  const resetFilters = () => applyParams(EMPTY_FILTERS, sort)

  return (
    <>
      <PageHeader
        eyebrow="Properties for sale"
        title="Find your next home"
        intro="Every home here has been visited, photographed and written up by our own advisers. Filter by place, type, price and size."
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[17rem_1fr] lg:gap-12 lg:py-16">
        <aside aria-label="Filters">
          <button
            type="button"
            className="btn-secondary w-full lg:hidden"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
            onClick={() => setShowFilters((open) => !open)}
          >
            <Icon name="sliders" className="size-4" />
            {showFilters ? 'Hide filters' : 'Show filters'}
            {activeCount > 0 && (
              <span className="rounded-full bg-pine px-2 py-0.5 text-xs text-sand">{activeCount}</span>
            )}
          </button>

          <div
            id="filters-panel"
            className={`${showFilters ? 'block' : 'hidden'} mt-4 rounded-2xl bg-paper p-5 ring-1 ring-stone/70 lg:sticky lg:top-24 lg:mt-0 lg:block lg:p-6`}
          >
            <h2 className="mb-5 hidden font-sans text-xs font-semibold tracking-[0.2em] text-muted uppercase lg:block">
              Refine your search
            </h2>
            <Filters values={filters} onChange={updateFilter} onReset={resetFilters} activeCount={activeCount} />
          </div>
        </aside>

        <section aria-labelledby="results-heading">
          <div className="flex flex-col gap-4 border-b border-stone pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="results-heading" className="font-sans text-base font-semibold text-ink" aria-live="polite">
                {pluralise(results.length, 'home')} found
              </h2>
              {activeCount > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
                  {describeFilters(filters).map((chip) => (
                    <li key={chip.key}>
                      <button
                        type="button"
                        onClick={() => updateFilter(chip.key, '')}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-stone/70 py-1 pr-2.5 pl-3.5 text-sm text-ink hover:bg-stone"
                      >
                        {chip.label}
                        <Icon name="close" className="size-3.5" strokeWidth={2} />
                        <span className="sr-only">(remove filter)</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <SelectField
              id="sort"
              label="Sort by"
              value={sort}
              onChange={(value) => applyParams(filters, value)}
              options={SORT_OPTIONS}
              className="flex items-center gap-3 [&_label]:mb-0 [&_label]:shrink-0 sm:w-72"
            />
          </div>

          {results.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <li key={property.id} className="flex">
                  <PropertyCard property={property} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No homes match these filters"
                message="Try widening your price range or choosing a different location. New homes come to us every week, so it is also worth asking an adviser."
                action={
                  <button type="button" onClick={resetFilters} className="btn-primary">
                    Clear all filters
                  </button>
                }
              />
            </div>
          )}
        </section>
      </div>
    </>
  )
}
