export default function SectionHeading({ eyebrow, title, intro, align = 'left', as: Heading = 'h2', action }) {
  const centered = align === 'center'

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading className="mt-3 text-3xl leading-tight font-normal text-ink sm:text-4xl lg:text-[2.75rem]">{title}</Heading>
        {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
