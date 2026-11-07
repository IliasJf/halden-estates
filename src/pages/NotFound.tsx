import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound({
  title = 'This page has moved out',
  message = 'The page you were looking for doesn’t exist, or the link may be out of date.',
}) {
  useDocumentTitle('Page not found')

  return (
    <section className="container-page flex flex-col items-center py-28 text-center sm:py-36">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-xl text-4xl font-normal text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/properties" className="btn-primary">
          Browse properties
        </Link>
        <Link to="/" className="btn-secondary">
          Back to home
        </Link>
      </div>
    </section>
  )
}
