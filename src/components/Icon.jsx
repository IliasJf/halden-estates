/**
 * A small set of line icons, drawn on a 24×24 grid.
 * Icons are decorative by default (aria-hidden); pair them with visible or sr-only text.
 */
const PATHS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  chevronDown: 'M6 9l6 6 6-6',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  bed: 'M2 19v-6.5A2.5 2.5 0 0 1 4.5 10h15a2.5 2.5 0 0 1 2.5 2.5V19M2 16h20M5 10V7.5A1.5 1.5 0 0 1 6.5 6h3A1.5 1.5 0 0 1 11 7.5V10M13 10V7.5A1.5 1.5 0 0 1 14.5 6h3A1.5 1.5 0 0 1 19 7.5V10',
  bath: 'M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5V12zM6 12V6a2 2 0 0 1 2-2h.5A2.5 2.5 0 0 1 11 6.5M7 19l-1 2M17 19l1 2',
  area: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  plot: 'M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6',
  check: 'M5 12.5l4.5 4.5L19 7',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  sliders: 'M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4',
  alert: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v5M12 16.5v.01',
  home: 'M3 11l9-7 9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5',
  tag: 'M3 12V4h8l10 10-8 8-10-10zM7.5 8.5h.01',
  key: 'M15 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM11.5 12.5L3 21M6 18l2.5 2.5M8.5 15.5L11 18',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
}

export default function Icon({ name, className = 'size-5', strokeWidth = 1.6, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
