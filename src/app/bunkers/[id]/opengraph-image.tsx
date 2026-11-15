import { ImageResponse } from "next/og";
import { getBunkerById, mockBunkers } from "@/lib/data/bunkers";
import { holdVerdict, type HoldLevel } from "@/lib/hold-verdict";

export const alt = "APOC-BNB hold verdict";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same set as the pages: unknown ids 404 before this route is reached.
export const dynamicParams = false;

export function generateStaticParams() {
  return mockBunkers.map((bunker) => ({ id: bunker.id }));
}

const LEVEL_COLOR: Record<HoldLevel, string> = {
  holds: "#39ff14",
  caveats: "#d4af37",
  dubious: "#ff8c1a",
  fails: "#ff003c",
};

type Props = { params: Promise<{ id: string }> };

export default async function Image({ params }: Props) {
  const { id } = await params;
  const bunker = getBunkerById(id);
  const verdict = bunker ? holdVerdict(bunker.features) : null;
  const color = verdict ? LEVEL_COLOR[verdict.level] : "#39ff14";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#050505",
          backgroundImage: "radial-gradient(circle at 80% 20%, #152515 0%, #050505 60%)",
          color: "#ffffff",
          borderBottom: `12px solid ${color}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: "0.1em", color: "#888888" }}>
          <div style={{ display: "flex" }}>APOC-BNB</div>
          <div style={{ display: "flex" }}>WILL IT HOLD?</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 44, color: "#cccccc" }}>
            {bunker ? bunker.title : "Unlisted shelter"}
          </div>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 900, color, marginTop: 12 }}>
            {verdict ? verdict.headline : "Survival is Luxury"}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#999999", marginTop: 16 }}>
            {verdict ? verdict.note : "Premium bunker rentals for the post-apocalyptic elite"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {verdict?.checks.map((check) => (
            <div
              key={check.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: 20,
                border: `3px solid ${check.pass ? "#39ff14" : "#ff003c"}`,
              }}
            >
              <div style={{ display: "flex", fontSize: 26, color: "#888888" }}>{check.label}</div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>{check.value}</div>
              <div style={{ display: "flex", fontSize: 24, color: check.pass ? "#39ff14" : "#ff003c" }}>
                {check.pass ? "PASS" : "FAIL"}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
