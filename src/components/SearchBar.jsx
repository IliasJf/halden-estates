import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BED_SELECT_OPTIONS,
  EMPTY_FILTERS,
  LOCATION_OPTIONS,
  PRICE_OPTIONS,
  TYPE_OPTIONS,
  filtersToParams,
} from '../utils/filters'
import Icon from './Icon'
import SelectField from './SelectField'

/**
 * Home page search. Submitting sends the visitor to /properties with the
 * chosen filters in the query string, where the Filters panel picks them up.
 */
export default function SearchBar() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const update = (key) => (value) => setFilters((current) => ({ ...current, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = filtersToParams(filters).toString()
    navigate(query ? `/properties?${query}` : '/properties')
  }

  return (
    <form
      role="search"
      aria-label="Search properties"
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(22,33,29,0.45)] ring-1 ring-stone/70 sm:grid-cols-2 sm:p-6 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end"
    >
      <SelectField id="search-location" label="Location" value={filters.location} onChange={update('location')} options={LOCATION_OPTIONS} placeholder="Anywhere" />
      <SelectField id="search-type" label="Property type" value={filters.type} onChange={update('type')} options={TYPE_OPTIONS} placeholder="Any type" />
      <SelectField id="search-price" label="Max price" value={filters.maxPrice} onChange={update('maxPrice')} options={PRICE_OPTIONS} placeholder="No limit" />
      <SelectField id="search-beds" label="Bedrooms" value={filters.beds} onChange={update('beds')} options={BED_SELECT_OPTIONS} placeholder="Any" />
      <button type="submit" className="btn-primary h-11 sm:col-span-2 lg:col-span-1">
        <Icon name="search" className="size-4" />
        Search homes
      </button>
    </form>
  )
}
