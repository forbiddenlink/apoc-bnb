import { ConciergeNote } from '@/components/home/ConciergeNote'
import { FolioFooter } from '@/components/home/FolioFooter'
import { FolioHero } from '@/components/home/FolioHero'
import { HouseRules } from '@/components/home/HouseRules'
import { PinnedCta } from '@/components/home/PinnedCta'
import { Register } from '@/components/home/Register'
import { Slips } from '@/components/home/Slips'
import { StaffPlates } from '@/components/home/StaffPlates'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Navbar } from '@/components/layout/Navbar'

export default function Home() {
  return (
    <>
      <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
        <Navbar variant="folio" />
      </div>
      <div className="folio min-h-screen overflow-x-clip">
        <main id="main-content" className="relative">
          <FolioHero />
          <Register />
          <HouseRules />
          <StaffPlates />
          <Slips />
          <ConciergeNote />
        </main>
        <FolioFooter />
        <PinnedCta />
      </div>
      <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
        <MobileBottomNav />
      </div>
    </>
  )
}
