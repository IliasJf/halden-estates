import type { Option } from '../types'
import Icon from './Icon'

interface SelectFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  hideLabel?: boolean
  className?: string
}

/**
 * A labelled native <select>. Native selects keep keyboard and screen reader
 * support for free, and open the platform picker on phones.
 *
 * options: array of { value, label }
 */
export default function SelectField({ id, label, value, onChange, options, placeholder, hideLabel = false, className = '' }: SelectFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'field-label'}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="field-input cursor-pointer appearance-none pr-10"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  )
}
