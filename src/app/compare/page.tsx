import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BunkerComparison } from "@/components/features/BunkerComparison";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background font-sans noise-overlay">
      <Navbar />
      <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
        <div className="container mx-auto px-4">
          <BunkerComparison />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
