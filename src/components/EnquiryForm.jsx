import { useEffect, useRef, useState } from 'react'
import { saveEnquiry } from '../utils/enquiries'
import FormField from './FormField'
import Icon from './Icon'
import SelectField from './SelectField'

export const TOPIC_OPTIONS = [
  { value: 'buying', label: 'I’m looking to buy' },
  { value: 'selling', label: 'I’d like a valuation / to sell' },
  { value: 'lettings', label: 'Lettings & property management' },
  { value: 'relocation', label: 'Relocating to Portugal' },
  { value: 'other', label: 'Something else' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email, like name@example.com.'
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number, including the country code.'
  if (values.message.trim().length < 10) errors.message = 'Please write a short message (at least 10 characters).'
  if (!values.consent) errors.consent = 'Please agree so we can reply to you.'
  return errors
}

// Order matters: on submit, focus moves to the first field with an error.
const FIELD_ORDER = ['name', 'email', 'phone', 'message', 'consent']

/**
 * Lead-generation form used on property pages and the Contact page.
 * Pass `property` to tie the enquiry to a listing, or `showTopic` for a general enquiry.
 */
export default function EnquiryForm({ property, showTopic = false, defaultTopic = 'buying', idPrefix = 'enquiry' }) {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    topic: defaultTopic,
    message: property ? `Hello, I’d like to know more about ${property.title} and arrange a viewing.` : '',
    consent: false,
  }

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const formRef = useRef(null)
  const successRef = useRef(null)

  const errors = validate(values)
  const visibleError = (field) => (touched[field] ? errors[field] : undefined)
  const fieldId = (field) => `${idPrefix}-${field}`

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    const key = name.replace(`${idPrefix}-`, '')
    setValues((current) => ({ ...current, [key]: type === 'checkbox' ? checked : value }))
  }

  const handleBlur = (event) => {
    const key = event.target.name.replace(`${idPrefix}-`, '')
    setTouched((current) => ({ ...current, [key]: true }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])))

    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current.querySelector(`#${fieldId(firstInvalid)}`)?.focus()
      return
    }

    setStatus('submitting')
    await saveEnquiry({
      ...values,
      topic: showTopic ? values.topic : 'buying',
      property: property ? { id: property.id, title: property.title, slug: property.slug } : null,
    })
    setStatus('success')
  }

  const reset = () => {
    setValues(initialValues)
    setTouched({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-pine p-8 text-sand" data-surface="dark" role="status">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-sand/10 text-brass">
          <Icon name="check" className="size-6" strokeWidth={2} />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-5 text-2xl focus:outline-none">
          Thank you, {values.name.trim().split(' ')[0]}.
        </h3>
        <p className="mt-3 leading-relaxed text-sand/80">
          Your enquiry has been received. One of our advisers will reply to <strong className="text-sand">{values.email}</strong>{' '}
          within one working day.
        </p>
        <button type="button" onClick={reset} className="btn-light mt-6">
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-5" aria-label={property ? `Enquire about ${property.title}` : 'Contact form'}>
      <FormField id={fieldId('name')} label="Full name" autoComplete="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={visibleError('name')} />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={fieldId('email')} label="Email" type="email" autoComplete="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={visibleError('email')} />
        <FormField id={fieldId('phone')} label="Phone" type="tel" autoComplete="tel" optional value={values.phone} onChange={handleChange} onBlur={handleBlur} error={visibleError('phone')} />
      </div>

      {showTopic && (
        <SelectField
          id={fieldId('topic')}
          label="How can we help?"
          value={values.topic}
          onChange={(topic) => setValues((current) => ({ ...current, topic }))}
          options={TOPIC_OPTIONS}
        />
      )}

      <FormField id={fieldId('message')} label="Message" multiline rows={5} value={values.message} onChange={handleChange} onBlur={handleBlur} error={visibleError('message')} />

      <div>
        <div className="flex gap-3">
          <input
            id={fieldId('consent')}
            name={fieldId('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={visibleError('consent') ? 'true' : 'false'}
            aria-describedby={visibleError('consent') ? `${fieldId('consent')}-error` : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-pine"
          />
          <label htmlFor={fieldId('consent')} className="text-sm leading-relaxed text-muted">
            I agree to Halden Estates contacting me about this enquiry. We never share your details.
          </label>
        </div>
        {visibleError('consent') && (
          <p id={`${fieldId('consent')}-error`} className="field-error">
            <Icon name="alert" className="size-4 shrink-0" />
            {visibleError('consent')}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full disabled:opacity-70" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
