import CallToAction from '../components/CallToAction'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { STATS, TEAM } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { imageAt, srcSetFor } from '../utils/image'

const STORY_IMAGE = {
  src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
  alt: 'Colleagues talking around a table in a bright office with exposed brick',
}

const VALUES = [
  { title: 'Honest advice', text: 'We will tell you when a home is overpriced, even if it is one of ours.' },
  { title: 'Deep local knowledge', text: 'Our advisers live where they sell, and know the schools, the noise and the light.' },
  { title: 'Care beyond completion', text: 'Many clients come back to us to let, renovate or sell years later.' },
]

export default function About() {
  useDocumentTitle('About us')

  return (
    <>
      <PageHeader
        eyebrow="About Halden"
        title="An independent agency, built around people rather than listings"
        intro="Since 2008 we have helped families, returning Portuguese and new arrivals find homes in Lisbon, along the coast and in the north."
      />

      <section className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20">
        <img
          src={imageAt(STORY_IMAGE.src, 1000)}
          srcSet={srcSetFor(STORY_IMAGE.src, [600, 1000, 1400])}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={STORY_IMAGE.alt}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
        <div>
          <SectionHeading eyebrow="Our story" title="Started at a kitchen table in Príncipe Real" />
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              Inês Carvalho founded Halden after a decade at a large international agency, where she saw too many buyers
              rushed through viewings and too many sellers left in the dark.
            </p>
            <p>
              The idea was simple: take on fewer homes, know each one properly, and give every client one adviser who
              stays with them from the first call to the day the keys change hands.
            </p>
            <p>
              Eighteen years later we are a team of twenty-two across offices in Lisbon, Cascais and Porto, and that idea
              has not changed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-sand" data-surface="dark">
        <div className="container-page">
          <dl className="grid gap-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-2 border-t border-sand/15 pt-6">
                <dt className="text-sand/75">{stat.label}</dt>
                <dd className="font-display text-5xl text-brass">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="What we believe" title="Three things we won’t compromise on" align="center" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <li key={value.title} className="rounded-2xl bg-paper p-8 ring-1 ring-stone/70">
              <span className="font-display text-3xl text-brass-dark" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-normal text-ink">{value.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-stone bg-paper py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="The team" title="The people you’ll speak to" intro="Every client works with one senior adviser, supported by the wider team." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person) => (
              <li key={person.name} className="rounded-2xl bg-sand p-6 ring-1 ring-stone/70">
                <span
                  className="inline-flex size-16 items-center justify-center rounded-full bg-pine font-display text-xl text-brass"
                  aria-hidden="true"
                >
                  {person.initials}
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold text-ink">{person.name}</h3>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction title="Let’s talk about your move" text="Whether you are buying, selling or relocating, a short conversation is the best place to start." linkTo="/contact" linkLabel="Get in touch" />
    </>
  )
}
