import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import Icon from '../components/Icon'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { LOCATIONS, properties } from '../data/properties'
import { STATS, TESTIMONIAL } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { pluralise } from '../utils/format'
import { imageAt, srcSetFor } from '../utils/image'

const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  alt: 'White modernist villa with a swimming pool under a clear blue sky',
}

const APPROACH_IMAGE = {
  src: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1600&q=80',
  alt: 'Lantern-lit courtyard with arches around a swimming pool at night',
}

const APPROACH_POINTS = [
  { title: 'Fewer, better homes', text: 'We take on a limited number of listings so each one gets our full attention.' },
  { title: 'Local by default', text: 'Every adviser lives in the area they cover, from Príncipe Real to Praia da Luz.' },
  { title: 'One point of contact', text: 'One adviser from first call to notary, with lawyers and surveyors coordinated for you.' },
]

const featured = properties.filter((property) => property.featured).slice(0, 6)

// One tile per location, using the first listing there for the photo.
const locationTiles = LOCATIONS.map((location) => {
  const homes = properties.filter((property) => property.location === location)
  return { location, count: homes.length, image: homes[0]?.images[0] }
}).filter((tile) => tile.count > 0)

export default function Home() {
  useDocumentTitle()

  return (
    <>
      {/* Hero */}
      <section data-surface="dark" className="relative isolate overflow-hidden bg-ink">
        <img
          src={imageAt(HERO_IMAGE.src, 1600)}
          srcSet={srcSetFor(HERO_IMAGE.src, [800, 1200, 1600, 2400])}
          sizes="100vw"
          alt={HERO_IMAGE.alt}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40 sm:via-ink/55 sm:to-ink/10" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden="true" />

        <div className="container-page pt-20 pb-40 sm:pt-28 sm:pb-48 lg:pt-36 lg:pb-56">
          <p className="text-xs font-semibold tracking-[0.25em] text-brass uppercase">Lisbon · The coast · Porto</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] font-light text-sand sm:text-6xl lg:text-7xl">
            Homes with a <em className="font-normal text-brass not-italic sm:italic">sense of place.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/85">
            Halden Estates is an independent agency for considered homes across Portugal: city apartments, coastal villas and
            country houses, chosen one by one.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/properties" className="btn-light">
              Browse properties
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link to="/services" className="btn border border-sand/40 text-sand hover:border-sand hover:bg-sand/10">
              Our services
            </Link>
          </div>
        </div>
      </section>

      {/* Search, overlapping the hero */}
      <div className="container-page relative z-10 -mt-24 sm:-mt-28">
        <h2 className="sr-only">Search for a home</h2>
        <SearchBar />
      </div>

      {/* Stats */}
      <section aria-label="Halden Estates in numbers" className="container-page pt-14">
        <dl className="grid gap-8 border-b border-stone pb-14 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 sm:items-center sm:text-center">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-4xl text-pine">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured listings */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Featured listings"
          title="Homes we’re proud to represent"
          intro="A selection of the homes currently on our books, from a Príncipe Real penthouse to a clifftop villa in Lagos."
          action={
            <Link to="/properties" className="btn-secondary">
              View all properties
              <Icon name="arrowRight" className="size-4" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((property) => (
            <li key={property.id} className="flex">
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      </section>

      {/* Locations */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Where we work"
            title="Six places we know street by street"
            intro="Choose a location to see every home we have there."
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {locationTiles.map((tile) => (
              <li key={tile.location}>
                <Link
                  to={`/properties?location=${encodeURIComponent(tile.location)}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-stone sm:aspect-[4/3]"
                >
                  <img
                    src={imageAt(tile.image.src, 600)}
                    srcSet={srcSetFor(tile.image.src, [400, 600, 900])}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-sand sm:p-6">
                    <span>
                      <span className="block font-display text-2xl sm:text-3xl">{tile.location}</span>
                      <span className="text-sm text-sand/80">{pluralise(tile.count, 'home')}</span>
                    </span>
                    <Icon name="arrowRight" className="mb-1 hidden size-5 transition-transform group-hover:translate-x-1 sm:block" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="container-page grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <img
            src={imageAt(APPROACH_IMAGE.src, 1000)}
            srcSet={srcSetFor(APPROACH_IMAGE.src, [600, 1000, 1400])}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={APPROACH_IMAGE.alt}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
          />
          <figure className="absolute right-4 -bottom-8 left-4 rounded-2xl bg-paper p-6 shadow-xl ring-1 ring-stone/70 sm:right-auto sm:left-8 sm:max-w-sm">
            <blockquote className="font-display text-lg leading-snug text-ink">“{TESTIMONIAL.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-semibold text-ink">{TESTIMONIAL.author}</span> · {TESTIMONIAL.context}
            </figcaption>
          </figure>
        </div>

        <div className="pt-10 lg:pt-0">
          <SectionHeading
            eyebrow="Our approach"
            title="A quieter, more personal way to move home"
            intro="We started Halden in 2008 because buying a home in Portugal deserved better than a stack of listings and a hurried viewing."
          />
          <ul className="mt-10 space-y-6">
            {APPROACH_POINTS.map((point, i) => (
              <li key={point.title} className="flex gap-5">
                <span className="font-display text-2xl text-brass-dark" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-secondary mt-10">
            About Halden
          </Link>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
