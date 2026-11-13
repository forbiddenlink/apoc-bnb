import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Navbar } from '@/components/layout/Navbar'
import { cn } from '@/lib/utils'

/**
 * Chrome for inner pages on the folio system: paper body between the
 * letterhead nav and an inverted (Soot) footer. Navbar and bottom nav stay
 * outside the .folio scope, same as the home page.
 */
export function FolioShell({
  children,
  mainClassName,
  footer = true,
}: {
  children: ReactNode
  mainClassName?: string
  footer?: boolean
}) {
  return (
    <>
      <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
        <Navbar variant="folio" />
      </div>
      <div className="folio folio-inner min-h-screen overflow-x-clip">
        <main
          id="main-content"
          className={cn('relative container mx-auto px-4 pt-28 pb-mobile-nav md:pb-20', mainClassName)}
        >
          {children}
        </main>
        {footer && (
          <div className="folio-soot relative">
            <Footer />
          </div>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
        <MobileBottomNav />
      </div>
    </>
  )
}
