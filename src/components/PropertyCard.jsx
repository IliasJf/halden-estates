import { Link } from 'react-router-dom'
import { formatArea, formatPrice } from '../utils/format'
import { imageAt, srcSetFor } from '../utils/image'
import Icon from './Icon'

export default function PropertyCard({ property, headingLevel: Heading = 'h3' }) {
  const [cover] = property.images

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-paper shadow-[0_1px_2px_rgba(22,33,29,0.06)] ring-1 ring-stone/70 transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(22,33,29,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        <img
          src={imageAt(cover.src, 800)}
          srcSet={srcSetFor(cover.src, [480, 800, 1200])}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          alt={cover.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-sand/95 px-3 py-1 text-xs font-semibold text-ink">
          {property.type}
        </span>
        {property.featured && (
          <span className="absolute top-4 right-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-sand">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <Icon name="pin" className="size-4 text-brass-dark" />
          {property.neighbourhood}, {property.location}
        </p>
        <Heading className="mt-2 text-xl leading-snug text-ink">
          {/* The ::after overlay makes the whole card clickable while keeping one link per card */}
          <Link to={`/properties/${property.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-brass-dark">
            {property.title}
          </Link>
        </Heading>
        <p className="mt-3 font-display text-2xl text-pine">{formatPrice(property.price)}</p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-stone/80 pt-4 text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <dt>
              <Icon name="bed" className="size-4" />
              <span className="sr-only">Bedrooms</span>
            </dt>
            <dd>{property.beds} beds</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>
              <Icon name="bath" className="size-4" />
              <span className="sr-only">Bathrooms</span>
            </dt>
            <dd>{property.baths} baths</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>
              <Icon name="area" className="size-4" />
              <span className="sr-only">Living area</span>
            </dt>
            <dd>{formatArea(property.size)}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
