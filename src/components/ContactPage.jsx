import { motion } from 'framer-motion'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBasePath = (path) => `${basePath}${path}` || '/'

function ContactPage() {
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/iamtripathi25' },
    { label: 'GitHub', href: 'https://github.com/iamtripathi25' },
    { label: 'Twitter', href: 'https://twitter.com/Iamtripathi25' },
  ]

  const scrollToTop = (event) => {
    event.preventDefault()
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }

  return (
    <section className='font-Manrope pt-32 pb-6 md:pt-40 md:pb-8 lg:pt-48 lg:pb-6'>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className='pt-10'
      >
        <div className='mx-auto max-w-5xl px-6 md:px-10'>
          <h2 className='text-4xl font-semibold leading-tight tracking-tight text-neutral-100 sm:text-5xl lg:text-7xl'>
            Have a backend, platform, or product idea worth building?
          </h2>

          <div className='mt-10 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between'>
            <a
              href='mailto:iamtripathi.25@gmail.com'
              className='group inline-flex w-fit items-center justify-center gap-3 border border-[#F2613F] bg-[#F2613F] px-6 py-4 text-sm font-bold text-white transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-transparent hover:text-[#F2613F] hover:shadow-[0_18px_42px_rgba(242,97,63,0.24)]'
            >
              Email Me
              <span className='transition-transform duration-500 ease-out group-hover:translate-x-1'>-&gt;</span>
            </a>

            <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-neutral-300 md:text-base'>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  target='_blank'
                  rel='noreferrer'
                  href={link.href}
                  className='transition-colors duration-300 hover:text-[#F2613F]'
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-28 flex items-center justify-between gap-6 border-t border-neutral-800 px-6 pt-5 text-sm text-neutral-500 md:px-10 lg:mt-32'>
          <p>Aman Tripathi</p>
          <a href={withBasePath('/')} onClick={scrollToTop} className='group inline-flex items-center gap-2 font-semibold text-neutral-300 transition-colors duration-300 hover:text-[#F2613F]'>
            Back to top
            <span className='transition-transform duration-300 group-hover:-translate-y-1'>^</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactPage
