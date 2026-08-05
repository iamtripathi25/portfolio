import { useEffect } from 'react'

function Navbar() {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#work', id: 'work' },
    { label: 'Projects', href: '/#project', id: 'project' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/#contact', id: 'contact' },
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

  const handleLinkClick = (event, link) => {
    if (!link.id || window.location.pathname !== '/') {
      return
    }

    event.preventDefault()
    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', window.location.pathname)
  }

  return (
   <>
   
    <div className='font-Manrope flex justify-end px-6 pt-6 pb-3 text-sm font-semibold md:px-10 md:pt-8'>
        <nav className='flex flex-wrap items-center justify-end gap-4 text-neutral-300 md:gap-6'>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => handleLinkClick(event, link)} className='transition-colors duration-300 hover:text-[#F2613F]'>
              {link.label}
            </a>
          ))}
        </nav>
    </div>


   </>
  )
}

export default Navbar
