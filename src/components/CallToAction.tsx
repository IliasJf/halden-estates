import { Link } from 'react-router-dom'
import Icon from './Icon'

/** Dark closing band used at the bottom of several pages. */
export default function CallToAction({
  title = 'Thinking of selling?',
  text = 'Book a free, no-obligation valuation with an adviser who knows your street, not just your postcode.',
  linkTo = '/contact?topic=selling',
  linkLabel = 'Book a valuation',
}) {
  return (
    <section className="container-page py-20 sm:py-24">
      <div
        data-surface="dark"
        className="relative overflow-hidden rounded-3xl bg-pine px-6 py-14 text-sand sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12"
      >
        <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -bottom-24 size-80 text-sand/5" aria-hidden="true">
          <path d="M20 190V80l80-50 80 50v110" fill="none" stroke="currentColor" strokeWidth="14" strokeLinejoin="round" />
        </svg>
        <div className="relative max-w-xl">
          <h2 className="text-3xl leading-tight font-normal sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-sand/80">{text}</p>
        </div>
        <Link to={linkTo} className="btn-light relative mt-8 shrink-0 lg:mt-0">
          {linkLabel}
          <Icon name="arrowRight" className="size-4" />
        </Link>
      </div>
    </section>
  )
}
