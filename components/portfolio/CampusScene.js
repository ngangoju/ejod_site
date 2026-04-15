import React, { useRef, useState, Suspense, useCallback, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useCursor, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useQualitySettings } from './QualityContext';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getFacadeLayout(facadeWidth, facadeHeight) {
  const paddingX = clamp(facadeWidth * 0.14, 0.16, 0.36);
  const paddingTop = clamp(facadeHeight * 0.12, 0.18, 0.42);
  const paddingBottom = clamp(facadeHeight * 0.14, 0.18, 0.38);
  const usableWidth = Math.max(0.7, facadeWidth - paddingX * 2);
  const usableHeight = Math.max(0.8, facadeHeight - paddingTop - paddingBottom);

  const windowWidth = clamp(usableWidth / 4.8, 0.24, 0.38);
  const windowHeight = clamp(usableHeight / 4.2, 0.32, 0.52);
  const gapX = clamp(windowWidth * 0.45, 0.12, 0.24);
  const gapY = clamp(windowHeight * 0.45, 0.12, 0.24);

  const columns = Math.max(1, Math.floor((usableWidth + gapX) / (windowWidth + gapX)));
  const rows = Math.max(1, Math.floor((usableHeight + gapY) / (windowHeight + gapY)));

  const totalWindowWidth = columns * windowWidth + Math.max(0, columns - 1) * gapX;
  const totalWindowHeight = rows * windowHeight + Math.max(0, rows - 1) * gapY;

  const startX = -totalWindowWidth / 2 + windowWidth / 2;
  const startY = totalWindowHeight / 2 - windowHeight / 2;

  const windows = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      windows.push({
        x: startX + col * (windowWidth + gapX),
        y: startY - row * (windowHeight + gapY),
      });
    }
  }

  return {
    windowWidth,
    windowHeight,
    windows,
    panelWidth: usableWidth + 0.22,
    panelHeight: usableHeight + 0.28,
  };
}

function FacadeWall({ width, height, depth, baseColor, trimColor, accentColor, rotation = [0, 0, 0] }) {
  const layout = useMemo(() => getFacadeLayout(width, height), [width, height]);

  return (
    <group rotation={rotation}>
      <mesh position={[0, 0, depth / 2 + 0.012]} castShadow receiveShadow>
        <boxGeometry args={[layout.panelWidth, layout.panelHeight, 0.05]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.08} />
      </mesh>

      {layout.windows.map(({ x, y }, index) => (
        <group key={index} position={[x, y, 0]}>
          <mesh position={[0, 0, depth / 2 + 0.018]} castShadow receiveShadow>
            <boxGeometry args={[layout.windowWidth + 0.08, layout.windowHeight + 0.08, 0.05]} />
            <meshStandardMaterial color={trimColor} roughness={0.65} metalness={0.1} />
          </mesh>

          <mesh position={[0, 0, depth / 2 - 0.04]} receiveShadow>
            <boxGeometry args={[layout.windowWidth, layout.windowHeight, 0.12]} />
            <meshStandardMaterial color="#121c2d" roughness={0.92} metalness={0} />
          </mesh>

          <mesh position={[0, 0, depth / 2 + 0.048]}>
            <boxGeometry args={[layout.windowWidth - 0.03, layout.windowHeight - 0.03, 0.015]} />
            <meshPhysicalMaterial
              color="#a7d7f5"
              emissive={accentColor}
              emissiveIntensity={0.08}
              roughness={0.08}
              metalness={0.12}
              transmission={0.15}
              transparent
              opacity={0.78}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────
// BUILDING DATA
// ──────────────────────────────────────────────
const buildings = [
  {
    id: 'library',
    name: 'Central Library',
    position: [-3, 0, -3],
    height: 2.4,
    width: 2.2,
    depth: 1.8,
    color: '#3b82f6',
    roofColor: '#2563eb',
    description: '24/7 study spaces and vast digital archives.',
    programs: ['Computer Science', 'Digital Media', 'Data Science'],
    interior: {
      features: ['3 floors of study spaces', 'Digital media lab', 'Rare books collection', 'Group study rooms'],
      capacity: '500 students',
      hours: '24/7 during term',
    },
    cameraTarget: [-3, 1.2, -3],
    cameraPosition: [-1, 3, 0],
    tourOrder: 1,
    tourNarration: 'Welcome to the Central Library — our academic heart with 24/7 study spaces and cutting-edge digital resources.',
  },
  {
    id: 'science',
    name: 'Science Hub',
    position: [3, 0, -2],
    height: 3.2,
    width: 2,
    depth: 2,
    color: '#06b6d4',
    roofColor: '#0891b2',
    description: 'State-of-the-art labs and research facilities.',
    programs: ['Chemistry', 'Physics', 'Biology', 'Robotics'],
    interior: {
      features: ['Chemistry labs', 'Physics research center', 'Biology specimens', 'Robotics workshop'],
      capacity: '300 students',
      hours: '7AM - 10PM',
    },
    cameraTarget: [3, 1.6, -2],
    cameraPosition: [5, 4, 1],
    tourOrder: 2,
    tourNarration: 'The Science Hub houses our most advanced research facilities, including a state-of-the-art robotics workshop.',
  },
  {
    id: 'dorms',
    name: 'Student Housing',
    position: [-2, 0, 3],
    height: 2.8,
    width: 3,
    depth: 1.6,
    color: '#f97316',
    roofColor: '#ff6b35',
    description: 'Modern living spaces with community centers.',
    programs: ['Residential Life', 'Community Programs'],
    interior: {
      features: ['Single & double rooms', 'Common lounges', 'Laundry facilities', 'Fitness center'],
      capacity: '800 residents',
      hours: '24/7 access',
    },
    cameraTarget: [-2, 1.4, 3],
    cameraPosition: [0, 3, 6],
    tourOrder: 4,
    tourNarration: 'Our Student Housing offers modern living with a built-in fitness center and vibrant community spaces.',
  },
  {
    id: 'center',
    name: 'Student Center',
    position: [2.5, 0, 3],
    height: 1.8,
    width: 2.5,
    depth: 2,
    color: '#f97316',
    roofColor: '#ff6b35',
    description: 'The heart of campus life and activities.',
    programs: ['Career Services', 'Student Organizations', 'Events'],
    interior: {
      features: ['Food court', 'Student organizations', 'Event spaces', 'Career services'],
      capacity: '1000 students',
      hours: '6AM - 12AM',
    },
    cameraTarget: [2.5, 0.9, 3],
    cameraPosition: [5, 2, 6],
    tourOrder: 3,
    tourNarration: 'The Student Center is where campus life happens — dining, clubs, career fairs, and social events all under one roof.',
  },
];

const tourStops = [...buildings].sort((a, b) => a.tourOrder - b.tourOrder);

// ──────────────────────────────────────────────
// CAMERA CONTROLLER
// ──────────────────────────────────────────────
function CameraController({ target, cameraPos, isAnimating, onComplete, autoRotate }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const posVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!isAnimating || !controlsRef.current) return;

    const t = target || [0, 0, 0];
    const p = cameraPos || [8, 8, 8];

    targetVec.set(t[0], t[1], t[2]);
    posVec.set(p[0], p[1], p[2]);

    camera.position.lerp(posVec, 0.035);
    controlsRef.current.target.lerp(targetVec, 0.035);
    controlsRef.current.update();

    if (camera.position.distanceTo(posVec) < 0.08) {
      onComplete?.();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={4}
      maxDistance={22}
      autoRotate={autoRotate && !isAnimating}
      autoRotateSpeed={0.2}
      enableDamping
      dampingFactor={0.05}
    />
  );
}

// ──────────────────────────────────────────────
// BUILDING COMPONENT
// ──────────────────────────────────────────────
function Building({ data, onClick, isSelected, isTourTarget }) {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef(null);
  useCursor(hovered);

  const { height, width, depth, position } = data;
  const buildingY = height / 2;
  const facadeBase = useMemo(() => new THREE.Color(data.color).lerp(new THREE.Color('#f8fafc'), 0.28).getStyle(), [data.color]);
  const trimColor = useMemo(() => new THREE.Color(data.roofColor).lerp(new THREE.Color('#0f172a'), 0.15).getStyle(), [data.roofColor]);
  const accentColor = useMemo(() => new THREE.Color(data.color).lerp(new THREE.Color('#ffffff'), 0.18).getStyle(), [data.color]);
  const canRenderSideFacade = depth >= 1.8 && height >= 2.2;

  // Subtle hover lift
  useFrame(() => {
    if (groupRef.current) {
      const targetY = (hovered || isSelected) ? 0.1 : 0;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[position[0], 0, position[2]]}>
      {/* Main structure */}
      <mesh
        position={[0, buildingY, 0]}
        onClick={(e) => { e.stopPropagation(); onClick(data); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : data.color}
          emissive={isSelected || isTourTarget ? data.color : hovered ? data.color : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : isTourTarget ? 0.3 : hovered ? 0.15 : 0}
          roughness={0.82}
          metalness={0.1}
        />
      </mesh>

      <FacadeWall
        width={width}
        height={height}
        depth={depth}
        baseColor={facadeBase}
        trimColor={trimColor}
        accentColor={accentColor}
      />

      {canRenderSideFacade && (
        <>
          <FacadeWall
            width={depth}
            height={height}
            depth={width}
            baseColor={facadeBase}
            trimColor={trimColor}
            accentColor={accentColor}
            rotation={[0, Math.PI / 2, 0]}
          />
          <FacadeWall
            width={depth}
            height={height}
            depth={width}
            baseColor={facadeBase}
            trimColor={trimColor}
            accentColor={accentColor}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </>
      )}

      {/* Roof accent */}
      <mesh position={[0, height + 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.22, 0.14, depth + 0.22]} />
        <meshStandardMaterial color={data.roofColor} roughness={0.48} metalness={0.24} />
      </mesh>

      {/* Label */}
      {(hovered || isSelected || isTourTarget) && (
        <Html position={[0, height + 0.8, 0]} center distanceFactor={10}>
          <div className="campus-building-label">
            <span className="campus-building-dot" style={{ backgroundColor: data.color }} />
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ──────────────────────────────────────────────
// VEGETATION
// ──────────────────────────────────────────────
function Tree({ position, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle sway
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 1, 6]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      {/* Canopy layers */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.45, 8, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 1.6, 0.1]} castShadow>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 1.7, -0.05]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
    </group>
  );
}

function TreeCluster({ position }) {
  return (
    <group position={position}>
      <Tree position={[0, 0, 0]} scale={0.9} />
      <Tree position={[0.5, 0, 0.3]} scale={0.7} />
      <Tree position={[-0.3, 0, 0.4]} scale={0.6} />
    </group>
  );
}

// Paths between buildings
function CampusPath({ from, to }) {
  const midX = (from[0] + to[0]) / 2;
  const midZ = (from[2] + to[2]) / 2;
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  return (
    <mesh position={[midX, 0.02, midZ]} rotation={[-Math.PI / 2, 0, -angle]}>
      <planeGeometry args={[0.4, length]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.9} metalness={0} transparent opacity={0.4} />
    </mesh>
  );
}

// ──────────────────────────────────────────────
// CAMPUS SCENE
// ──────────────────────────────────────────────
function CampusSceneContent({ onSelect, selectedId, tourTargetId }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [cameraPos, setCameraPos] = useState(null);

  const handleSelect = useCallback((building) => {
    const isDeselect = building.id === selectedId;
    onSelect(isDeselect ? null : building);

    if (!isDeselect) {
      setCameraTarget(building.cameraTarget);
      setCameraPos(building.cameraPosition);
      setIsAnimating(true);
      setAutoRotate(false);
    } else {
      setCameraTarget(null);
      setCameraPos(null);
      setAutoRotate(true);
    }
  }, [selectedId, onSelect]);

  // Tour-triggered camera movement
  useEffect(() => {
    if (tourTargetId) {
      const building = buildings.find((b) => b.id === tourTargetId);
      if (building) {
        setCameraTarget(building.cameraTarget);
        setCameraPos(building.cameraPosition);
        setIsAnimating(true);
        setAutoRotate(false);
      }
    }
  }, [tourTargetId]);

  return (
    <>
      {/* Environment */}
      <Environment preset="sunset" environmentIntensity={0.35} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 12, 5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} color="#fff5e0" />
      <pointLight position={[-8, 5, -8]} intensity={0.3} color="#ff9500" />

      {/* Camera */}
      <CameraController
        target={cameraTarget}
        cameraPos={cameraPos}
        isAnimating={isAnimating}
        onComplete={() => setIsAnimating(false)}
        autoRotate={autoRotate}
      />

      {/* Contact shadows */}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={25} blur={2} far={6} color="#1a1a1a" />

      {/* Ground — campus grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1a3a1a" roughness={0.95} metalness={0} />
      </mesh>

      {/* Lighter grass patches */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 0.005, 0]}>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial color="#1f4a1f" roughness={0.95} transparent opacity={0.5} />
      </mesh>

      {/* Buildings */}
      {buildings.map((b) => (
        <Building
          key={b.id}
          data={b}
          onClick={handleSelect}
          isSelected={selectedId === b.id}
          isTourTarget={tourTargetId === b.id}
        />
      ))}

      {/* Paths */}
      <CampusPath from={buildings[0].position} to={buildings[1].position} />
      <CampusPath from={buildings[0].position} to={buildings[2].position} />
      <CampusPath from={buildings[1].position} to={buildings[3].position} />
      <CampusPath from={buildings[2].position} to={buildings[3].position} />
      <CampusPath from={[0, 0, 0]} to={buildings[0].position} />
      <CampusPath from={[0, 0, 0]} to={buildings[1].position} />
      <CampusPath from={[0, 0, 0]} to={buildings[2].position} />
      <CampusPath from={[0, 0, 0]} to={buildings[3].position} />

      {/* Trees */}
      <TreeCluster position={[-5.5, 0, -5]} />
      <TreeCluster position={[5, 0, -5]} />
      <TreeCluster position={[-5, 0, 5.5]} />
      <TreeCluster position={[5.5, 0, 5]} />
      <Tree position={[0, 0, 0]} scale={1.2} />
      <Tree position={[-4.5, 0, 1]} />
      <Tree position={[4.5, 0, -1]} />
      <Tree position={[1, 0, -5.5]} scale={0.8} />
      <Tree position={[-1, 0, 5.5]} scale={0.8} />

      {/* Postprocessing */}
      <SceneEffects />
    </>
  );
}

function SceneEffects() {
  const settings = useQualitySettings();
  if (!settings.enablePostprocessing) return null;

  return (
    <EffectComposer>
      <Bloom intensity={0.15} luminanceThreshold={0.85} luminanceSmoothing={0.9} mipmapBlur />
    </EffectComposer>
  );
}

// ──────────────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────────────
export function CampusSidebar({
  selected,
  tourMode,
  tourStep,
  onStartTour,
  onNextTourStop,
  onEndTour,
  onEnterBuilding,
  showInterior,
  onBackToExterior,
}) {
  const tourBuilding = tourMode ? tourStops[tourStep] : null;
  const info = tourMode ? tourBuilding : selected;

  return (
    <div className="campus-sidebar">
      {/* Tour Controls */}
      <div className="campus-sidebar-section">
        <h4 className="campus-sidebar-label">Campus Tour</h4>
        {!tourMode ? (
          <button className="campus-tour-btn" onClick={onStartTour}>
            🎓 Start Guided Tour
          </button>
        ) : (
          <div className="campus-tour-progress">
            <div className="campus-tour-steps">
              {tourStops.map((_, i) => (
                <div key={i} className={`campus-tour-dot ${i <= tourStep ? 'active' : ''} ${i === tourStep ? 'current' : ''}`} />
              ))}
            </div>
            <p className="campus-tour-label">Stop {tourStep + 1} of {tourStops.length}</p>
            <div className="campus-tour-actions">
              {tourStep < tourStops.length - 1 ? (
                <button className="campus-tour-btn" onClick={onNextTourStop}>
                  Next Stop →
                </button>
              ) : (
                <button className="campus-tour-btn" onClick={onEndTour}>
                  ✓ Finish Tour
                </button>
              )}
              <button className="campus-tour-btn secondary" onClick={onEndTour}>
                Exit Tour
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tour narration */}
      {tourMode && tourBuilding && (
        <div className="campus-sidebar-section campus-narration">
          <div className="campus-narration-dot" style={{ backgroundColor: tourBuilding.color }} />
          <p>{tourBuilding.tourNarration}</p>
        </div>
      )}

      {/* Building Info */}
      <div className={`campus-sidebar-section campus-building-info ${info ? 'visible' : ''}`}>
        {info ? (
          <>
            <div className="campus-building-header">
              <div className="campus-building-color" style={{ backgroundColor: info.color }} />
              <h3>{info.name}</h3>
            </div>
            <p className="campus-building-desc">{info.description}</p>

            {info.programs && (
              <div className="campus-programs">
                <h4>Programs</h4>
                <div className="campus-program-tags">
                  {info.programs.map((p, i) => (
                    <span key={i} className="campus-program-tag">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {info.interior && (
              <div className="campus-interior-info">
                <div className="campus-stat">
                  <span className="campus-stat-label">Capacity</span>
                  <span className="campus-stat-value">{info.interior.capacity}</span>
                </div>
                <div className="campus-stat">
                  <span className="campus-stat-label">Hours</span>
                  <span className="campus-stat-value">{info.interior.hours}</span>
                </div>
              </div>
            )}

            {info.interior && !showInterior && (
              <button className="campus-enter-btn" onClick={onEnterBuilding}>
                🏛️ Enter Building
              </button>
            )}
          </>
        ) : (
          <div className="campus-no-selection">
            <p>👆 Click a building to explore</p>
          </div>
        )}
      </div>

      {/* Interior View (overlay-style) */}
      {showInterior && info && (
        <div className="campus-interior-panel">
          <button className="campus-back-btn" onClick={onBackToExterior}>
            ← Back to Campus
          </button>
          <h4>Inside {info.name}</h4>
          <ul className="campus-features-list">
            {info.interior.features.map((f, i) => (
              <li key={i}>
                <span className="campus-feature-dot" style={{ backgroundColor: info.color }} />
                {f}
              </li>
            ))}
          </ul>
          <div className="campus-vr-cta">
            <span className="campus-vr-icon">🎥</span>
            <p>360° Virtual Tour</p>
            <span className="campus-vr-hint">Full VR experience available</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────
export default function CampusScene({ onSidebarContent }) {
  const [selected, setSelected] = useState(null);
  const [showInterior, setShowInterior] = useState(false);
  const [tourMode, setTourMode] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const settings = useQualitySettings();

  const handleSelect = useCallback((building) => {
    setSelected(building);
    setShowInterior(false);
  }, []);

  const startTour = useCallback(() => {
    setTourMode(true);
    setTourStep(0);
    setSelected(tourStops[0]);
    setShowInterior(false);
  }, []);

  const nextTourStop = useCallback(() => {
    const next = tourStep + 1;
    if (next < tourStops.length) {
      setTourStep(next);
      setSelected(tourStops[next]);
    }
  }, [tourStep]);

  const endTour = useCallback(() => {
    setTourMode(false);
    setTourStep(0);
  }, []);

  const tourTargetId = tourMode ? tourStops[tourStep]?.id : null;

  useEffect(() => {
    if (!onSidebarContent) return;
    onSidebarContent(
      <CampusSidebar
        selected={selected}
        tourMode={tourMode}
        tourStep={tourStep}
        onStartTour={startTour}
        onNextTourStop={nextTourStop}
        onEndTour={endTour}
        onEnterBuilding={() => setShowInterior(true)}
        showInterior={showInterior}
        onBackToExterior={() => setShowInterior(false)}
      />
    );
  }, [
    onSidebarContent,
    selected,
    tourMode,
    tourStep,
    startTour,
    nextTourStop,
    endTour,
    showInterior
  ]);

  return (
    <Canvas
      camera={{ position: [10, 8, 10], fov: 45 }}
      gl={{ antialias: true }}
      dpr={settings.dpr}
      shadows
    >
      <Suspense fallback={null}>
        <CampusSceneContent
          onSelect={handleSelect}
          selectedId={selected?.id}
          tourTargetId={tourTargetId}
        />
      </Suspense>
    </Canvas>
  );
}
