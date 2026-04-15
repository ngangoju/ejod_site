import React, { useRef, useState, useEffect, Suspense, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useQualitySettings } from './QualityContext';

// ──────────────────────────────────────────────
// INCISION SPLINE
// ──────────────────────────────────────────────
const INCISION_POINTS = [];
for (let i = -2; i <= 2; i += 0.15) {
  INCISION_POINTS.push(new THREE.Vector3(i, Math.sin(i * 0.8) * 0.3, 0.82));
}
const INCISION_CURVE = new THREE.CatmullRomCurve3(INCISION_POINTS);
const TOTAL_SEGMENTS = 40;

// ──────────────────────────────────────────────
// OPERATING FIELD
// ──────────────────────────────────────────────
function OperatingField() {
  return (
    <group>
      {/* Skin patch — subdivided plane with subtle displacement look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 4, 32, 32]} />
        <meshStandardMaterial
          color="#e8c4a0"
          roughness={0.75}
          metalness={0}
        />
      </mesh>

      {/* Skin surface detail — slightly raised center area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[4, 2.5, 16, 16]} />
        <meshStandardMaterial
          color="#f0d0a8"
          roughness={0.7}
          metalness={0}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Surgical drapes — left */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.02, 0]}>
        <planeGeometry args={[2, 5]} />
        <meshStandardMaterial color="#0d6e5e" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Surgical drapes — right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, 0.02, 0]}>
        <planeGeometry args={[2, 5]} />
        <meshStandardMaterial color="#0d6e5e" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Surgical drapes — top */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -2.5]}>
        <planeGeometry args={[8, 1.5]} />
        <meshStandardMaterial color="#0d6e5e" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Surgical drapes — bottom */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.5]}>
        <planeGeometry args={[8, 1.5]} />
        <meshStandardMaterial color="#0d6e5e" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Operating table edge visible at bottom */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[7, 0.3, 5]} />
        <meshStandardMaterial color="#394050" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ──────────────────────────────────────────────
// INCISION GUIDE LINE
// ──────────────────────────────────────────────
function IncisionGuide({ progress }) {
  const points = useMemo(() => INCISION_CURVE.getPoints(TOTAL_SEGMENTS), []);

  // Guide path
  const guideGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  // Completed incision path
  const completedPoints = useMemo(() => {
    if (progress <= 0) return [];
    const count = Math.floor((progress / 100) * TOTAL_SEGMENTS) + 1;
    return points.slice(0, Math.min(count, points.length));
  }, [progress, points]);

  const completedGeom = useMemo(() => {
    if (completedPoints.length < 2) return null;
    return new THREE.BufferGeometry().setFromPoints(completedPoints);
  }, [completedPoints]);

  return (
    <group>
      {/* Guide line — dotted white */}
      <line geometry={guideGeom}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </line>

      {/* Guide dots */}
      {points.filter((_, i) => i % 4 === 0).map((pt, i) => {
        const isCompleted = (i * 4 / TOTAL_SEGMENTS) * 100 <= progress;
        return (
          <mesh key={i} position={[pt.x, pt.y + 0.01, pt.z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={isCompleted ? '#2dd4bf' : '#ef4444'}
              emissive={isCompleted ? '#2dd4bf' : '#ef4444'}
              emissiveIntensity={0.6}
              transparent
              opacity={isCompleted ? 0.4 : 0.7}
            />
          </mesh>
        );
      })}

      {/* Completed incision — dark red line */}
      {completedGeom && (
        <line geometry={completedGeom}>
          <lineBasicMaterial color="#8b0000" linewidth={2} />
        </line>
      )}

      {/* Incision decal effect — red tint under completed portion */}
      {completedPoints.length > 1 && completedPoints.map((pt, i) => (
        <mesh key={`decal-${i}`} position={[pt.x, pt.y - 0.01, pt.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.06, 8]} />
          <meshStandardMaterial color="#8b0000" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────
// SCALPEL (follows pointer on drag)
// ──────────────────────────────────────────────
function Scalpel({ isDragging, onCutProgress, progress }) {
  const ref = useRef();
  const { viewport, pointer, raycaster, camera } = useThree();
  const lastPos = useRef(new THREE.Vector3());
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const intersectPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!ref.current) return;

    // Project pointer onto the operating plane
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, intersectPoint);

    if (intersectPoint) {
      // Clamp to operating field
      const x = THREE.MathUtils.clamp(intersectPoint.x, -3, 3);
      const z = THREE.MathUtils.clamp(intersectPoint.z, -2, 2);

      ref.current.position.set(x, 0.8, z);
      ref.current.rotation.z = -Math.PI / 5;

      // When dragging, check distance to spline
      if (isDragging && progress < 100) {
        const currentT = progress / 100;
        const targetPoint = INCISION_CURVE.getPointAt(Math.min(currentT + 0.02, 1));
        const dist = Math.sqrt(
          (x - targetPoint.x) ** 2 + (z - targetPoint.z) ** 2
        );

        if (dist < 0.4) {
          // Near path — advance progress
          const newProgress = Math.min(progress + 0.5, 100);
          onCutProgress(newProgress, dist, false);
        } else if (dist < 0.8) {
          // Off path warning
          onCutProgress(progress, dist, true);
        }
      }

      lastPos.current.set(x, 0.8, z);
    }
  });

  return (
    <group ref={ref}>
      {/* Blade */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.04, 0.5, 8, 12]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Handle grip rings */}
      {[0.1, 0.2, 0.3, 0.4].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.042, 0.005, 4, 8]} />
          <meshStandardMaterial color="#1e40af" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────
// SCENE CONTENT
// ──────────────────────────────────────────────
function SurgicalSceneContent({
  isDragging,
  setIsDragging,
  progress,
  onCutProgress,
  offPath,
}) {
  return (
    <>
      {/* Clinical task lighting */}
      <Environment preset="warehouse" environmentIntensity={0.15} />
      <ambientLight intensity={0.2} />
      <spotLight
        position={[0, 6, 1]}
        intensity={2}
        angle={0.5}
        penumbra={0.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
      <spotLight position={[-2, 4, 2]} intensity={0.5} angle={0.6} penumbra={0.5} color="#f0f0ff" />
      <pointLight position={[2, 3, -1]} intensity={0.2} color="#e0e8ff" />

      {/* Camera — fixed overhead, slight angle */}
      <OrbitControls
        enableRotate={false}
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
      />

      {/* Contact shadows */}
      <ContactShadows position={[0, -0.29, 0]} opacity={0.3} scale={10} blur={2} far={3} />

      {/* Operating field */}
      <OperatingField />

      {/* Incision guide */}
      <IncisionGuide progress={progress} />

      {/* Scalpel */}
      <Scalpel
        isDragging={isDragging}
        onCutProgress={onCutProgress}
        progress={progress}
      />

      {/* Off-path warning overlay tint */}
      {offPath && (
        <mesh position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
      )}

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
      <Bloom intensity={0.2} luminanceThreshold={0.9} luminanceSmoothing={0.9} mipmapBlur />
    </EffectComposer>
  );
}

// ──────────────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────────────
export function SurgicalSidebar({
  progress,
  score,
  deviations,
  elapsed,
  isComplete,
  isDragging,
  onReset,
}) {
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const getScoreColor = (s) => {
    if (s >= 80) return '#2dd4bf';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getGrade = (s) => {
    if (s >= 95) return 'Expert';
    if (s >= 85) return 'Proficient';
    if (s >= 70) return 'Competent';
    if (s >= 50) return 'Developing';
    return 'Needs Practice';
  };

  return (
    <div className="surgical-sidebar">
      {/* Procedure Info */}
      <div className="surgical-sidebar-section">
        <h4 className="surgical-sidebar-label">Procedure</h4>
        <h3 className="surgical-procedure-name">Linear Skin Incision</h3>
        <p className="surgical-target">Target: Brachial region access</p>
        <p className="surgical-difficulty">
          <span className="surgical-diff-badge">Intermediate</span>
        </p>
      </div>

      {/* Instructions */}
      <div className="surgical-sidebar-section">
        <h4 className="surgical-sidebar-label">Instructions</h4>
        <ol className="surgical-instructions">
          <li className={progress > 0 ? 'done' : ''}>Position scalpel at start marker</li>
          <li className={isDragging ? 'active' : progress > 0 ? 'done' : ''}>Click and drag along incision path</li>
          <li className={progress >= 100 ? 'done' : ''}>Maintain steady pressure and alignment</li>
        </ol>
      </div>

      {/* Live Stats */}
      <div className="surgical-sidebar-section surgical-stats">
        <h4 className="surgical-sidebar-label">Performance</h4>
        <div className="surgical-stat-grid">
          <div className="surgical-stat">
            <span className="surgical-stat-label">Progress</span>
            <div className="surgical-progress-bar">
              <div className="surgical-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="surgical-stat-value">{Math.round(progress)}%</span>
          </div>
          <div className="surgical-stat">
            <span className="surgical-stat-label">Precision</span>
            <span className="surgical-stat-value" style={{ color: getScoreColor(score) }}>
              {score}%
            </span>
          </div>
          <div className="surgical-stat">
            <span className="surgical-stat-label">Time</span>
            <span className="surgical-stat-value surgical-mono">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="surgical-stat">
            <span className="surgical-stat-label">Deviations</span>
            <span className="surgical-stat-value" style={{ color: deviations > 5 ? '#ef4444' : '#2dd4bf' }}>
              {deviations}
            </span>
          </div>
        </div>
      </div>

      {/* Completion */}
      {isComplete && (
        <div className="surgical-sidebar-section surgical-complete">
          <div className="surgical-complete-badge">
            <span className="surgical-complete-icon">✓</span>
            <h3>Procedure Complete</h3>
          </div>
          <div className="surgical-score-breakdown">
            <div className="surgical-final-score" style={{ color: getScoreColor(score) }}>
              {score}%
            </div>
            <p className="surgical-grade">{getGrade(score)}</p>
            <div className="surgical-breakdown-grid">
              <div className="surgical-breakdown-item">
                <span>Path accuracy</span>
                <span>{Math.max(0, 100 - deviations * 3)}%</span>
              </div>
              <div className="surgical-breakdown-item">
                <span>Speed</span>
                <span>{elapsed < 30 ? 'Excellent' : elapsed < 60 ? 'Good' : 'Slow'}</span>
              </div>
              <div className="surgical-breakdown-item">
                <span>Consistency</span>
                <span>{deviations < 3 ? 'Excellent' : deviations < 6 ? 'Good' : 'Needs work'}</span>
              </div>
            </div>
          </div>
          <button className="surgical-retry-btn" onClick={onReset}>
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────
export default function SurgicalScene({ onSidebarContent }) {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [offPath, setOffPath] = useState(false);
  const [deviations, setDeviations] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const settings = useQualitySettings();

  // Timer
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [progress]);

  // Score penalty over time
  useEffect(() => {
    if (progress > 0 && progress < 100 && isDragging) {
      const penalty = setInterval(() => {
        setScore((s) => Math.max(0, s - 0.5));
      }, 2000);
      return () => clearInterval(penalty);
    }
  }, [progress, isDragging]);

  // Completion
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
    }
  }, [progress, isComplete]);

  const handleCutProgress = useCallback((newProgress, dist, isOffPath) => {
    setProgress(newProgress);
    setOffPath(isOffPath);
    if (isOffPath) {
      setDeviations((d) => d + 1);
      setScore((s) => Math.max(0, s - 2));
    }
  }, []);

  const handleReset = useCallback(() => {
    setProgress(0);
    setScore(100);
    setDeviations(0);
    setElapsed(0);
    setIsComplete(false);
    setIsDragging(false);
    setOffPath(false);
  }, []);

  useEffect(() => {
    if (!onSidebarContent) return;
    onSidebarContent(
      <SurgicalSidebar
        progress={progress}
        score={score}
        deviations={deviations}
        elapsed={elapsed}
        isComplete={isComplete}
        isDragging={isDragging}
        onReset={handleReset}
      />
    );
  }, [
    onSidebarContent,
    progress,
    score,
    deviations,
    elapsed,
    isComplete,
    isDragging,
    handleReset
  ]);

  return (
    <Canvas
      camera={{ position: [0, 5, 3], fov: 45 }}
      gl={{ antialias: true }}
      dpr={settings.dpr}
      shadows
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      style={{ cursor: isDragging ? 'none' : 'crosshair' }}
    >
      <Suspense fallback={null}>
        <SurgicalSceneContent
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          progress={progress}
          onCutProgress={handleCutProgress}
          offPath={offPath}
        />
      </Suspense>
    </Canvas>
  );
}
