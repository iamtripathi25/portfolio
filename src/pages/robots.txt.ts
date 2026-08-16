const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const sitemap = new URL(`${base}/sitemap.xml`, import.meta.env.SITE).href

export function get() {
  return {
    body: `User-agent: *
Allow: /

Sitemap: ${sitemap}
`,
  }
}
