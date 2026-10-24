import { Link, useParams } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import PropertyCard from '../components/PropertyCard'
import SectionHeading from '../components/SectionHeading'
import { getPropertyBySlug, properties } from '../data/properties'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { formatArea, formatPrice } from '../utils/format'
import NotFound from './NotFound'

function getSimilar(property, limit = 3) {
  return properties
    .filter((other) => other.id !== property.id)
    .map((other) => ({
      other,
      score: (other.location === property.location ? 2 : 0) + (other.type === property.type ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || Math.abs(a.other.price - property.price) - Math.abs(b.other.price - property.price))
    .slice(0, limit)
    .map(({ other }) => other)
}

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  useDocumentTitle(property?.title ?? 'Property not found')

  if (!property) {
    return <NotFound title="We couldn’t find that property" message="It may have been sold or the link may be out of date." />
  }

  const facts = [
    { icon: 'bed', label: 'Bedrooms', value: property.beds },
    { icon: 'bath', label: 'Bathrooms', value: property.baths },
    { icon: 'area', label: 'Living area', value: formatArea(property.size) },
    property.plot && { icon: 'plot', label: 'Plot', value: formatArea(property.plot) },
    { icon: 'home', label: 'Type', value: property.type },
    { icon: 'calendar', label: 'Year built', value: property.yearBuilt },
  ].filter(Boolean)

  return (
    <>
      <div className="container-page pt-8 pb-16 sm:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/properties" className="hover:text-ink">
                Properties
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {property.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-muted">
              <Icon name="pin" className="size-4 text-brass-dark" />
              {property.neighbourhood}, {property.location}
            </p>
            <h1 className="mt-2 text-4xl leading-tight font-normal text-ink sm:text-5xl">{property.title}</h1>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-muted">Asking price</p>
            <p className="font-display text-3xl text-pine sm:text-4xl">{formatPrice(property.price)}</p>
          </div>
        </header>

        <div className="mt-8">
          <Gallery images={property.images} title={property.title} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16">
          <div className="min-w-0">
            <section aria-labelledby="facts-heading">
              <h2 id="facts-heading" className="sr-only">
                Key facts
              </h2>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-stone ring-1 ring-stone sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col-reverse gap-1 bg-paper p-5">
                    <dd className="font-display text-2xl text-ink">{fact.value}</dd>
                    <dt className="flex items-center gap-2 text-sm text-muted">
                      <Icon name={fact.icon} className="size-4 text-brass-dark" />
                      {fact.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="description-heading" className="mt-12">
              <h2 id="description-heading" className="text-3xl font-normal text-ink">
                About this home
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink">{property.summary}</p>
              {property.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-4 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>

            <section aria-labelledby="features-heading" className="mt-12">
              <h2 id="features-heading" className="text-3xl font-normal text-ink">
                Features
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 ring-1 ring-stone/70">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine">
                      <Icon name="check" className="size-4" strokeWidth={2} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside aria-labelledby="enquiry-heading" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-paper p-6 ring-1 ring-stone/70 sm:p-8">
              <h2 id="enquiry-heading" className="text-2xl font-normal text-ink">
                Arrange a viewing
              </h2>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-muted">
                Ask a question or book a visit. An adviser for {property.location} will reply within one working day.
              </p>
              <EnquiryForm key={property.id} property={property} idPrefix="property-enquiry" />
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-stone bg-paper py-20">
        <div className="container-page">
          <SectionHeading eyebrow="You may also like" title="Similar homes" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {getSimilar(property).map((similar) => (
              <li key={similar.id} className="flex">
                <PropertyCard property={similar} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
