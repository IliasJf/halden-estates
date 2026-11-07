import useSaved, { toggleSaved } from '../hooks/useSaved'
import type { Property } from '../types'
import Icon from './Icon'

interface SaveButtonProps {
  property: Pick<Property, 'slug' | 'title'>
  /** "overlay" is the round button on card photos; "inline" is a labelled button. */
  variant?: 'overlay' | 'inline'
  className?: string
}

export default function SaveButton({ property, variant = 'overlay', className = '' }: SaveButtonProps) {
  const saved = useSaved().includes(property.slug)
  const heart = <Icon name="heart" className="size-5" fill={saved ? 'currentColor' : 'none'} strokeWidth={1.8} />

  if (variant === 'inline') {
    return (
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => toggleSaved(property.slug)}
        className={`btn-secondary ${saved ? 'border-pine text-pine' : ''} ${className}`}
      >
        <span className={saved ? 'text-danger' : ''}>{heart}</span>
        {saved ? 'Saved' : 'Save home'}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${property.title}`}
      title={saved ? 'Remove from saved homes' : 'Save this home'}
      onClick={() => toggleSaved(property.slug)}
      className={`inline-flex size-11 items-center justify-center rounded-full bg-sand/95 shadow-sm transition-[transform,color] duration-150 hover:scale-105 active:scale-95 ${
        saved ? 'text-danger' : 'text-ink hover:text-danger'
      } ${className}`}
    >
      {heart}
    </button>
  )
}
