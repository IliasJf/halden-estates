import { useEffect } from 'react'
import { BRAND } from '../data/site'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND.name}` : `${BRAND.name} · ${BRAND.tagline}`
  }, [title])
}
