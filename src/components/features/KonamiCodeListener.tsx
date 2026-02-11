"use client";

import { useState } from "react";
import { useKonamiCode } from "@/lib/hooks/useKonamiCode";
import { SecretTerminal } from "@/components/features/SecretTerminal";

export function KonamiCodeListener() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useKonamiCode(() => {
    setIsTerminalOpen(true);
  });

  return (
    <SecretTerminal
      isOpen={isTerminalOpen}
      onClose={() => setIsTerminalOpen(false)}
    />
  );
}
