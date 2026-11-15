// @vitest-environment node
import { describe, expect, it } from "vitest";
import { mockBunkers } from "@/lib/data/bunkers";
import * as page from "./page";
import Image, { alt, contentType, size } from "./opengraph-image";

describe("bunker verdict share card", () => {
  it("renders a PNG for every bunker", async () => {
    for (const bunker of mockBunkers) {
      const res = await Image({ params: Promise.resolve({ id: bunker.id }) });
      expect(res.headers.get("content-type")).toBe("image/png");
      const bytes = new Uint8Array(await res.arrayBuffer());
      // PNG magic number, and not an empty render.
      expect(Array.from(bytes.slice(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
      expect(bytes.length).toBeGreaterThan(2000);
    }
  }, 60_000);

  it("declares the standard 1200x630 card", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toBeTruthy();
  });

  it("falls back to a generic card for an unknown id instead of throwing", async () => {
    const res = await Image({ params: Promise.resolve({ id: "zzz" }) });
    expect(res.headers.get("content-type")).toBe("image/png");
  }, 30_000);

  it("lets the generated card be the share image (page must not override it)", async () => {
    const meta = await page.generateMetadata({
      params: Promise.resolve({ id: mockBunkers[0].id }),
    });
    expect(meta.openGraph).not.toHaveProperty("images");
    expect(meta.twitter).not.toHaveProperty("images");
  });
});
