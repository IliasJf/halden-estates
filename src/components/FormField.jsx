import Icon from './Icon'

/**
 * Label + input/textarea + inline error, wired together for screen readers
 * with aria-invalid and aria-describedby.
 */
export default function FormField({ id, label, error, optional = false, multiline = false, hint, ...inputProps }) {
  const Control = multiline ? 'textarea' : 'input'
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="-mt-0.5 mb-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <Control
        id={id}
        name={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        className={`field-input ${multiline ? 'min-h-32 resize-y' : ''}`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="field-error">
          <Icon name="alert" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
