import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

const MAX_COLORS = 8;

const frag = `#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;

  vec2 rp = vec2(
      p.x * uRot.x - p.y * uRot.y,
      p.x * uRot.y + p.y * uRot.x
  );

  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;

  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;

    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;

      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);

      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);

      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;

      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);

      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }

    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;

  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);

      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);

      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;

      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);

      col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function ColorBends({
  className,
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const rafRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);

  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));
  const pointerSmoothRef = useRef(8);

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise }
      },
      premultipliedAlpha: true,
      transparent: true
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });

    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      renderer.setSize(w, h);
      material.uniforms.uCanvas.value.set(w, h);
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    resizeObserverRef.current = ro;

    // Animation loop
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      const deg = rotationRef.current + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));

      const cur = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      cur.lerp(target, 0.08);
      material.uniforms.uPointer.value.copy(cur);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // React to props changes
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;

    const toVec3 = hex => {
      const h = hex.replace('#', '');
      return new THREE.Vector3(
        parseInt(h.substring(0, 2), 16) / 255,
        parseInt(h.substring(2, 4), 16) / 255,
        parseInt(h.substring(4, 6), 16) / 255
      );
    };

    // Update color uniforms
    const arr = colors.map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      if (arr[i]) mat.uniforms.uColors.value[i].copy(arr[i]);
      else mat.uniforms.uColors.value[i].set(0, 0, 0);
    }

    mat.uniforms.uColorCount.value = arr.length;
    mat.uniforms.uTransparent.value = transparent ? 1 : 0;

    mat.uniforms.uSpeed.value = speed;
    mat.uniforms.uScale.value = scale;
    mat.uniforms.uFrequency.value = frequency;
    mat.uniforms.uWarpStrength.value = warpStrength;
    mat.uniforms.uMouseInfluence.value = mouseInfluence;
    mat.uniforms.uParallax.value = parallax;
    mat.uniforms.uNoise.value = noise;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
  }, [
    colors,
    transparent,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    rotation,
    autoRotate
  ]);

  // Pointer move handling
  useEffect(() => {
    const container = containerRef.current;
    const handle = e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };
    container.addEventListener('pointermove', handle);
    return () => container.removeEventListener('pointermove', handle);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className || ""}`}
      style={style}
    />
  );
}
