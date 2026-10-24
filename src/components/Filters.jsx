import { BED_SELECT_OPTIONS, LOCATION_OPTIONS, PRICE_OPTIONS, TYPE_OPTIONS } from '../utils/filters'
import SelectField from './SelectField'

/**
 * Controlled filter panel for the Properties page.
 * `values` is the current filter object; `onChange(key, value)` updates one filter.
 */
export default function Filters({ values, onChange, onReset, activeCount }) {
  const set = (key) => (value) => onChange(key, value)

  // Hide price options that would make the range impossible (min above max).
  const minOptions = PRICE_OPTIONS.filter((option) => !values.maxPrice || Number(option.value) < Number(values.maxPrice))
  const maxOptions = PRICE_OPTIONS.filter((option) => !values.minPrice || Number(option.value) > Number(values.minPrice))

  return (
    <form aria-label="Filter properties" onSubmit={(event) => event.preventDefault()} className="space-y-5">
      <SelectField id="filter-location" label="Location" value={values.location} onChange={set('location')} options={LOCATION_OPTIONS} placeholder="All locations" />
      <SelectField id="filter-type" label="Property type" value={values.type} onChange={set('type')} options={TYPE_OPTIONS} placeholder="All types" />

      <fieldset>
        <legend className="field-label">Price range</legend>
        <div className="grid grid-cols-2 gap-3">
          <SelectField id="filter-min-price" label="Minimum price" hideLabel value={values.minPrice} onChange={set('minPrice')} options={minOptions} placeholder="Min" />
          <SelectField id="filter-max-price" label="Maximum price" hideLabel value={values.maxPrice} onChange={set('maxPrice')} options={maxOptions} placeholder="Max" />
        </div>
      </fieldset>

      <SelectField id="filter-beds" label="Bedrooms" value={values.beds} onChange={set('beds')} options={BED_SELECT_OPTIONS} placeholder="Any" />

      <button
        type="button"
        onClick={onReset}
        disabled={activeCount === 0}
        className="text-sm font-semibold text-brass-dark underline decoration-brass-dark/40 underline-offset-4 hover:decoration-brass-dark disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
      >
        Clear all filters
      </button>
    </form>
  )
}
