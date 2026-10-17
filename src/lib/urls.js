/**
 * Production destinations for the marketing site.
 * Dashboard auth lives on the tl-dash1 app; artist storefronts live on tl-store.
 */
export const DASHBOARD_URL = import.meta.env.VITE_BACKEND_URL || 'https://app.thelabelai.com'
export const DASHBOARD_LOGIN_URL = `${DASHBOARD_URL.replace(/\/$/, '')}/login`
export const STORES_URL = import.meta.env.VITE_STORES_URL || 'https://store.thelabelai.com'
export const SUPPORT_EMAIL = 'support@thelabelai.com'
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`

export function dashboardSignupUrl(planId = null, period = 'monthly') {
  if (!planId || planId === 'free') return DASHBOARD_LOGIN_URL
  const params = new URLSearchParams({ plan: planId })
  if (period) params.set('period', period)
  return `${DASHBOARD_LOGIN_URL}?${params.toString()}`
}
