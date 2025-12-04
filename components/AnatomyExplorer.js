import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

// Organ data with descriptions
const organData = {
  brain: {
    name: "Brain",
    description: "The control center of the nervous system, responsible for thoughts, memory, and motor functions.",
    facts: ["Contains ~86 billion neurons", "Uses 20% of body's energy", "Weighs about 1.4 kg"],
    color: "#ff6b9d"
  },
  heart: {
    name: "Heart",
    description: "A muscular organ that pumps blood throughout the body via the circulatory system.",
    facts: ["Beats ~100,000 times/day", "Pumps ~7,500L of blood daily", "Size of your fist"],
    color: "#ef4444"
  },
  lungs: {
    name: "Lungs",
    description: "Paired organs responsible for gas exchange - bringing oxygen in and expelling carbon dioxide.",
    facts: ["Surface area = tennis court", "Take ~20,000 breaths/day", "Right lung is larger"],
    color: "#f472b6"
  },
  liver: {
    name: "Liver",
    description: "The largest internal organ, essential for metabolism, detoxification, and bile production.",
    facts: ["500+ vital functions", "Can regenerate itself", "Weighs about 1.5 kg"],
    color: "#b45309"
  },
  kidneys: {
    name: "Kidneys",
    description: "Filter blood, remove waste, balance fluids, and produce urine.",
    facts: ["Filter 200L of blood daily", "Produce 1-2L of urine", "Each contains 1M nephrons"],
    color: "#7c3aed"
  },
  stomach: {
    name: "Stomach",
    description: "A muscular organ that breaks down food using acids and enzymes for digestion.",
    facts: ["Holds up to 1.5L", "Produces 2L acid daily", "Lining renews every 3-4 days"],
    color: "#f59e0b"
  },
  skeleton: {
    name: "Skeletal System",
    description: "The framework of bones and connective tissue providing structure and protection.",
    facts: ["206 bones in adults", "Produces blood cells", "Supports and protects organs"],
    color: "#e5e5e5"
  }
};

// Animated pulsing heart
function Heart({ position, onClick, isSelected, isVisible }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && isVisible) {
      // Pulsing animation
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      meshRef.current.scale.setScalar(pulse * (hovered ? 1.15 : 1));
    }
  });

  if (!isVisible) return null;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick('heart'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? "#ff0000" : organData.heart.color}
          emissive={hovered || isSelected ? "#ff0000" : "#330000"}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.3}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {/* Aorta */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Brain with wrinkled surface effect
function Brain({ position, onClick, isSelected, isVisible }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (!isVisible) return null;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick('brain'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? "#ff88bb" : organData.brain.color}
          emissive={hovered || isSelected ? "#ff6b9d" : "#220011"}
          emissiveIntensity={hovered || isSelected ? 0.6 : 0.2}
          roughness={0.7}
          metalness={0}
        />
      </mesh>
      {/* Brain stem */}
      <mesh position={[0, -0.5, 0.1]}>
        <cylinderGeometry args={[0.12, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="#cc5588" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Lungs (pair)
function Lungs({ position, onClick, isSelected, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      // Breathing animation
      const breath = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      groupRef.current.scale.set(breath, breath, breath);
    }
  });

  if (!isVisible) return null;

  const lungMaterial = (
    <meshStandardMaterial
      color={isSelected ? "#ff99cc" : organData.lungs.color}
      emissive={hovered || isSelected ? "#ff6699" : "#110011"}
      emissiveIntensity={hovered || isSelected ? 0.5 : 0.15}
      roughness={0.5}
      metalness={0}
    />
  );

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick('lungs'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Left lung */}
      <mesh position={[-0.5, 0, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 8, 16]} />
        {lungMaterial}
      </mesh>
      {/* Right lung (slightly larger) */}
      <mesh position={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.32, 0.75, 8, 16]} />
        {lungMaterial}
      </mesh>
    </group>
  );
}

// Liver
function Liver({ position, onClick, isSelected, isVisible }) {
  const [hovered, setHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <mesh
      position={position}
      rotation={[0, 0, -0.3]}
      onClick={(e) => { e.stopPropagation(); onClick('liver'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <capsuleGeometry args={[0.35, 0.5, 8, 16]} />
      <meshStandardMaterial
        color={isSelected ? "#d97706" : organData.liver.color}
        emissive={hovered || isSelected ? "#b45309" : "#110500"}
        emissiveIntensity={hovered || isSelected ? 0.5 : 0.15}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

// Kidneys
function Kidneys({ position, onClick, isSelected, isVisible }) {
  const [hovered, setHovered] = useState(false);

  if (!isVisible) return null;

  const kidneyMaterial = (
    <meshStandardMaterial
      color={isSelected ? "#9333ea" : organData.kidneys.color}
      emissive={hovered || isSelected ? "#7c3aed" : "#110022"}
      emissiveIntensity={hovered || isSelected ? 0.6 : 0.2}
      roughness={0.4}
      metalness={0.1}
    />
  );

  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick('kidneys'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Left kidney */}
      <mesh position={[-0.6, 0, 0.1]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
        {kidneyMaterial}
      </mesh>
      {/* Right kidney */}
      <mesh position={[0.6, 0, 0.1]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
        {kidneyMaterial}
      </mesh>
    </group>
  );
}

// Stomach
function Stomach({ position, onClick, isSelected, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      // Subtle movement
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  if (!isVisible) return null;

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0.3, 0.2, 0.5]}
      onClick={(e) => { e.stopPropagation(); onClick('stomach'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
      <meshStandardMaterial
        color={isSelected ? "#fbbf24" : organData.stomach.color}
        emissive={hovered || isSelected ? "#f59e0b" : "#110800"}
        emissiveIntensity={hovered || isSelected ? 0.5 : 0.15}
        roughness={0.5}
        metalness={0}
      />
    </mesh>
  );
}

// Skeleton
function Skeleton({ onClick, isSelected, isVisible }) {
  const [hovered, setHovered] = useState(false);

  if (!isVisible) return null;

  const boneMaterial = (
    <meshStandardMaterial
      color={isSelected ? "#ffffff" : organData.skeleton.color}
      emissive={hovered || isSelected ? "#aaaaaa" : "#111111"}
      emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
      roughness={0.3}
      metalness={0.2}
    />
  );

  return (
    <group
      onClick={(e) => { e.stopPropagation(); onClick('skeleton'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Spine */}
      <mesh position={[0, 0.5, 0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5, 8]} />
        {boneMaterial}
      </mesh>
      {/* Skull */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        {boneMaterial}
      </mesh>
      {/* Ribs (simplified) */}
      {[-0.15, 0.05, 0.25, 0.45].map((y, i) => (
        <group key={i} position={[0, 0.9 + y, 0]}>
          <mesh position={[-0.35, 0, 0.15]} rotation={[0, 0, 0.8]}>
            <capsuleGeometry args={[0.03, 0.4, 4, 8]} />
            {boneMaterial}
          </mesh>
          <mesh position={[0.35, 0, 0.15]} rotation={[0, 0, -0.8]}>
            <capsuleGeometry args={[0.03, 0.4, 4, 8]} />
            {boneMaterial}
          </mesh>
        </group>
      ))}
      {/* Pelvis */}
      <mesh position={[0, -0.8, 0.1]}>
        <torusGeometry args={[0.35, 0.08, 8, 16, Math.PI]} />
        {boneMaterial}
      </mesh>
      {/* Legs (upper) */}
      <mesh position={[-0.25, -1.5, 0]} rotation={[0.1, 0, 0.1]}>
        <cylinderGeometry args={[0.06, 0.05, 1, 8]} />
        {boneMaterial}
      </mesh>
      <mesh position={[0.25, -1.5, 0]} rotation={[0.1, 0, -0.1]}>
        <cylinderGeometry args={[0.06, 0.05, 1, 8]} />
        {boneMaterial}
      </mesh>
      {/* Arms (upper) */}
      <mesh position={[-0.65, 1.3, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.04, 0.035, 0.7, 8]} />
        {boneMaterial}
      </mesh>
      <mesh position={[0.65, 1.3, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.04, 0.035, 0.7, 8]} />
        {boneMaterial}
      </mesh>
    </group>
  );
}

// Body outline (transparent skin)
function BodyOutline({ visible }) {
  if (!visible) return null;

  return (
    <group>
      {/* Torso */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.6, 1.5, 16, 32]} />
        <meshStandardMaterial
          color="#ffdbac"
          transparent
          opacity={0.15}
          roughness={0.8}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#ffdbac"
          transparent
          opacity={0.15}
          roughness={0.8}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Main Anatomy Scene
function AnatomyScene({ selectedOrgan, setSelectedOrgan, visibleLayers }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.6} penumbra={0.5} color="#ffffff" />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={!selectedOrgan}
        autoRotateSpeed={0.5}
      />

      {/* Body outline */}
      <BodyOutline visible={visibleLayers.skin} />

      {/* Skeleton */}
      <Skeleton
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'skeleton'}
        isVisible={visibleLayers.skeleton}
      />

      {/* Organs */}
      <Brain
        position={[0, 1.85, 0]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'brain'}
        isVisible={visibleLayers.organs}
      />
      <Heart
        position={[0.15, 0.9, 0]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'heart'}
        isVisible={visibleLayers.organs}
      />
      <Lungs
        position={[0, 0.8, 0]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'lungs'}
        isVisible={visibleLayers.organs}
      />
      <Liver
        position={[0.4, 0.2, 0]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'liver'}
        isVisible={visibleLayers.organs}
      />
      <Stomach
        position={[-0.3, 0.1, 0.1]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'stomach'}
        isVisible={visibleLayers.organs}
      />
      <Kidneys
        position={[0, -0.2, 0]}
        onClick={setSelectedOrgan}
        isSelected={selectedOrgan === 'kidneys'}
        isVisible={visibleLayers.organs}
      />

      {/* Grid floor */}
      <gridHelper args={[10, 20, '#333', '#222']} position={[0, -2.5, 0]} />
    </>
  );
}

// Loading fallback
function LoadingScreen() {
  return (
    <div className="anatomy-loading">
      <div className="anatomy-spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
  );
}

// Main component
export default function AnatomyExplorer({ onClose }) {
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [visibleLayers, setVisibleLayers] = useState({
    skin: true,
    skeleton: true,
    organs: true,
  });

  const toggleLayer = (layer) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleOrganClick = (organ) => {
    setSelectedOrgan(organ === selectedOrgan ? null : organ);
  };

  const selectedOrganInfo = selectedOrgan ? organData[selectedOrgan] : null;

  return (
    <div className="anatomy-explorer">
      {/* Header */}
      <div className="anatomy-header">
        <div className="anatomy-title">
          <h2>Medical Anatomy Explorer</h2>
          <p>Click on organs to learn more • Drag to rotate • Scroll to zoom</p>
        </div>
        <button className="anatomy-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className="anatomy-content">
        {/* 3D Canvas */}
        <div className="anatomy-canvas-wrapper">
          <Canvas
            camera={{ position: [0, 1, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <AnatomyScene
                selectedOrgan={selectedOrgan}
                setSelectedOrgan={handleOrganClick}
                visibleLayers={visibleLayers}
              />
            </Suspense>
          </Canvas>

          {/* Layer Controls */}
          <div className="anatomy-layer-controls">
            <p className="controls-label">Layers</p>
            <button
              className={`layer-btn ${visibleLayers.skin ? 'active' : ''}`}
              onClick={() => toggleLayer('skin')}
            >
              <span className="layer-icon">👤</span>
              <span>Skin</span>
            </button>
            <button
              className={`layer-btn ${visibleLayers.skeleton ? 'active' : ''}`}
              onClick={() => toggleLayer('skeleton')}
            >
              <span className="layer-icon">🦴</span>
              <span>Skeleton</span>
            </button>
            <button
              className={`layer-btn ${visibleLayers.organs ? 'active' : ''}`}
              onClick={() => toggleLayer('organs')}
            >
              <span className="layer-icon">❤️</span>
              <span>Organs</span>
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className={`anatomy-info-panel ${selectedOrganInfo ? 'visible' : ''}`}>
          {selectedOrganInfo ? (
            <>
              <div 
                className="organ-color-indicator" 
                style={{ backgroundColor: selectedOrganInfo.color }}
              />
              <h3>{selectedOrganInfo.name}</h3>
              <p className="organ-description">{selectedOrganInfo.description}</p>
              <div className="organ-facts">
                <h4>Key Facts</h4>
                <ul>
                  {selectedOrganInfo.facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>👆 Click on any organ to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="anatomy-footer">
        <div className="anatomy-features">
          <span>✨ Interactive 3D</span>
          <span>🔬 Layer Dissection</span>
          <span>📚 Educational Content</span>
          <span>🎓 VR Ready</span>
        </div>
        <button className="anatomy-cta">
          Request Full Demo
        </button>
      </div>
    </div>
  );
}
