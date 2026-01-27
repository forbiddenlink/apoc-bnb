import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_2px,3px_100%] animate-scanlines"></div>

            <div className="relative z-20 space-y-6 max-w-lg">
                <div className="flex justify-center mb-6">
                    <Radio className="h-24 w-24 text-primary animate-pulse" />
                </div>

                <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-transparent tracking-tighter">
                    404
                </h1>

                <h2 className="text-2xl font-bold uppercase tracking-widest text-primary text-glow">
                    SIGNAL LOST
                </h2>

                <p className="text-muted-foreground font-mono">
                    The coordinates you provided lead to a crater. Ideally, you are not currently standing in it.
                </p>

                <div className="pt-8">
                    <Link href="/">
                        <Button size="xl" variant="neobrutal" className="w-full">
                            RETURN TO SAFETY
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
