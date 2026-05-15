import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// =========================================================================
// PREMIUM 3D WIREFRAME GLOBE
// Smooth rotation + periodic "funk" glitch pulses on wireframe lines
// =========================================================================

/* ---------- helpers ---------- */

/** Generate points for a circle of latitude */
function latitudePoints(lat: number, segments = 96): Float32Array {
  const pts: number[] = [];
  const phi = (90 - lat) * (Math.PI / 180);
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    pts.push(x, y, z);
  }
  return new Float32Array(pts);
}

/** Generate points for a meridian of longitude */
function longitudePoints(lng: number, segments = 96): Float32Array {
  const pts: number[] = [];
  const theta = lng * (Math.PI / 180);
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    pts.push(x, y, z);
  }
  return new Float32Array(pts);
}

/* ---------- Shader material for glowing lines ---------- */

const vertexShader = `
  uniform float uTime;
  uniform float uFunkPhase;
  uniform float uFunkStrength;
  uniform float uLineIndex;
  
  attribute float aProgress;
  
  varying float vProgress;
  varying float vFunk;
  
  // Simple hash for pseudo-random per-line
  float hash(float n) {
    return fract(sin(n * 43758.5453123) * 43758.5453123);
  }
  
  void main() {
    vProgress = aProgress;
    
    // Funk displacement — wave that travels along the line (slower, premium)
    float funkWave = sin(aProgress * 8.0 + uTime * 1.5 + uLineIndex * 1.7) * 0.5 + 0.5;
    float funkPulse = uFunkStrength * funkWave;
    
    // Slight radial displacement during funk
    vec3 displaced = position * (1.0 + funkPulse * 0.08);
    
    vFunk = funkPulse;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uFunkStrength;
  uniform vec3 uBaseColor;
  uniform vec3 uFunkColor;
  uniform float uOpacity;
  
  varying float vProgress;
  varying float vFunk;
  
  void main() {
    // Base glow — subtle, slow breathing
    float breath = 0.5 + 0.5 * sin(uTime * 0.4 + vProgress * 6.28);
    float baseAlpha = uOpacity * (0.3 + 0.2 * breath);
    
    // Funk glow — bright pulse
    float funkAlpha = vFunk * 0.9;
    
    // Mix color
    vec3 color = mix(uBaseColor, uFunkColor, vFunk);
    float alpha = baseAlpha + funkAlpha;
    
    // Soft fade at line ends
    float edgeFade = smoothstep(0.0, 0.05, vProgress) * smoothstep(1.0, 0.95, vProgress);
    
    gl_FragColor = vec4(color, alpha * edgeFade);
  }
`;

/* ---------- Single wireframe line component ---------- */

interface WireLineProps {
  points: Float32Array;
  lineIndex: number;
  totalLines: number;
  colorMode?: 'cyan' | 'orange';
}

function WireLine({ points, lineIndex, totalLines, colorMode = 'cyan' }: WireLineProps) {
  const meshRef = useRef<THREE.Line>(null);
  const matRef = useRef<THREE.ShaderMaterial | null>(null!);
  const funkTimer = useRef(0);
  const funkActive = useRef(false);
  const nextFunkTime = useRef(Math.random() * 8 + 3);

  // Progress attribute for each vertex
  const progressAttr = useMemo(() => {
    const count = points.length / 3;
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = i / (count - 1);
    }
    return arr;
  }, [points]);

  // Determine base & funk colors
  const { baseColor, funkColor } = useMemo(() => {
    if (colorMode === 'orange') {
      // High-quality vibrant gold/orange (matches hero)
      const base = new THREE.Color('#f97316').multiplyScalar(0.8);
      const funk = new THREE.Color('#fdba74');
      return { baseColor: base, funkColor: funk };
    }
    // Warm Silver / Neutral (dim orange tint)
    const base = new THREE.Color('#e2e2e5').lerp(new THREE.Color('#f97316'), 0.1);
    const funk = new THREE.Color('#ffffff');
    return { baseColor: base, funkColor: funk };
  }, [lineIndex, totalLines, colorMode]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFunkPhase: { value: 0 },
      uFunkStrength: { value: 0 },
      uLineIndex: { value: lineIndex },
      uBaseColor: { value: baseColor },
      uFunkColor: { value: funkColor },
      uOpacity: { value: 0.45 },
    }),
    [lineIndex, baseColor, funkColor]
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const mat = matRef.current;
    mat.uniforms.uTime.value += delta;
    funkTimer.current += delta;

    // Trigger funk periodically
    if (!funkActive.current && funkTimer.current > nextFunkTime.current) {
      funkActive.current = true;
      funkTimer.current = 0;
    }

    if (funkActive.current) {
      // Premium smooth sine wave pulse over 3.0s
      const t = funkTimer.current;
      const duration = 3.0;
      const strength = Math.sin((t / duration) * Math.PI);
      
      mat.uniforms.uFunkStrength.value = strength;
      
      if (t > duration) {
        funkActive.current = false;
        funkTimer.current = 0;
        nextFunkTime.current = Math.random() * 8 + 4; // next funk in 4-12s
        mat.uniforms.uFunkStrength.value = 0;
      }
    }
  });

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    geo.setAttribute('aProgress', new THREE.BufferAttribute(progressAttr, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const l = new THREE.Line(geo, mat);
    return l;
  }, [points, progressAttr, uniforms]);

  // Keep matRef in sync
  useMemo(() => {
    matRef.current = lineObj.material as THREE.ShaderMaterial;
  }, [lineObj]);

  return <primitive ref={meshRef} object={lineObj} />;
}

/* ---------- Globe group ---------- */

function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate all latitude and longitude lines
  const lines = useMemo(() => {
    const result: { points: Float32Array; index: number; color: 'cyan' | 'orange' }[] = [];
    let idx = 0;

    // Latitudes: -75° to 75° every 12° (denser)
    for (let lat = -75; lat <= 75; lat += 12) {
      result.push({ points: latitudePoints(lat, 128), index: idx++, color: 'cyan' });
    }

    // Longitudes: every 12° (denser)
    for (let lng = 0; lng < 360; lng += 12) {
      result.push({ points: longitudePoints(lng, 128), index: idx++, color: 'cyan' });
    }

    // Orange accent latitudes (offset for detail)
    for (let lat = -66; lat <= 66; lat += 24) {
      result.push({ points: latitudePoints(lat, 128), index: idx++, color: 'orange' });
    }

    // Orange accent longitudes (offset for detail)
    for (let lng = 6; lng < 360; lng += 24) {
      result.push({ points: longitudePoints(lng, 128), index: idx++, color: 'orange' });
    }

    return result;
  }, []);

  // Smooth rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08; // slow smooth spin
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.05 + 0.3; // subtle tilt wobble
  });

  return (
    <group ref={groupRef} scale={[2.4, 2.4, 2.4]} position={[0, 0, 0]}>
      {lines.map((line) => (
        <WireLine
          key={line.index}
          points={line.points}
          lineIndex={line.index}
          totalLines={lines.length}
          colorMode={line.color}
        />
      ))}
    </group>
  );
}

/* ---------- Ambient particles around globe ---------- */

function GlobeParticles() {
  const ref = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const count = 300; // Increased count
    const pos = new Float32Array(count * 3);
    const opa = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on sphere surface with slight variance
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.4 + (Math.random() - 0.5) * 1.0; // wider distribution
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      opa[i] = Math.random() * 0.4 + 0.1;
    }
    return { positions: pos, opacities: opa };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#fdba74"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- Vertical Scanning Ring ---------- */

function ScanningRing() {
  const ref = useRef<THREE.Line>(null);
  const points = useMemo(() => latitudePoints(0, 128), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Move up and down between -0.8 and 0.8
    const y = Math.sin(t * 0.5) * 2.2;
    // Scale ring based on latitude to stay on sphere surface
    const radius = Math.sqrt(Math.max(0, 1 - Math.pow(y / 2.4, 2))) * 2.4;
    
    ref.current.position.y = y;
    ref.current.scale.set(radius / 2.4, 1, radius / 2.4);
    
    // Pulse opacity
    if (ref.current.material instanceof THREE.LineBasicMaterial) {
      ref.current.material.opacity = 0.2 + Math.abs(Math.sin(t * 2)) * 0.3;
    }
  });

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(geo, mat);
  }, [points]);

  return <primitive ref={ref} object={lineObj} />;
}

/* ---------- Main export ---------- */

export default function GlobeBackground() {
  const handleCreated = useCallback((state: any) => {
    state.gl.setClearColor('#000000', 0);
  }, []);

  return (
    <div className="globe-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        onCreated={handleCreated}
        style={{ background: 'transparent' }}
      >
        <Globe />
        <ScanningRing />
        <GlobeParticles />
      </Canvas>
    </div>
  );
}
