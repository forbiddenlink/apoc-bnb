"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
// 2D value-noise + fbm
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  vec2 p = uv*vec2(uResolution.x/uResolution.y,1.);
  float t = uTime*0.03;
  // drifting fog
  float fog = fbm(p*3.0 + vec2(t, -t*0.5));
  fog = smoothstep(0.2, 1.0, fog);
  // rising ash: sparse upward-drifting motes
  float ash = smoothstep(0.985, 1.0, noise(vec2(p.x*40.0, p.y*40.0 - uTime*0.4)));
  // horizon glow low on screen, green->gold
  float horizon = smoothstep(0.0, 0.45, uv.y);
  vec3 base = vec3(0.02,0.02,0.02);
  vec3 green = vec3(0.224,1.0,0.078);   // #39ff14
  vec3 gold  = vec3(0.831,0.686,0.216); // #d4af37
  vec3 glow = mix(gold, green, uv.x) * (1.0-horizon) * 0.14;
  vec3 col = base + glow + fog*0.05*green*0.5 + ash*green*0.6;
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.,1.); }`;

export function RadiationHazeCanvas({ className }: { className?: string }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const gl = canvas.getContext("webgl");
        if (!gl) {
            canvas.style.background =
                "radial-gradient(circle at 50% 100%, rgba(57,255,20,0.08), transparent 60%), #050505";
            return;
        }

        // compile program
        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        const uRes = gl.getUniformLocation(prog, "uResolution");
        const uTime = gl.getUniformLocation(prog, "uTime");

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        let raf = 0;
        let running = false;
        const start = performance.now();
        const frame = () => {
            gl.uniform1f(uTime, (performance.now() - start) / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = requestAnimationFrame(frame);
        };
        const play = () => {
            if (!running) {
                running = true;
                raf = requestAnimationFrame(frame);
            }
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        if (reduced) {
            gl.uniform1f(uTime, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        } else {
            const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : stop()), {
                threshold: 0,
            });
            io.observe(canvas);
            const onVis = () => (document.hidden ? stop() : play());
            document.addEventListener("visibilitychange", onVis);
            return () => {
                stop();
                io.disconnect();
                document.removeEventListener("visibilitychange", onVis);
                window.removeEventListener("resize", resize);
            };
        }
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* Cinematic background image layer (LCP element — preserved verbatim) */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <Image
                    src="/images/hero-bunker.png"
                    alt="Apocalyptic bunker background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    quality={100}
                />
            </div>
            {/* Dark vignette overlay to ensure text readability */}
            <div className="absolute inset-0 bg-background/60" />

            {/* GPU shader: drifting radiation haze + rising ash + horizon glow */}
            <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full" />
        </div>
    );
}
