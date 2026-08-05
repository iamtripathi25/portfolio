import { useEffect, useState } from 'react'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBasePath = (path) => `${basePath}${path}` || '/'
const getPathInSite = () => {
  const { pathname } = window.location

  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/'
  }

  return pathname
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const links = [
    { label: 'Home', href: withBasePath('/') },
    { label: 'Work', href: withBasePath('/#work'), id: 'work' },
    { label: 'Projects', href: withBasePath('/#project'), id: 'project' },
    { label: 'About', href: withBasePath('/about/') },
    { label: 'Contact', href: withBasePath('/#contact'), id: 'contact' },
  ]

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      })
    }
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleResize)
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (event, link) => {
    setIsMenuOpen(false)

    if (!link.id || getPathInSite() !== '/') {
      return
    }

    event.preventDefault()
    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', window.location.pathname)
  }

  return (
    <header className='font-Manrope relative z-50 px-5 pt-5 pb-3 text-sm font-semibold md:px-10 md:pt-8'>
      <div className='flex items-center justify-end'>
        <button
          type='button'
          className='group flex h-10 w-10 items-center justify-center text-neutral-100 transition-colors duration-300 hover:text-[#F2613F] md:hidden'
          aria-expanded={isMenuOpen}
          aria-controls='mobile-navigation'
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className='sr-only'>{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
          <span className='relative h-4 w-5'>
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45 text-[#F2613F]' : ''}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 bottom-0 h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? '-translate-y-[7px] -rotate-45 text-[#F2613F]' : ''}`} />
          </span>
        </button>

        <nav className='hidden flex-wrap items-center justify-end gap-4 text-neutral-300 md:flex md:gap-6'>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => handleLinkClick(event, link)} className='transition-colors duration-300 hover:text-[#F2613F]'>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <nav
        id='mobile-navigation'
        className={`overflow-hidden md:hidden ${isMenuOpen ? 'pointer-events-auto mt-5 max-h-96 opacity-100' : 'pointer-events-none mt-0 max-h-0 opacity-0'} transition-all duration-300 ease-out`}
        aria-hidden={!isMenuOpen}
      >
        <div className='border-y border-neutral-800 bg-[#0C0C0C]/95 py-2'>
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link)}
              className={`flex min-h-14 items-center justify-between text-lg font-semibold text-neutral-100 transition-colors duration-300 hover:text-[#F2613F] ${index > 0 ? 'border-t border-neutral-900' : ''}`}
            >
              {link.label}
              <span className='text-sm text-[#F2613F]'>0{index + 1}</span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
