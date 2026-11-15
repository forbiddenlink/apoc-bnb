import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/bunker/BunkerDetailsContent", () => ({
    BunkerDetailsContent: () => null,
}));

import { mockBunkers } from "@/lib/data/bunkers";
import * as page from "./page";

describe("bunker detail page metadata and routing", () => {
    it("does not repeat the site name (layout title template adds it)", async () => {
        const meta = await page.generateMetadata({
            params: Promise.resolve({ id: mockBunkers[0].id }),
        });
        expect(meta.title).toBe(mockBunkers[0].title);
    });

    it("uses a bare title for unknown bunkers", async () => {
        const meta = await page.generateMetadata({
            params: Promise.resolve({ id: "zzz" }),
        });
        expect(meta.title).toBe("Bunker Not Found");
    });

    it("prerenders every bunker and 404s unknown slugs with a real status", async () => {
        expect(page.dynamicParams).toBe(false);
        const params = await page.generateStaticParams();
        expect(params).toEqual(mockBunkers.map((b) => ({ id: b.id })));
    });
});
