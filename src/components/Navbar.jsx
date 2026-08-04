import { useEffect } from 'react'

function Navbar() {
  const sections = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Projects', id: 'project' },
    { label: 'Contact', id: 'contact' },
  ]

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
  }, [])

  const scrollToSection = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }

  return (
   <>
   
    <div className='font-Manrope flex justify-end px-6 pt-6 pb-3 text-sm font-semibold md:px-10 md:pt-8'>
        <nav className='flex flex-wrap items-center justify-end gap-4 text-neutral-300 md:gap-6'>
          {sections.map((section) => (
            <a key={section.id} href='/' onClick={(event) => scrollToSection(event, section.id)} className='transition-colors duration-300 hover:text-[#F2613F]'>
              {section.label}
            </a>
          ))}
        </nav>
    </div>


   </>
  )
}

export default Navbar
