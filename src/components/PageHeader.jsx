/** The title band at the top of inner pages (Properties, About, Services, Contact). */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <section className="border-b border-stone/70 bg-paper">
      <div className="container-page py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-normal text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
