import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadiationHazeCanvas } from "./RadiationHazeCanvas";

afterEach(cleanup);

// jsdom has no WebGL implementation: canvas.getContext("webgl") always returns
// null unless we stub it. To exercise the real animating path (rAF start/stop,
// IntersectionObserver gating) we provide a minimal fake WebGLRenderingContext
// whose methods are no-ops — enough for RadiationHazeCanvas's setup code to run
// without throwing.
function createMockGL() {
  return {
    createShader: vi.fn(() => ({})),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    createProgram: vi.fn(() => ({})),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    useProgram: vi.fn(),
    createBuffer: vi.fn(() => ({})),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    getAttribLocation: vi.fn(() => 0),
    enableVertexAttribArray: vi.fn(),
    vertexAttribPointer: vi.fn(),
    getUniformLocation: vi.fn(() => ({})),
    uniform2f: vi.fn(),
    uniform1f: vi.fn(),
    viewport: vi.fn(),
    drawArrays: vi.fn(),
    VERTEX_SHADER: 35633,
    FRAGMENT_SHADER: 35632,
    ARRAY_BUFFER: 34962,
    STATIC_DRAW: 35044,
    FLOAT: 5126,
    TRIANGLES: 4,
  } as unknown as WebGLRenderingContext;
}

type IOCallback = (entries: Pick<IntersectionObserverEntry, "isIntersecting">[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IOCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
  constructor(callback: IOCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
}

function stubIntersectionObserver() {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
}

function stubReducedMotion(reduced: boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduced && q.includes("reduce"),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
}

describe("RadiationHazeCanvas", () => {
  it("renders a canvas element", () => {
    const { container } = render(<RadiationHazeCanvas />);
    expect(container.querySelector("canvas")).not.toBeNull();
  });

  it("does not start a rAF loop under reduced motion (no gl context — jsdom fallback path)", () => {
    stubReducedMotion(true);
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<RadiationHazeCanvas />);
    expect(raf).not.toHaveBeenCalled();
    raf.mockRestore();
    vi.unstubAllGlobals();
  });

  // jsdom's real getContext("webgl") returns null, so this covers the
  // WebGL-unsupported fallback path: no rAF loop was ever started, so there's
  // nothing to cancel — the contract to verify here is that unmount is safe.
  it("unmounts cleanly without throwing when no gl context is available (fallback path)", () => {
    const { unmount } = render(<RadiationHazeCanvas />);
    expect(() => unmount()).not.toThrow();
  });

  describe("with a mocked WebGL context (animating path)", () => {
    it("does not start a rAF loop under reduced motion even when a real gl context is available", () => {
      const getContextSpy = vi
        .spyOn(HTMLCanvasElement.prototype, "getContext")
        .mockReturnValue(createMockGL());
      stubReducedMotion(true);
      const raf = vi.spyOn(window, "requestAnimationFrame");

      render(<RadiationHazeCanvas />);

      expect(raf).not.toHaveBeenCalled();

      raf.mockRestore();
      getContextSpy.mockRestore();
      vi.unstubAllGlobals();
    });

    it("starts a rAF loop only once IntersectionObserver reports intersecting, and cancels it on unmount", () => {
      const getContextSpy = vi
        .spyOn(HTMLCanvasElement.prototype, "getContext")
        .mockReturnValue(createMockGL());
      stubReducedMotion(false);
      stubIntersectionObserver();
      const raf = vi.spyOn(window, "requestAnimationFrame");
      const cancel = vi.spyOn(window, "cancelAnimationFrame");

      const { unmount } = render(<RadiationHazeCanvas />);

      // Not intersecting yet — no rAF should have started.
      expect(raf).not.toHaveBeenCalled();

      const io = MockIntersectionObserver.instances.at(-1)!;
      io.callback([{ isIntersecting: true }]);
      expect(raf).toHaveBeenCalled();

      unmount();
      expect(cancel).toHaveBeenCalled();

      raf.mockRestore();
      cancel.mockRestore();
      getContextSpy.mockRestore();
      vi.unstubAllGlobals();
    });

    it("does not resume the rAF loop on visibilitychange while scrolled offscreen", () => {
      const getContextSpy = vi
        .spyOn(HTMLCanvasElement.prototype, "getContext")
        .mockReturnValue(createMockGL());
      stubReducedMotion(false);
      stubIntersectionObserver();
      const raf = vi.spyOn(window, "requestAnimationFrame");

      render(<RadiationHazeCanvas />);

      // Canvas is offscreen — IntersectionObserver never reports intersecting.
      const io = MockIntersectionObserver.instances.at(-1)!;
      io.callback([{ isIntersecting: false }]);

      // Simulate tab losing then regaining focus while still offscreen.
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
      document.dispatchEvent(new Event("visibilitychange"));

      expect(raf).not.toHaveBeenCalled();

      raf.mockRestore();
      getContextSpy.mockRestore();
      vi.unstubAllGlobals();
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
    });
  });
});
