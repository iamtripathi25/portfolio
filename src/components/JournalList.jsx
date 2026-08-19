import { useState } from 'react'

const ALL = 'All'

// Filter keys are namespaced so a topic and a category can never collide:
//   'All' | 'topic:Algorithms' | 'cat:Sorting'
const topicKey = (topic) => `topic:${topic}`
const categoryKey = (category) => `cat:${category}`

function buildFilters(posts) {
  const categoryCounts = {}
  const topicCounts = {}

  // Categories that share a topic are listed under it; the rest stay top level.
  const categoriesByTopic = new Map()

  posts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] ?? 0) + 1

    if (post.topic) {
      topicCounts[post.topic] = (topicCounts[post.topic] ?? 0) + 1
    }

    const parent = post.topic ?? null
    if (!categoriesByTopic.has(parent)) {
      categoriesByTopic.set(parent, new Set())
    }
    categoriesByTopic.get(parent).add(post.category)
  })

  // Busiest first, so the list stays useful as it grows past a screenful.
  const byCount = (counts) => (a, b) => counts[b] - counts[a] || a.localeCompare(b)

  const nodes = []

  Object.keys(topicCounts)
    .sort(byCount(topicCounts))
    .forEach((topic) => {
      nodes.push({ key: topicKey(topic), label: topic, count: topicCounts[topic], depth: 0 })

      Array.from(categoriesByTopic.get(topic))
        .sort(byCount(categoryCounts))
        .forEach((category) => {
          nodes.push({
            key: categoryKey(category),
            label: category,
            count: categoryCounts[category],
            depth: 1,
          })
        })
    })

  Array.from(categoriesByTopic.get(null) ?? [])
    .sort(byCount(categoryCounts))
    .forEach((category) => {
      nodes.push({ key: categoryKey(category), label: category, count: categoryCounts[category], depth: 0 })
    })

  return [{ key: ALL, label: ALL, count: posts.length, depth: 0 }, ...nodes]
}

function JournalList({ posts }) {
  const [active, setActive] = useState(ALL)

  const filters = buildFilters(posts)

  const matches = (post) => {
    if (active === ALL) return true
    if (active.startsWith('topic:')) return post.topic === active.slice('topic:'.length)
    return post.category === active.slice('cat:'.length)
  }

  const visible = posts.filter(matches)

  // Nothing to filter until there is more than one thing to filter by.
  const showFilters = filters.length > 2

  const list = (
    <ul className="border-t border-neutral-800">
      {visible.map((post) => (
        <li key={post.slug} className="border-b border-neutral-800">
          <a
            href={post.href}
            className="group grid gap-3 py-8 transition-colors duration-300 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8 md:py-10"
          >
            <span className="text-sm font-semibold tabular-nums text-neutral-600 transition-colors duration-300 group-hover:text-[#F2613F]">
              {String(post.number).padStart(2, '0')}
            </span>

            <div>
              <h2 className="text-2xl font-semibold leading-tight text-neutral-100 transition-colors duration-300 group-hover:text-[#F2613F] md:text-3xl">
                {post.title}
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-8 text-neutral-400">{post.excerpt}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {post.topic && (
                  <>
                    <span>{post.topic}</span>
                    <span aria-hidden="true">&rsaquo;</span>
                  </>
                )}
                <span className="text-neutral-400">{post.category}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={post.isoDate}>{post.date}</time>
                <span aria-hidden="true">/</span>
                <span>{post.readingTime}</span>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="hidden text-2xl text-neutral-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F2613F] md:block"
            >
              &rarr;
            </span>
          </a>
        </li>
      ))}
    </ul>
  )

  if (!showFilters) {
    return list
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-x-12">
      <div className="min-w-0">
        {/* Phones: one scrolling line instead of a block of wrapped pills. */}
        <div className="-mx-6 mb-8 overflow-x-auto px-6 lg:hidden">
          <div className="flex w-max gap-2" role="group" aria-label="Filter entries by topic">
            {filters.map((filter) => {
              const isActive = filter.key === active

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActive(filter.key)}
                  aria-pressed={isActive}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? 'border-[#F2613F] bg-[#F2613F] text-white'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  {/* No indentation on a scrolling row, so nesting is marked on the label. */}
                  {filter.depth > 0 && <span aria-hidden="true" className="mr-1.5 opacity-60">&rsaquo;</span>}
                  {filter.label}
                  <span className={`ml-2 tabular-nums ${isActive ? 'text-white/70' : 'text-neutral-600'}`}>
                    {filter.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {list}
      </div>

      <aside className="hidden lg:block">
        <div className="lg:sticky lg:top-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Categories</p>

          <ul className="mt-5 border-l border-neutral-800" role="group" aria-label="Filter entries by topic">
            {filters.map((filter) => {
              const isActive = filter.key === active

              return (
                <li key={filter.key}>
                  <button
                    type="button"
                    onClick={() => setActive(filter.key)}
                    aria-pressed={isActive}
                    className={`-ml-px flex w-full items-baseline justify-between gap-3 border-l-2 py-2 text-left transition-colors duration-300 ${
                      filter.depth > 0 ? 'pl-8 text-[0.8125rem]' : 'pl-4 text-sm'
                    } ${
                      isActive
                        ? 'border-[#F2613F] font-semibold text-[#F2613F]'
                        : 'border-transparent text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`tabular-nums text-xs ${isActive ? 'text-[#F2613F]' : 'text-neutral-600'}`}>
                      {filter.count}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default JournalList
