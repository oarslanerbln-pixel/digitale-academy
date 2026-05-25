import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Float, OrbitControls, Html, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Loader ─── */
function ModelLoader() {
  return (
    <Html center>
      <div className="hud-loader-container">
        <div className="hud-loader-spinner" />
        <span className="hud-data-text" style={{ fontSize: '0.75rem', marginTop: '12px' }}>
          BOOTING GIMBAL CORE...
        </span>
      </div>
    </Html>
  );
}

/* ─── 1. Drone Chassis Mount (Top Platform) ─── */
function ChassisMount() {
  return (
    <group position={[0, 1.5, 0]}>
      {/* Upper chassis mounting plate */}
      <mesh>
        <boxGeometry args={[1.3, 0.1, 1.3]} />
        <meshPhysicalMaterial
          color="#151312"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      {/* Circular connector ring */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#c5a073"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
      {/* Center connector shaft */}
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshPhysicalMaterial
          color="#2a2522"
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

/* ─── 2. Concentric Lens Glass Element ─── */
function LensGlass() {
  return (
    <mesh position={[0, 0, 0.49]} scale={[1, 1, 0.3]}>
      <sphereGeometry args={[0.26, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.3}
        chromaticAberration={0.25}
        anisotropy={0.2}
        distortion={0.1}
        distortionScale={0.1}
        temporalDistortion={0.05}
        transmission={1.0}
        roughness={0.02}
        color="#ffffff"
      />
    </mesh>
  );
}

/* ─── 3. Faint Scanning Laser Beam (REC Target Laser) ─── */
function LaserBeam() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Pulse the laser scale and opacity slightly to simulate scanning
    const pulse = 0.8 + Math.sin(t * 12) * 0.2;
    meshRef.current.scale.set(pulse, 1, pulse);
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = (0.28 + Math.sin(t * 8) * 0.08) * pulse;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 3.4]} rotation={[Math.PI / 2, 0, 0]}>
      {/* 6-unit long thin cylinder representing the laser beam */}
      <cylinderGeometry args={[0.005, 0.012, 6.0, 8]} />
      <meshBasicMaterial
        color="#ff1e46"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── 4. Dynamic Camera HUD Telemetry (Ref-based 60FPS updates) ─── */
interface CameraHUDProps {
  yawTextRef: React.RefObject<HTMLSpanElement>;
  pitchTextRef: React.RefObject<HTMLSpanElement>;
  isHovered: boolean;
}

function CameraHUD({ yawTextRef, pitchTextRef, isHovered }: CameraHUDProps) {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    // Technical date format
    const pad = (n: number) => n.toString().padStart(2, '0');
    const d = new Date();
    setDateStr(`${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`);
  }, []);

  return (
    <Html center pointerEvents="none">
      <div 
        className="hud-telemetry-container" 
        style={{ 
          position: 'relative',
          width: '320px',
          height: '320px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isHovered ? 0.95 : 0.3,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <style>{`
          .hud-viewfinder-bracket {
            position: absolute;
            width: 14px;
            height: 14px;
            border-color: rgba(197, 160, 115, 0.55);
            border-style: solid;
            pointer-events: none;
          }
          .hud-viewfinder-tl { top: 0; left: 0; border-width: 1.5px 0 0 1.5px; }
          .hud-viewfinder-tr { top: 0; right: 0; border-width: 1.5px 1.5px 0 0; }
          .hud-viewfinder-bl { bottom: 0; left: 0; border-width: 0 0 1.5px 1.5px; }
          .hud-viewfinder-br { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }
          .hud-tech-text {
            font-family: monospace;
            font-size: 7.5px;
            letter-spacing: 1px;
            color: #c5a073;
            text-shadow: 0 0 3px rgba(197, 160, 115, 0.4);
            line-height: 1.5;
          }
          .hud-pulse-rec {
            animation: hud-rec-blink 1.2s step-end infinite;
          }
          @keyframes hud-rec-blink {
            50% { opacity: 0.2; }
          }
        `}</style>

        {/* Viewfinder Target Border brackets */}
        <div style={{ position: 'absolute', width: '240px', height: '240px', pointerEvents: 'none' }}>
          <div className="hud-viewfinder-bracket hud-viewfinder-tl" />
          <div className="hud-viewfinder-bracket hud-viewfinder-tr" />
          <div className="hud-viewfinder-bracket hud-viewfinder-bl" />
          <div className="hud-viewfinder-bracket hud-viewfinder-br" />

          {/* Central tiny crosshair */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}>
            <div style={{ position: 'absolute', top: '2.5px', left: 0, width: '6px', height: '1px', backgroundColor: 'rgba(197,160,115,0.7)' }} />
            <div style={{ position: 'absolute', top: 0, left: '2.5px', width: '1px', height: '6px', backgroundColor: 'rgba(197,160,115,0.7)' }} />
          </div>
        </div>

        {/* Left Side: GIMBAL STATUS & ENCODER ANGLE READOUTS */}
        <div style={{
          position: 'absolute',
          left: '10px',
          top: '32px',
          textAlign: 'left'
        }} className="hud-tech-text">
          <span style={{ color: '#ff2b56' }} className="hud-pulse-rec">● REC</span> [ACTIVE]
          <br />
          SYS.MODE // MOT.TRACK
          <br />
          FPS.RATE // 60.0
        </div>

        <div style={{
          position: 'absolute',
          left: '10px',
          bottom: '32px',
          textAlign: 'left'
        }} className="hud-tech-text">
          <span ref={yawTextRef}>YAW: 0.0°</span>
          <br />
          <span ref={pitchTextRef}>PITCH: 0.0°</span>
          <br />
          ROLL: 0.0° (LOCK)
        </div>

        {/* Right Side: CAMERA SPECIFICATIONS */}
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '32px',
          textAlign: 'right'
        }} className="hud-tech-text">
          LENS.FOCAL // 35MM
          <br />
          APERTURE  // F/2.8
          <br />
          DATE.VAL  // {dateStr}
        </div>

        <div style={{
          position: 'absolute',
          right: '10px',
          bottom: '32px',
          textAlign: 'right'
        }} className="hud-tech-text">
          SHUTTER   // 1/120s
          <br />
          ISO.GAIN  // 320
          <br />
          FOCUS     // AUTO (3.42m)
        </div>
      </div>
    </Html>
  );
}

/* ─── 5. Floating Ambient Dust Particles ─── */
function AmbientDust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.025;
    ref.current.rotation.x = t * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#e5c185"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── 6. Motorized Drone Gimbal Assembly ─── */
interface DroneGimbalProps {
  yawTextRef: React.RefObject<HTMLSpanElement>;
  pitchTextRef: React.RefObject<HTMLSpanElement>;
  isHovered: boolean;
}

function DroneGimbal({ yawTextRef, pitchTextRef, isHovered }: DroneGimbalProps) {
  const yawGroupRef = useRef<THREE.Group>(null);
  const pitchGroupRef = useRef<THREE.Group>(null);

  // Mouse coordinate angle storage
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    let targetYaw = 0;
    let targetPitch = 0;

    if (isHovered) {
      // 1. yaw: pointer.x maps -1 to 1 -> Yaw target angle is around -45 to 45 deg (-0.78 to 0.78 rad)
      // 2. pitch: pointer.y maps -1 to 1 -> Pitch target angle is around -30 to 30 deg (-0.52 to 0.52 rad)
      targetYaw = state.pointer.x * 0.75;
      targetPitch = -state.pointer.y * 0.52; // Inverted vertical pitch
    } else {
      // Auto-scan mode (slow, smooth figure-8 sweep for mobile/idle)
      // Yaw sweeps slowly: sin(t * 0.35) * 0.45 (range: ~ -25 to +25 degrees)
      // Pitch sweeps slowly: cos(t * 0.22) * 0.22 (range: ~ -12 to +12 degrees)
      targetYaw = Math.sin(t * 0.35) * 0.45;
      targetPitch = Math.cos(t * 0.22) * 0.22;
    }

    // Slow and smooth hydraulic movement when scanning, slightly faster when tracking mouse
    const lerpSpeed = isHovered ? 6.0 : 1.5;
    currentYaw.current += (targetYaw - currentYaw.current) * lerpSpeed * delta;
    currentPitch.current += (targetPitch - currentPitch.current) * lerpSpeed * delta;

    // Apply rotations
    if (yawGroupRef.current) {
      yawGroupRef.current.rotation.y = currentYaw.current;
    }
    if (pitchGroupRef.current) {
      pitchGroupRef.current.rotation.x = currentPitch.current;
    }

    // Convert to degrees and update the HTML HUD text elements directly (60fps updates, 0 react re-renders)
    const yawDegrees = (currentYaw.current * 180) / Math.PI;
    const pitchDegrees = (currentPitch.current * 180) / Math.PI;

    if (yawTextRef.current) {
      yawTextRef.current.innerText = `YAW: ${yawDegrees.toFixed(1)}°`;
    }
    if (pitchTextRef.current) {
      pitchTextRef.current.innerText = `PITCH: ${pitchDegrees.toFixed(1)}°`;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* ─── ROTATION 1: YAW GROUP (Horizonal Swing) ─── */}
      <group ref={yawGroupRef}>
        
        {/* Top central swivel hub base */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.16, 24]} />
          <meshPhysicalMaterial
            color="#2a2522"
            roughness={0.2}
            metalness={0.9}
            clearcoat={1.0}
          />
        </mesh>
        
        {/* Outer Yoke Frame Bracket (U-Shape Support structure) */}
        {/* Horizontal crossbar below top connector */}
        <mesh position={[0, 0.96, 0]}>
          <boxGeometry args={[1.5, 0.12, 0.28]} />
          <meshPhysicalMaterial color="#1a1715" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Left vertical arm */}
        <mesh position={[-0.72, 0.36, 0]}>
          <boxGeometry args={[0.12, 1.2, 0.28]} />
          <meshPhysicalMaterial color="#1a1715" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Right vertical arm */}
        <mesh position={[0.72, 0.36, 0]}>
          <boxGeometry args={[0.12, 1.2, 0.28]} />
          <meshPhysicalMaterial color="#1a1715" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Left Motor joint cylinder */}
        <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
          <meshPhysicalMaterial color="#c5a073" roughness={0.1} metalness={0.98} />
        </mesh>
        {/* Right Motor joint cylinder */}
        <mesh position={[0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
          <meshPhysicalMaterial color="#c5a073" roughness={0.1} metalness={0.98} />
        </mesh>

        {/* ─── ROTATION 2: PITCH GROUP (Vertical Tilt) ─── */}
        {/* Suspended between the left/right motor joints */}
        <group ref={pitchGroupRef}>
          
          {/* Inner Yaw Bracket ring holding the camera */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.62, 0.05, 12, 48]} />
            <meshPhysicalMaterial color="#c5a073" roughness={0.08} metalness={0.98} />
          </mesh>

          {/* Camera housing body */}
          <group>
            {/* Cylindrical core body housing (Z-axis aligned) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.82, 32]} />
              <meshPhysicalMaterial
                color="#121110"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>

            {/* Back battery/port box cover */}
            <mesh position={[0, 0, -0.42]}>
              <boxGeometry args={[0.54, 0.54, 0.18]} />
              <meshPhysicalMaterial color="#1f1d1c" roughness={0.4} metalness={0.7} />
            </mesh>

            {/* Front primary lens barrel */}
            <mesh position={[0, 0, 0.42]}>
              <cylinderGeometry args={[0.34, 0.34, 0.12, 24]} />
              <meshPhysicalMaterial
                color="#c5a073"
                roughness={0.08}
                metalness={0.98}
              />
            </mesh>

            {/* Nested inner lens ring */}
            <mesh position={[0, 0, 0.48]}>
              <cylinderGeometry args={[0.29, 0.29, 0.06, 24]} />
              <meshPhysicalMaterial
                color="#201c19"
                roughness={0.05}
                metalness={0.98}
              />
            </mesh>

            {/* Inner CCD Sensor / Aperture Red glow */}
            <mesh position={[0, 0, 0.47]}>
              <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
              <meshBasicMaterial color="#ff113a" />
            </mesh>

            {/* Curved lens glass */}
            <LensGlass />

            {/* Recording LED indicators on camera sides */}
            <mesh position={[-0.4, 0.22, 0.1]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#ff003c" />
            </mesh>
            <mesh position={[0.4, 0.22, 0.1]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#ff003c" />
            </mesh>

            {/* Scanning Laser Beam */}
            <LaserBeam />

          </group>
        </group>
      </group>
    </group>
  );
}

/* ─── Export 3D Scene Canvas ─── */
interface Hero3DSceneProps {
  modelUrl?: string;
}

export default function Hero3DScene({ modelUrl: _modelUrl }: Hero3DSceneProps) {
  const [isHovered, setIsHovered] = useState(false);

  // References to dynamic HTML text nodes for 60fps text updates without React re-rendering
  const yawTextRef = useRef<HTMLSpanElement>(null);
  const pitchTextRef = useRef<HTMLSpanElement>(null);

  return (
    <div 
      className="hero-3d-scene-container" 
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0.2, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.35 }}
        dpr={[1, 1.5]}
      >

        {/* Ambient lighting */}
        <ambientLight intensity={0.35} />
        {/* Dynamic spotlights to cast shadows on bronze yokes */}
        <directionalLight position={[4, 5, 3]} intensity={1.6} color="#faf6f0" />
        <pointLight position={[-4, -3, -4]} intensity={0.4} color="#855b32" />
        <spotLight position={[0, 5, -2]} intensity={1.8} angle={0.5} penumbra={0.8} color="#e5c185" />
        <pointLight position={[3, -2, 2]} intensity={0.3} color="#c5a073" />

        <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.25}>
          <Center>
            <Suspense fallback={<ModelLoader />}>
              {/* Drone Chassis hanging mount */}
              <ChassisMount />

              {/* Motorized tracking Gimbal */}
              <DroneGimbal 
                yawTextRef={yawTextRef} 
                pitchTextRef={pitchTextRef} 
                isHovered={isHovered} 
              />
            </Suspense>
          </Center>
        </Float>

        {/* Telemetry Viewfinder Overlay */}
        <CameraHUD 
          yawTextRef={yawTextRef} 
          pitchTextRef={pitchTextRef} 
          isHovered={isHovered} 
        />

        {/* Ambient environment reflections */}
        <Environment preset="city" />

        {/* Ambient dust */}
        <AmbientDust />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
