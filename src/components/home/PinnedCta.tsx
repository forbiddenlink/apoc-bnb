'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function PinnedCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <Link
      href="/#reserve"
      className="fixed bottom-[8.25rem] right-4 z-30 inline-flex min-h-11 items-center bg-[var(--soot)] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--geiger)] shadow-[3px_3px_0_var(--oxide)] md:bottom-[4.75rem] md:right-6"
    >
      Reserve a bunker
    </Link>
  )
}
