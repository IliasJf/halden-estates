/**
 * There is no backend: enquiries are saved to the browser's localStorage and
 * logged to the console. Replace `saveEnquiry` with a fetch() to your API or a
 * form service (Formspree, Netlify Forms, etc.) to receive real leads.
 */

const STORAGE_KEY = 'halden-estates:enquiries'

export function getEnquiries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export async function saveEnquiry(enquiry) {
  const record = { ...enquiry, id: crypto.randomUUID(), submittedAt: new Date().toISOString() }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...getEnquiries(), record]))
  } catch {
    // Storage can be unavailable (private mode, quota). The console log below still records the lead.
  }

  console.info('[Halden Estates] New enquiry', record)

  // Simulate network latency so the loading state is visible.
  await new Promise((resolve) => setTimeout(resolve, 600))
  return record
}
