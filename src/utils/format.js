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
export function formatPrice(value) {
  return priceFormatter.format(value)
}

/** €1.5M, used in compact places such as filter options */
export function formatCompactPrice(value) {
  return compactPriceFormatter.format(value)
}

/** 520 m² */
export function formatArea(value) {
  return `${value.toLocaleString('en-IE')} m²`
}

export function pluralise(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}
