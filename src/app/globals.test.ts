import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Regression: a mask-image on .text-stencil rendered the hero h1 fully
// transparent in Chromium (the inline SVG mask's feDisplacementMap filter has
// no second input, so the filtered rect paints nothing and masks out the text).
describe("globals.css .text-stencil", () => {
    it("does not mask the element it styles", () => {
        const css = readFileSync(resolve(__dirname, "globals.css"), "utf8");
        const rule = css.match(/\.text-stencil\s*\{[^}]*\}/);
        expect(rule).not.toBeNull();
        expect(rule?.[0]).not.toMatch(/mask/);
    });
});
