import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top, as a full page load would.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
