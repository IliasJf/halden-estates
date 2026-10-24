/**
 * Site-wide content: brand details, navigation and copy used on several pages.
 */

export const BRAND = {
  name: 'Halden Estates',
  tagline: 'Homes with a sense of place',
  email: 'hello@haldenestates.example',
  phone: '+351 210 000 000',
  address: ['Rua da Escola Politécnica 42', '1250-102 Lisboa, Portugal'],
  hours: [
    { days: 'Monday – Friday', time: '9:00 – 19:00' },
    { days: 'Saturday', time: '10:00 – 16:00' },
    { days: 'Sunday', time: 'By appointment' },
  ],
}

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const STATS = [
  { value: '18', label: 'Years in the Portuguese market' },
  { value: '€640M', label: 'In homes sold since 2008' },
  { value: '96%', label: 'Of clients would recommend us' },
]

export const SERVICES = [
  {
    icon: 'home',
    title: 'Buying',
    summary: 'A short list of homes that fit your life, including ones that never reach the open market.',
    points: ['Private search brief', 'Off-market introductions', 'Negotiation on your behalf', 'Legal and tax coordination'],
  },
  {
    icon: 'tag',
    title: 'Selling',
    summary: 'An honest valuation, considered presentation and a marketing plan built around the right buyers.',
    points: ['Free market valuation', 'Architectural photography', 'International buyer network', 'Weekly progress reports'],
  },
  {
    icon: 'key',
    title: 'Lettings & management',
    summary: 'Long and short lets handled end to end, from tenant screening to maintenance.',
    points: ['Tenant referencing', 'Licensing and compliance', 'Maintenance network', 'Monthly statements'],
  },
  {
    icon: 'globe',
    title: 'Relocation',
    summary: 'For families moving to Portugal: schools, neighbourhoods, residency and everything in between.',
    points: ['Neighbourhood tours', 'School shortlists', 'Residency guidance', 'Trusted local partners'],
  },
]

export const PROCESS_STEPS = [
  { title: 'Conversation', text: 'We start with a call or coffee to understand what you need, your timing and your budget.' },
  { title: 'Shortlist', text: 'Within a week you receive a curated shortlist, with honest notes on each home.' },
  { title: 'Viewings', text: 'We plan viewings in a single, well-paced day, in person or by video.' },
  { title: 'Completion', text: 'We coordinate lawyers, surveys and the notary until the keys are in your hand.' },
]

export const TEAM = [
  { name: 'Inês Carvalho', role: 'Founder & Managing Director', initials: 'IC' },
  { name: 'Tomás Reis', role: 'Head of Sales, Lisbon & Sintra', initials: 'TR' },
  { name: 'Clara Mendes', role: 'Coastal Homes, Cascais & Comporta', initials: 'CM' },
  { name: 'Rui Fonseca', role: 'Porto & the North', initials: 'RF' },
]

export const TESTIMONIAL = {
  quote:
    'They found us a house in Sintra before it was ever listed, and handled every step from London. It felt less like a transaction and more like being looked after.',
  author: 'Sarah & James W.',
  context: 'Bought in Sintra, 2025',
}
