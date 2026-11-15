import { describe, expect, it } from "vitest";
import { mockBunkers } from "@/lib/data/bunkers";
import { generateMetadata } from "./page";

describe("bunker page metadata", () => {
    it("does not repeat the site name (layout template already appends it)", async () => {
        const bunker = mockBunkers[0];
        const meta = await generateMetadata({ params: Promise.resolve({ id: bunker.id }) });
        expect(meta.title).toBe(bunker.title);
        expect((meta.twitter as { title?: string }).title).toBe(bunker.title);
    });

    it("throws notFound for unknown ids so the response status is 404", async () => {
        await expect(
            generateMetadata({ params: Promise.resolve({ id: "zzz" }) }),
        ).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
    });
});
