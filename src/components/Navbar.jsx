import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/site'
import Icon from './Icon'
import Logo from './Logo'

const linkClass = ({ isActive }) =>
  `relative py-2 text-sm font-medium transition-colors hover:text-ink ${
    isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-brass-dark' : 'text-muted'
  }`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname])

  // While the menu is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => event.key === 'Escape' && setIsOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-stone/70 bg-sand/90 backdrop-blur-md">
      <nav className="container-page flex h-18 items-center justify-between gap-6" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn-primary hidden md:inline-flex">
          Book a valuation
        </Link>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-stone/60 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <Icon name={isOpen ? 'close' : 'menu'} className="size-6" />
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-stone/70 bg-sand md:hidden">
          <ul className="container-page flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="border-b border-stone/70">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 font-display text-2xl ${isActive ? 'text-ink' : 'text-muted'}`
                  }
                >
                  {link.label}
                  <Icon name="arrowRight" className="size-5 text-brass-dark" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="container-page pb-8">
            <Link to="/contact" className="btn-primary w-full">
              Book a valuation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
