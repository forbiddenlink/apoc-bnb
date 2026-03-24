'use client'

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
      <div className="space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mx-auto">
          <AlertTriangle className="h-10 w-10 text-accent animate-pulse" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
          System Malfunction
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          [ERROR] {error.message || "An unexpected breach occurred in the shelter systems."}
        </p>
        <p className="text-muted-foreground text-sm">
          Don&apos;t panic. Panicking attracts mutants.
        </p>
        <Button size="xl" variant="default" className="w-full" onClick={reset}>
          REBOOT SYSTEMS
        </Button>
      </div>
    </div>
  )
}
