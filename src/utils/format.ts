const priceFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const compactPriceFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 2,
})

/** €3,950,000 */
export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}

/** €1.5M, used in compact places such as filter options and map pins */
export function formatCompactPrice(value: number | string): string {
  return compactPriceFormatter.format(Number(value))
}

/** 520 m² */
export function formatArea(value: number): string {
  return `${value.toLocaleString('en-IE')} m²`
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`
}
