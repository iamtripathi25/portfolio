import { BlogData } from '../data/BlogData'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const url = (path) => new URL(`${base}${path}`, import.meta.env.SITE).href

export function get() {
  const pages = [
    { loc: url('/'), changefreq: 'monthly', priority: '1.0' },
    { loc: url('/blog/'), changefreq: 'weekly', priority: '0.9' },
    { loc: url('/about/'), changefreq: 'yearly', priority: '0.6' },
    ...BlogData.map((post) => ({
      loc: url(`/blog/${post.slug}/`),
      lastmod: post.date,
      changefreq: 'yearly',
      priority: '0.8',
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  return { body }
}
