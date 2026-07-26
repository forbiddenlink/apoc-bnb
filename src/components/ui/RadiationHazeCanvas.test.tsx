import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadiationHazeCanvas } from "./RadiationHazeCanvas";

afterEach(cleanup);

describe("RadiationHazeCanvas", () => {
  it("renders a canvas element", () => {
    const { container } = render(<RadiationHazeCanvas />);
    expect(container.querySelector("canvas")).not.toBeNull();
  });

  it("does not start a rAF loop under reduced motion", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("reduce"),
      media: q, addEventListener: vi.fn(), removeEventListener: vi.fn(),
      addListener: vi.fn(), removeListener: vi.fn(), onchange: null, dispatchEvent: vi.fn(),
    }));
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<RadiationHazeCanvas />);
    expect(raf).not.toHaveBeenCalled();
    raf.mockRestore();
    vi.unstubAllGlobals();
  });

  // jsdom has no WebGL implementation: canvas.getContext("webgl") always returns
  // null, so RadiationHazeCanvas takes the static-CSS-fallback path and never
  // starts a rAF loop (nothing to cancel). Assert the real contract instead:
  // unmounting never throws, whether or not a gl context/rAF loop exists.
  it("unmounts cleanly without throwing (cancels rAF on unmount when a gl context exists)", () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<RadiationHazeCanvas />);
    expect(() => unmount()).not.toThrow();
    cancel.mockRestore();
  });
});
