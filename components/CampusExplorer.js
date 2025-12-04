import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useCursor } from '@react-three/drei';
import * as THREE from 'three';

// Building Data
const buildings = [
  { id: 'library', name: 'Central Library', position: [-2, 1, -2], color: '#3b82f6', description: '24/7 study spaces and vast digital archives.' },
  { id: 'science', name: 'Science Hub', position: [2, 1.5, -1], color: '#06b6d4', description: 'State-of-the-art labs and research facilities.' },
  { id: 'dorms', name: 'Student Housing', position: [-1.5, 1.2, 2], color: '#f97316', description: 'Modern living spaces with community centers.' },
  { id: 'center', name: 'Student Center', position: [1.5, 0.8, 2], color: '#8b5cf6', description: 'The heart of campus life and activities.' },
];

function Building({ data, onClick, isSelected }) {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group position={data.position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(data); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1.5, data.position[1] * 2, 1.5]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : data.color}
          emissive={isSelected || hovered ? data.color : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.2 : 0}
        />
      </mesh>
      {/* Windows effect */}
      <mesh position={[0, 0, 0.76]}>
        <planeGeometry args={[1.2, data.position[1] * 1.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Label */}
      {(hovered || isSelected) && (
        <Html position={[0, data.position[1] + 0.5, 0]} center distanceFactor={10}>
          <div className="px-3 py-1 bg-black/80 text-white text-xs rounded-full whitespace-nowrap border border-white/20 backdrop-blur-sm">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.6, 1.5, 8]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
    </group>
  );
}

function CampusScene({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (building) => {
    setSelected(building.id === selected?.id ? null : building);
    onSelect(building.id === selected?.id ? null : building);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <OrbitControls 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={20}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Grid */}
      <gridHelper args={[20, 20, '#374151', '#374151']} position={[0, 0.01, 0]} />

      {/* Buildings */}
      {buildings.map((b) => (
        <Building 
          key={b.id} 
          data={b} 
          onClick={handleSelect} 
          isSelected={selected?.id === b.id} 
        />
      ))}

      {/* Trees */}
      <Tree position={[-4, 0, -4]} />
      <Tree position={[4, 0, -4]} />
      <Tree position={[-4, 0, 4]} />
      <Tree position={[4, 0, 4]} />
      <Tree position={[0, 0, 0]} />
      <Tree position={[-3, 0, 1]} />
      <Tree position={[3, 0, -2]} />
    </>
  );
}

export default function CampusExplorer({ onClose }) {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <div className="anatomy-explorer">
      <div className="anatomy-header">
        <div className="anatomy-title">
          <h2>Campus Virtual Tour</h2>
          <p>Explore our digital twin campus • Click buildings for info</p>
        </div>
        <button className="anatomy-close" onClick={onClose}>✕</button>
      </div>

      <div className="anatomy-content">
        <div className="anatomy-canvas-wrapper">
          <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <CampusScene onSelect={setActiveInfo} />
            </Suspense>
          </Canvas>
        </div>

        <div className={`anatomy-info-panel ${activeInfo ? 'visible' : ''}`}>
          {activeInfo ? (
            <>
              <div 
                className="organ-color-indicator" 
                style={{ backgroundColor: activeInfo.color }}
              />
              <h3>{activeInfo.name}</h3>
              <p className="organ-description">{activeInfo.description}</p>
              <div className="organ-facts">
                <h4>Highlights</h4>
                <ul>
                  <li>Virtual Walkthrough Available</li>
                  <li>Real-time Occupancy Data</li>
                  <li>Event Schedule</li>
                </ul>
              </div>
              <button className="anatomy-cta mt-6 w-full">
                Enter Building
              </button>
            </>
          ) : (
            <div className="no-selection">
              <p>👆 Click on any building to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
