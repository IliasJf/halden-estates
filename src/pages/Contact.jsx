import { useSearchParams } from 'react-router-dom'
import EnquiryForm, { TOPIC_OPTIONS } from '../components/EnquiryForm'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { BRAND } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Contact() {
  useDocumentTitle('Contact')
  const [searchParams] = useSearchParams()

  // Links such as /contact?topic=selling preselect the "How can we help?" field.
  const requestedTopic = searchParams.get('topic')
  const defaultTopic = TOPIC_OPTIONS.some((option) => option.value === requestedTopic) ? requestedTopic : 'buying'

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your move"
        intro="Send us a note and an adviser will reply within one working day. Prefer to talk? Call or drop by the Lisbon office."
      />

      <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <aside className="space-y-6">
          <div className="rounded-3xl bg-ink p-8 text-sand" data-surface="dark">
            <h2 className="text-2xl font-normal">Lisbon office</h2>
            <address className="mt-6 space-y-5 not-italic">
              <p className="flex gap-4">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-brass" />
                <span className="text-sand/85">
                  {BRAND.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-sand/85 hover:text-sand">
                  <Icon name="phone" className="size-5 shrink-0 text-brass" />
                  {BRAND.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 break-all text-sand/85 hover:text-sand">
                  <Icon name="mail" className="size-5 shrink-0 text-brass" />
                  {BRAND.email}
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-3xl bg-paper p-8 ring-1 ring-stone/70">
            <h2 className="flex items-center gap-3 text-2xl font-normal text-ink">
              <Icon name="clock" className="size-5 text-brass-dark" />
              Opening hours
            </h2>
            <dl className="mt-5 divide-y divide-stone text-sm">
              {BRAND.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{slot.days}</dt>
                  <dd className="font-semibold text-ink">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <section aria-labelledby="contact-form-heading" className="rounded-3xl bg-paper p-6 ring-1 ring-stone/70 sm:p-10">
          <h2 id="contact-form-heading" className="text-3xl font-normal text-ink">
            Send an enquiry
          </h2>
          <p className="mt-2 mb-8 text-muted">All fields are required unless marked optional.</p>
          <EnquiryForm key={defaultTopic} showTopic defaultTopic={defaultTopic} idPrefix="contact" />
        </section>
      </div>
    </>
  )
}
