import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { PROCESS_STEPS, SERVICES } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { imageAt, srcSetFor } from '../utils/image'

const PROCESS_IMAGE = {
  src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
  alt: 'Two people shaking hands across a desk',
}

export default function Services() {
  useDocumentTitle('Services')

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to buy, sell or settle in Portugal"
        intro="From a first valuation to the notary’s signature, and long after: one team, one adviser, no hand-offs."
      />

      <section className="container-page py-20 sm:py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.title} className="flex flex-col rounded-3xl bg-paper p-8 ring-1 ring-stone/70 sm:p-10">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-pine text-brass">
                <Icon name={service.icon} className="size-7" />
              </span>
              <h2 className="mt-6 text-3xl font-normal text-ink">{service.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
              <ul className="mt-6 grid gap-2.5 border-t border-stone pt-6 sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brass-dark" strokeWidth={2} />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-stone bg-paper py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="Four steps, one adviser"
              intro="Buying a home abroad can feel complicated. We keep it simple and tell you what happens next, at every stage."
            />
            <ol className="mt-10 space-y-8">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-brass-dark font-display text-brass-dark">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/contact" className="btn-primary mt-10">
              Start a conversation
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
          <img
            src={imageAt(PROCESS_IMAGE.src, 1000)}
            srcSet={srcSetFor(PROCESS_IMAGE.src, [600, 1000, 1400])}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={PROCESS_IMAGE.alt}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover lg:aspect-[4/5]"
          />
        </div>
      </section>

      <CallToAction />
    </>
  )
}
