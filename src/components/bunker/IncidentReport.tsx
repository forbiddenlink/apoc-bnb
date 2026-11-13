"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown, Skull, CheckCircle, XCircle } from "lucide-react";
import { getIncidentsByBunkerId } from "@/lib/data/reviews";
import { cn } from "@/lib/utils";
import type { VerifiedIncident } from "@/types";

const severityConfig: Record<VerifiedIncident["severity"], {
  color: string;
  borderColor: string;
  bgColor: string;
  icon?: React.ElementType;
}> = {
  "Minor Inconvenience": {
    color: "text-muted-foreground",
    borderColor: "border-l-[var(--ash)]",
    bgColor: "bg-[var(--vellum)]",
  },
  "Moderate Trauma": {
    color: "text-secondary",
    borderColor: "border-l-[var(--oxide)]",
    bgColor: "bg-[var(--vellum)]",
  },
  "Existential Crisis": {
    color: "text-[var(--vellum)]",
    borderColor: "border-l-[var(--oxide)]",
    bgColor: "bg-[var(--oxide)]",
  },
  "We Don't Talk About It": {
    color: "text-[var(--geiger)]",
    borderColor: "border-l-[var(--soot)]",
    bgColor: "bg-[var(--soot)]",
    icon: Skull,
  },
};

function IncidentCard({ incident }: { incident: VerifiedIncident }) {
  const config = severityConfig[incident.severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "border-l-4 bg-muted border border-border p-4 space-y-3",
        config.borderColor
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1">
          <h4 className="font-bold text-foreground">{incident.title}</h4>
          <p className="text-xs font-mono text-muted-foreground">{incident.date}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap",
            config.color,
            config.bgColor
          )}
        >
          {SeverityIcon && <SeverityIcon className="h-3 w-3" />}
          {incident.severity}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {incident.description}
      </p>

      <div className="flex items-start gap-2 pt-1">
        {incident.resolved ? (
          <>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase bg-primary/10 text-primary border border-primary/20">
              <CheckCircle className="h-3 w-3" />
              Resolved
            </span>
            {incident.resolutionNote && (
              <p className="text-xs italic text-muted-foreground">
                {incident.resolutionNote}
              </p>
            )}
          </>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase bg-accent/10 text-accent border border-accent/20">
            <XCircle className="h-3 w-3" />
            Unresolved
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function IncidentReport({ bunkerId }: { bunkerId: string }) {
  const incidents = getIncidentsByBunkerId(bunkerId);
  const [isOpen, setIsOpen] = useState(false);

  if (incidents.length === 0) return null;

  return (
    <div className="relative border border-[var(--soot)] bg-muted shadow-[3px_3px_0_var(--soot)]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between gap-3 hover:bg-foreground/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-accent" />
          <span className="text-label text-accent tracking-widest">
            DECLASSIFIED INCIDENT REPORTS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            View {incidents.length} incident{incidents.length !== 1 ? "s" : ""}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-accent" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border">
              <div className="pt-3 space-y-3">
                {incidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground/60 italic pt-2 border-t border-border">
                APOC-BNB is legally required to disclose these incidents. We wish we weren&apos;t.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
