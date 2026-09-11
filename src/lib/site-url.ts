/**
 * Resolves the canonical production URL used for metadata, robots.txt, and
 * the sitemap. Order: explicit NEXT_PUBLIC_BASE_URL (set in Vercel), then
 * Vercel's own production-domain system env, then the known production URL
 * as a last-resort literal. Never falls back to localhost.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'https://apoc-bnb.vercel.app'
}
