"use client";

import { Scale } from "lucide-react";
import Link from "next/link";
import { useComparison } from "@/lib/hooks/useComparison";

interface CompareButtonProps {
  bunkerId: string;
}

export function CompareButton({ bunkerId }: CompareButtonProps) {
  const { addBunker, removeBunker, isBunkerAdded, bunkerIds } = useComparison();
  const isAdded = isBunkerAdded(bunkerId);
  const handleToggle = () => {
    if (isAdded) {
      removeBunker(bunkerId);
    } else {
      if (bunkerIds.length >= 3) {
        alert("Maximum 3 bunkers can be compared at once");
        return;
      }
      addBunker(bunkerId);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-md border transition-colors ${
          isAdded
            ? "bg-secondary text-secondary-foreground border-secondary"
            : "border-border hover:bg-accent"
        }`}
      >
        <Scale className="h-4 w-4 inline mr-2" />
        {isAdded ? "Remove from Compare" : "Add to Compare"}
      </button>
      
      {bunkerIds.length > 0 && (
        <Link
          href="/compare"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Compare ({bunkerIds.length})
        </Link>
      )}
    </div>
  );
}
