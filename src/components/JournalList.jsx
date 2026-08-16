import { useState } from 'react'

const ALL = 'All'

function JournalList({ posts }) {
  const [active, setActive] = useState(ALL)

  const counts = posts.reduce((totals, post) => {
    totals[post.category] = (totals[post.category] ?? 0) + 1
    return totals
  }, {})

  // Busiest categories first, so the list stays useful as it grows past a screenful.
  const categories = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
  const filters = [ALL, ...categories]
  const visible = active === ALL ? posts : posts.filter((post) => post.category === active)
  const countFor = (filter) => (filter === ALL ? posts.length : counts[filter])

  // With one category there is nothing to filter — show the list on its own.
  const showFilters = categories.length > 1

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
          <div className="flex w-max gap-2" role="group" aria-label="Filter entries by category">
            {filters.map((filter) => {
              const isActive = filter === active

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? 'border-[#F2613F] bg-[#F2613F] text-white'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  {filter}
                  <span className={`ml-2 tabular-nums ${isActive ? 'text-white/70' : 'text-neutral-600'}`}>
                    {countFor(filter)}
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

          <ul className="mt-5 border-l border-neutral-800" role="group" aria-label="Filter entries by category">
            {filters.map((filter) => {
              const isActive = filter === active

              return (
                <li key={filter}>
                  <button
                    type="button"
                    onClick={() => setActive(filter)}
                    aria-pressed={isActive}
                    className={`-ml-px flex w-full items-baseline justify-between gap-3 border-l-2 py-2 pl-4 text-left text-sm transition-colors duration-300 ${
                      isActive
                        ? 'border-[#F2613F] font-semibold text-[#F2613F]'
                        : 'border-transparent text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <span>{filter}</span>
                    <span className={`tabular-nums text-xs ${isActive ? 'text-[#F2613F]' : 'text-neutral-600'}`}>
                      {countFor(filter)}
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
