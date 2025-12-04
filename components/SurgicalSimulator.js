import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useCursor, Text } from '@react-three/drei';
import * as THREE from 'three';

function IncisionPath({ points, onProgress }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [completed, setCompleted] = useState(new Set());

  const handleHover = (index) => {
    if (index === 0 || completed.has(index - 1)) {
      setHoveredIndex(index);
      const newCompleted = new Set(completed);
      newCompleted.add(index);
      setCompleted(newCompleted);
      onProgress((newCompleted.size / points.length) * 100);
    }
  };

  return (
    <group>
      {points.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          onPointerOver={() => handleHover(i)}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={completed.has(i) ? '#10b981' : '#ef4444'}
            emissive={completed.has(i) ? '#10b981' : '#ef4444'}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Connecting line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </line>
    </group>
  );
}

function SurgicalTool() {
  const ref = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (ref.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      ref.current.position.set(x, y, 1);
      ref.current.rotation.z = -Math.PI / 4;
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.05, 1.5]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <capsuleGeometry args={[0.06, 0.4]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}

function PatientModel() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      {/* Arm/Limb */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.8, 6, 16, 32]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.6} />
      </mesh>
      {/* Drapes */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0f766e" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function SimulationScene({ onProgress }) {
  // Generate a curved path
  const points = [];
  for (let i = -2; i <= 2; i += 0.5) {
    points.push([i, Math.sin(i) * 0.5, 0.85]);
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[0, 5, 2]} intensity={1} castShadow />
      
      <PatientModel />
      <IncisionPath points={points} onProgress={onProgress} />
      <SurgicalTool />
      
      <OrbitControls enableRotate={false} enableZoom={false} />
    </>
  );
}

export default function SurgicalSimulator({ onClose }) {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(100);

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setInterval(() => {
        setScore(s => Math.max(0, s - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [progress]);

  return (
    <div className="anatomy-explorer">
      <div className="anatomy-header">
        <div className="anatomy-title">
          <h2>Surgical Skills Simulator</h2>
          <p>AR Training Module • Follow the incision path</p>
        </div>
        <button className="anatomy-close" onClick={onClose}>✕</button>
      </div>

      <div className="anatomy-content">
        <div className="anatomy-canvas-wrapper cursor-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <SimulationScene onProgress={setProgress} />
          </Canvas>
          
          {/* Overlay UI */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
            <div className="mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400">Progress</span>
              <div className="w-48 h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-success-green transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400">Precision Score</span>
              <div className="text-2xl font-bold font-mono text-neon-cyan">{score}%</div>
            </div>
          </div>
        </div>

        <div className="anatomy-info-panel visible">
          <h3>Incision Training</h3>
          <p className="organ-description">
            Practice precise incision movements along the guided path. Maintain steady speed and follow the markers.
          </p>
          <div className="organ-facts">
            <h4>Module Stats</h4>
            <ul>
              <li>Target: Brachial Artery Access</li>
              <li>Difficulty: Intermediate</li>
              <li>Time Limit: 45s</li>
            </ul>
          </div>
          
          {progress === 100 && (
            <div className="mt-6 p-4 bg-success-green/20 border border-success-green/50 rounded-xl text-center">
              <p className="text-success-green font-bold text-lg mb-1">Procedure Complete!</p>
              <p className="text-sm text-white">Final Score: {score}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
