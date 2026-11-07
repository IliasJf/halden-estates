import { Link } from 'react-router-dom'
import { LOCATIONS } from '../data/properties'
import { BRAND, NAV_LINKS } from '../data/site'
import Icon from './Icon'
import Logo from './Logo'

const footerLink = 'text-sand/75 transition-colors hover:text-sand'

export default function Footer() {
  return (
    <footer className="bg-ink text-sand" data-surface="dark">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-sand/75">
            An independent agency for homes with character across Lisbon, the coast and the north of Portugal.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Locations</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {LOCATIONS.map((location) => (
              <li key={location}>
                <Link to={`/properties?location=${encodeURIComponent(location)}`} className={footerLink}>
                  {location}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Visit us</h2>
          <address className="mt-5 space-y-3 text-sm text-sand/75 not-italic">
            <p className="flex gap-3">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brass" />
              <span>
                {BRAND.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className={`flex items-center gap-3 ${footerLink}`}>
                <Icon name="phone" className="size-4 text-brass" />
                {BRAND.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${BRAND.email}`} className={`flex items-center gap-3 break-all ${footerLink}`}>
                <Icon name="mail" className="size-4 shrink-0 text-brass" />
                {BRAND.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-sand/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Demo website with sample listings. Photography from Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}
