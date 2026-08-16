// Supported body blocks:
//   { type: 'p', text }
//   { type: 'h2', text }                      also becomes a Contents entry in the sidebar
//   { type: 'quote', text }
//   { type: 'code', lang, code, filename?, caption? }
//
// Code blocks are syntax highlighted at build time; `lang` takes any Shiki language
// ('javascript', 'python', 'go', 'sql', 'bash', ...). Example:
//   {
//     type: 'code',
//     lang: 'javascript',
//     filename: 'circuit-breaker.js',
//     code: `
// const breaker = new CircuitBreaker({ threshold: 5 })
// `,
//     caption: 'Optional line under the block for the explanation.',
//   }
//
// Optional per-post: `references: [{ label, url, note? }]` renders in the sidebar.
//
// `category` drives the filter on /blog/. Categories are derived from the posts
// themselves, so inventing a new one is just typing it on a post.

export const BlogData = [
  {
    slug: 'why-i-am-keeping-this-journal',
    title: 'Why I am keeping this journal',
    date: '2026-08-16',
    readingTime: '3 min',
    category: 'Journal',
    excerpt:
      'Give it a year and I cannot tell you how I solved something, only that I did. So this is the reference I leave behind.',
    body: [
      {
        type: 'p',
        text: 'I forget things. Give it six months and the details of something I built go soft at the edges; a year later I can only tell you that I solved it, not how. The understanding does not survive on its own — it survives if I left a reference behind.',
      },
      {
        type: 'p',
        text: 'So that is what this is. Working notes, closer to a lab notebook than a blog: what broke, what I misunderstood, and what I would do differently. Public, because it is harder to hand-wave a step when a reader could ask about it.',
      },
      { type: 'h2', text: 'A deliberate detox' },
      {
        type: 'p',
        text: 'Writing this is also how I detox from AI. Not because the tools are bad — they are genuinely useful, and I use them. But reaching for one the moment a problem gets uncomfortable is how I stopped noticing that I had quietly outsourced the thinking. Sitting with a problem until I actually understand it is a muscle, and it weakens fast when something else lifts for me.',
      },
      {
        type: 'quote',
        text: 'Using an AI tool is good. Letting it do the part I should be doing is not — at least not from where I stand.',
      },
      {
        type: 'p',
        text: 'So the ideas here are mine. Every entry starts from something I built, broke, or read closely enough to have an opinion about, and anything borrowed gets credited in the references. I may use a tool to tighten a muddled paragraph or push me to explain a step I skipped, but the understanding comes first and the tool comes after.',
      },
    ],
  },
]
