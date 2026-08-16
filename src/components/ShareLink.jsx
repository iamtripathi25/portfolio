import { useEffect, useRef, useState } from 'react'

function ShareLink({ url, title }) {
  const [mode, setMode] = useState(null)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return
    }

    // Native sheet on mobile, clipboard everywhere else.
    if (typeof navigator.share === 'function') {
      setMode('share')
    } else if (navigator.clipboard) {
      setMode('copy')
    }

    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleClick = async () => {
    if (mode === 'share') {
      try {
        await navigator.share({ title, url })
      } catch {
        // The reader dismissed the sheet; nothing to recover from.
      }

      return
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setMode(null)
    }
  }

  if (!mode) {
    return null
  }

  const label = copied ? 'Link copied' : mode === 'share' ? 'Share this entry' : 'Copy link to this entry'

  return (
    <button
      type='button'
      onClick={handleClick}
      title={label}
      aria-label={label}
      className='shrink-0 text-neutral-500 transition-colors duration-300 hover:text-[#F2613F]'
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-[18px] w-[18px]'
        aria-hidden='true'
      >
        {copied ? (
          <polyline points='20 6 9 17 4 12' />
        ) : (
          <>
            <circle cx='18' cy='5' r='3' />
            <circle cx='6' cy='12' r='3' />
            <circle cx='18' cy='19' r='3' />
            <line x1='8.6' y1='10.5' x2='15.4' y2='6.6' />
            <line x1='8.6' y1='13.5' x2='15.4' y2='17.4' />
          </>
        )}
      </svg>

      <span className='sr-only' aria-live='polite'>
        {copied ? 'Link copied' : ''}
      </span>
    </button>
  )
}

export default ShareLink
