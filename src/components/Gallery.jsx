import { useState } from 'react'
import { imageAt, srcSetFor } from '../utils/image'
import Icon from './Icon'

const arrowButton =
  'absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-sand/90 text-ink shadow-md transition-colors hover:bg-white'

export default function Gallery({ images, title }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const current = images[index]

  const go = (step) => setIndex((i) => (i + step + count) % count)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  return (
    <section aria-roledescription="carousel" aria-label={`Photos of ${title}`} onKeyDown={handleKeyDown}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone sm:aspect-[16/9]">
        <img
          key={current.src}
          src={imageAt(current.src, 1600)}
          srcSet={srcSetFor(current.src)}
          sizes="(min-width: 1280px) 1216px, 100vw"
          alt={current.alt}
          className="size-full object-cover"
        />

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className={`${arrowButton} left-3 sm:left-5`}>
              <Icon name="chevronLeft" />
              <span className="sr-only">Previous photo</span>
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrowButton} right-3 sm:right-5`}>
              <Icon name="chevronRight" />
              <span className="sr-only">Next photo</span>
            </button>
          </>
        )}

        <p className="absolute right-3 bottom-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-sand sm:right-5 sm:bottom-5" aria-live="polite">
          {index + 1} / {count}
        </p>
      </div>

      {count > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Choose a photo">
          {images.map((image, i) => (
            <li key={image.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`relative block h-16 w-24 overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-32 ${
                  i === index ? 'ring-pine' : 'opacity-70 ring-transparent hover:opacity-100'
                }`}
              >
                <img src={imageAt(image.src, 320)} alt="" loading="lazy" className="size-full object-cover" />
                <span className="sr-only">
                  Show photo {i + 1}: {image.alt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
