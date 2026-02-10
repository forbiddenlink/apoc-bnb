"use client";

import { motion } from "framer-motion";

export type MascotExpression = "happy" | "warning" | "sad" | "dead" | "excited";

interface ApocMascotProps {
  expression?: MascotExpression;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  speech?: string;
}

const SIZE_MAP = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 180,
};

// Different face expressions rendered as simple shapes
function getFaceElements(expression: MascotExpression, size: number) {
  const scale = size / 80; // Base size is 80

  switch (expression) {
    case "happy":
      return (
        <>
          {/* Happy eyes: ^_^ */}
          <path
            d={`M ${24 * scale} ${38 * scale} L ${28 * scale} ${34 * scale} L ${32 * scale} ${38 * scale}`}
            stroke="#39ff14"
            strokeWidth={2 * scale}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M ${48 * scale} ${38 * scale} L ${52 * scale} ${34 * scale} L ${56 * scale} ${38 * scale}`}
            stroke="#39ff14"
            strokeWidth={2 * scale}
            strokeLinecap="round"
            fill="none"
          />
          {/* Smile */}
          <path
            d={`M ${30 * scale} ${48 * scale} Q ${40 * scale} ${56 * scale} ${50 * scale} ${48 * scale}`}
            stroke="#39ff14"
            strokeWidth={2 * scale}
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    case "warning":
      return (
        <>
          {/* Alert eyes: O_O */}
          <circle cx={28 * scale} cy={36 * scale} r={5 * scale} fill="#ffea00" />
          <circle cx={28 * scale} cy={36 * scale} r={2 * scale} fill="#0a0a0a" />
          <circle cx={52 * scale} cy={36 * scale} r={5 * scale} fill="#ffea00" />
          <circle cx={52 * scale} cy={36 * scale} r={2 * scale} fill="#0a0a0a" />
          {/* Worried mouth */}
          <path
            d={`M ${30 * scale} ${50 * scale} L ${50 * scale} ${50 * scale}`}
            stroke="#ffea00"
            strokeWidth={2 * scale}
            strokeLinecap="round"
          />
          {/* Sweat drop */}
          <ellipse
            cx={60 * scale}
            cy={28 * scale}
            rx={3 * scale}
            ry={4 * scale}
            fill="#39ff14"
            opacity={0.6}
          />
        </>
      );

    case "sad":
      return (
        <>
          {/* Sad eyes: ;_; with tears */}
          <circle cx={28 * scale} cy={36 * scale} r={4 * scale} fill="#39ff14" opacity={0.7} />
          <circle cx={52 * scale} cy={36 * scale} r={4 * scale} fill="#39ff14" opacity={0.7} />
          {/* Tears */}
          <ellipse cx={28 * scale} cy={46 * scale} rx={2 * scale} ry={4 * scale} fill="#39ff14" opacity={0.5} />
          <ellipse cx={52 * scale} cy={46 * scale} rx={2 * scale} ry={4 * scale} fill="#39ff14" opacity={0.5} />
          {/* Frown */}
          <path
            d={`M ${30 * scale} ${54 * scale} Q ${40 * scale} ${48 * scale} ${50 * scale} ${54 * scale}`}
            stroke="#39ff14"
            strokeWidth={2 * scale}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        </>
      );

    case "dead":
      return (
        <>
          {/* X_X eyes */}
          <g stroke="#ff003c" strokeWidth={2 * scale} strokeLinecap="round">
            <line x1={24 * scale} y1={32 * scale} x2={32 * scale} y2={40 * scale} />
            <line x1={32 * scale} y1={32 * scale} x2={24 * scale} y2={40 * scale} />
            <line x1={48 * scale} y1={32 * scale} x2={56 * scale} y2={40 * scale} />
            <line x1={56 * scale} y1={32 * scale} x2={48 * scale} y2={40 * scale} />
          </g>
          {/* Dead mouth */}
          <path
            d={`M ${32 * scale} ${52 * scale} L ${48 * scale} ${52 * scale}`}
            stroke="#ff003c"
            strokeWidth={2 * scale}
            strokeLinecap="round"
            strokeDasharray={`${4 * scale} ${2 * scale}`}
          />
        </>
      );

    case "excited":
      return (
        <>
          {/* Star eyes */}
          <polygon
            points={`${28 * scale},${32 * scale} ${30 * scale},${38 * scale} ${36 * scale},${38 * scale} ${31 * scale},${42 * scale} ${33 * scale},${48 * scale} ${28 * scale},${44 * scale} ${23 * scale},${48 * scale} ${25 * scale},${42 * scale} ${20 * scale},${38 * scale} ${26 * scale},${38 * scale}`}
            fill="#ffea00"
          />
          <polygon
            points={`${52 * scale},${32 * scale} ${54 * scale},${38 * scale} ${60 * scale},${38 * scale} ${55 * scale},${42 * scale} ${57 * scale},${48 * scale} ${52 * scale},${44 * scale} ${47 * scale},${48 * scale} ${49 * scale},${42 * scale} ${44 * scale},${38 * scale} ${50 * scale},${38 * scale}`}
            fill="#ffea00"
          />
          {/* Big smile */}
          <path
            d={`M ${28 * scale} ${52 * scale} Q ${40 * scale} ${64 * scale} ${52 * scale} ${52 * scale}`}
            stroke="#39ff14"
            strokeWidth={2.5 * scale}
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    default:
      return null;
  }
}

export function ApocMascot({
  expression = "happy",
  size = "md",
  className = "",
  animate = true,
  speech,
}: ApocMascotProps) {
  const pixelSize = SIZE_MAP[size];
  const scale = pixelSize / 80;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Speech bubble */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-foreground whitespace-nowrap z-10"
        >
          {speech}
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-border" />
          <div className="absolute bottom-[1px] left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-card" />
        </motion.div>
      )}

      <motion.svg
        width={pixelSize}
        height={pixelSize}
        viewBox={`0 0 ${pixelSize} ${pixelSize}`}
        animate={
          animate
            ? {
                y: [0, -4, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Robot body/head - rounded square */}
        <rect
          x={8 * scale}
          y={12 * scale}
          width={64 * scale}
          height={56 * scale}
          rx={8 * scale}
          fill="#262626"
          stroke="#39ff14"
          strokeWidth={2 * scale}
        />

        {/* Screen area - where the face displays */}
        <rect
          x={14 * scale}
          y={18 * scale}
          width={52 * scale}
          height={44 * scale}
          rx={4 * scale}
          fill="#0a0a0a"
          stroke="#171717"
          strokeWidth={1 * scale}
        />

        {/* Screen crack effect */}
        <path
          d={`M ${58 * scale} ${18 * scale} L ${50 * scale} ${32 * scale} L ${55 * scale} ${38 * scale} L ${48 * scale} ${52 * scale}`}
          stroke="#39ff14"
          strokeWidth={0.5 * scale}
          fill="none"
          opacity={0.3}
        />
        <path
          d={`M ${50 * scale} ${32 * scale} L ${60 * scale} ${30 * scale}`}
          stroke="#39ff14"
          strokeWidth={0.5 * scale}
          fill="none"
          opacity={0.3}
        />

        {/* Antenna */}
        <line
          x1={40 * scale}
          y1={12 * scale}
          x2={40 * scale}
          y2={4 * scale}
          stroke="#39ff14"
          strokeWidth={2 * scale}
          strokeLinecap="round"
        />
        <motion.circle
          cx={40 * scale}
          cy={3 * scale}
          r={3 * scale}
          fill={expression === "warning" ? "#ffea00" : expression === "dead" ? "#ff003c" : "#39ff14"}
          animate={
            animate && (expression === "warning" || expression === "excited")
              ? { opacity: [1, 0.4, 1] }
              : {}
          }
          transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* Side bolts/rivets */}
        <circle cx={10 * scale} cy={20 * scale} r={2 * scale} fill="#39ff14" opacity={0.6} />
        <circle cx={10 * scale} cy={60 * scale} r={2 * scale} fill="#39ff14" opacity={0.6} />
        <circle cx={70 * scale} cy={20 * scale} r={2 * scale} fill="#39ff14" opacity={0.6} />
        <circle cx={70 * scale} cy={60 * scale} r={2 * scale} fill="#39ff14" opacity={0.6} />

        {/* Little ear/speaker grilles */}
        <g opacity={0.4}>
          <line x1={4 * scale} y1={32 * scale} x2={8 * scale} y2={32 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
          <line x1={4 * scale} y1={36 * scale} x2={8 * scale} y2={36 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
          <line x1={4 * scale} y1={40 * scale} x2={8 * scale} y2={40 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
          <line x1={72 * scale} y1={32 * scale} x2={76 * scale} y2={32 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
          <line x1={72 * scale} y1={36 * scale} x2={76 * scale} y2={36 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
          <line x1={72 * scale} y1={40 * scale} x2={76 * scale} y2={40 * scale} stroke="#39ff14" strokeWidth={1 * scale} />
        </g>

        {/* Face based on expression */}
        {getFaceElements(expression, pixelSize)}

        {/* Scanlines overlay for CRT effect */}
        <defs>
          <pattern id={`scanlines-${size}`} patternUnits="userSpaceOnUse" width={4 * scale} height={4 * scale}>
            <line x1="0" y1="0" x2={4 * scale} y2="0" stroke="#000" strokeWidth={1 * scale} opacity={0.15} />
          </pattern>
        </defs>
        <rect
          x={14 * scale}
          y={18 * scale}
          width={52 * scale}
          height={44 * scale}
          rx={4 * scale}
          fill={`url(#scanlines-${size})`}
        />
      </motion.svg>

      {/* Optional glow effect for certain expressions */}
      {(expression === "warning" || expression === "excited") && animate && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: [
              `0 0 ${8 * scale}px ${expression === "warning" ? "rgba(255, 234, 0, 0.3)" : "rgba(57, 255, 20, 0.3)"}`,
              `0 0 ${16 * scale}px ${expression === "warning" ? "rgba(255, 234, 0, 0.5)" : "rgba(57, 255, 20, 0.5)"}`,
              `0 0 ${8 * scale}px ${expression === "warning" ? "rgba(255, 234, 0, 0.3)" : "rgba(57, 255, 20, 0.3)"}`,
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  );
}

// Preset mascots for common use cases
export function BunkerBuddyHappy(props: Omit<ApocMascotProps, "expression">) {
  return <ApocMascot expression="happy" {...props} />;
}

export function BunkerBuddyWarning(props: Omit<ApocMascotProps, "expression">) {
  return <ApocMascot expression="warning" {...props} />;
}

export function BunkerBuddySad(props: Omit<ApocMascotProps, "expression">) {
  return <ApocMascot expression="sad" {...props} />;
}

export function BunkerBuddyDead(props: Omit<ApocMascotProps, "expression">) {
  return <ApocMascot expression="dead" {...props} />;
}

export function BunkerBuddyExcited(props: Omit<ApocMascotProps, "expression">) {
  return <ApocMascot expression="excited" {...props} />;
}
