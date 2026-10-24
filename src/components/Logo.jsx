import { Link } from 'react-router-dom'

export default function Logo({ tone = 'dark', onClick }) {
  const roof = tone === 'dark' ? 'text-brass-dark' : 'text-brass'
  const text = tone === 'dark' ? 'text-ink' : 'text-sand'

  return (
    <Link to="/" onClick={onClick} className={`inline-flex items-center gap-2.5 ${text}`} aria-label="Halden Estates, home">
      <svg viewBox="0 0 32 32" className={`size-8 ${roof}`} aria-hidden="true">
        <path d="M6 27V12l10-6 10 6v15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 27v-9h8v9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" opacity="0.6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-medium tracking-tight">Halden</span>
        <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.32em] uppercase opacity-70">Estates</span>
      </span>
    </Link>
  )
}
