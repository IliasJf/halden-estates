import { useSyncExternalStore } from 'react'

/**
 * Saved homes, kept in localStorage as a list of property slugs.
 * Every component that calls useSaved() re-renders when the list changes,
 * including in other tabs (through the `storage` event).
 */

const STORAGE_KEY = 'halden-estates:saved'
const listeners = new Set<() => void>()

let cache: string[] = read()

function read(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === 'string') : []
  } catch {
    return []
  }
}

function write(next: string[]) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Private mode or full storage: the list still works until the tab closes.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cache = read()
    listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function toggleSaved(slug: string) {
  write(cache.includes(slug) ? cache.filter((saved) => saved !== slug) : [...cache, slug])
}

export function removeSaved(slug: string) {
  write(cache.filter((saved) => saved !== slug))
}

export default function useSaved(): string[] {
  return useSyncExternalStore(subscribe, () => cache, () => cache)
}
