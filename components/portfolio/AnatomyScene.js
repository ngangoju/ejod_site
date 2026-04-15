import React, { useRef, useState, Suspense, useCallback, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useQualitySettings } from './QualityContext';

const mutedAccent = '#b1443f';
const shellTone = '#f2d2bf';
const muscleTone = '#a86157';
const vesselRed = '#b63e37';
const vesselBlue = '#4f6b9c';
const boneTone = '#d8d1c6';

const organData = {
  brain: {
    name: 'Brain',
    system: 'nervous',
    description: 'Central nervous system control center responsible for memory, sensory interpretation, motor planning, and autonomic regulation.',
    facts: ['Occupies the cranial cavity', 'Divided into cerebrum, cerebellum, and brainstem', 'Receives rich carotid and vertebral blood supply'],
    region: 'Head — Cranial cavity',
    conditions: ['Stroke', 'Epilepsy', 'Traumatic brain injury'],
    color: '#c69a7b',
    cameraTarget: [0, 2.8, 0.1],
    cameraPosition: [1.8, 2.9, 4.8],
  },
  heart: {
    name: 'Heart',
    system: 'circulatory',
    description: 'Muscular pump positioned centrally within the thorax and enclosed by the rib cage, driving systemic and pulmonary circulation.',
    facts: ['Sits slightly left of midline', 'Bound by lungs and sternum', 'Connects directly to the aorta and vena cavae'],
    region: 'Thorax — Mediastinum',
    conditions: ['Coronary artery disease', 'Arrhythmia', 'Heart failure'],
    color: '#8e2c29',
    cameraTarget: [0.15, 1.2, 0.2],
    cameraPosition: [2.1, 1.5, 4.3],
  },
  lungs: {
    name: 'Lungs',
    system: 'respiratory',
    description: 'Paired thoracic organs occupying the pleural cavities and surrounding the heart while exchanging oxygen and carbon dioxide.',
    facts: ['Right lung is slightly broader', 'Expand against the rib cage during breathing', 'Connected to trachea and bronchi'],
    region: 'Thorax — Pleural cavities',
    conditions: ['Asthma', 'COPD', 'Pneumonia'],
    color: '#b69087',
    cameraTarget: [0, 1.45, 0.1],
    cameraPosition: [2.8, 1.6, 4.8],
  },
  liver: {
    name: 'Liver',
    system: 'digestive',
    description: 'Large upper abdominal organ occupying the right side beneath the diaphragm and ribs, central to metabolism and detoxification.',
    facts: ['Largest internal organ', 'Protected by lower right ribs', 'Receives dual blood supply from portal vein and hepatic artery'],
    region: 'Upper abdomen — Right hypochondrium',
    conditions: ['Hepatitis', 'Cirrhosis', 'Fatty liver disease'],
    color: '#7e4a32',
    cameraTarget: [0.48, 0.35, 0.18],
    cameraPosition: [2.5, 0.7, 4.3],
  },
  stomach: {
    name: 'Stomach',
    system: 'digestive',
    description: 'Curved muscular reservoir in the upper left abdomen, partially tucked behind the rib cage and adjacent to the liver and pancreas.',
    facts: ['Sits left of the liver', 'Connects esophagus to duodenum', 'Changes volume dramatically after meals'],
    region: 'Upper abdomen — Left hypochondrium',
    conditions: ['Gastritis', 'Ulcer disease', 'GERD'],
    color: '#b47a63',
    cameraTarget: [-0.4, 0.35, 0.25],
    cameraPosition: [-2.2, 0.85, 4.2],
  },
  kidneys: {
    name: 'Kidneys',
    system: 'urinary',
    description: 'Retroperitoneal filtering organs positioned posteriorly on either side of the spine, partly shielded by lower ribs.',
    facts: ['Located behind most abdominal organs', 'Each connects to a ureter', 'Receives high renal blood flow'],
    region: 'Posterior abdomen — Retroperitoneal',
    conditions: ['Kidney stones', 'Chronic kidney disease', 'Hydronephrosis'],
    color: '#7b5b54',
    cameraTarget: [0, 0.18, -0.2],
    cameraPosition: [2.7, 0.8, 4.7],
  },
  intestines: {
    name: 'Intestines',
    system: 'digestive',
    description: 'Dense lower abdominal bowel loops filling the central abdomen beneath the stomach and liver, framed by the pelvis below.',
    facts: ['Occupy much of the lower torso', 'Small bowel coils are centrally packed', 'Large bowel frames the bowel mass'],
    region: 'Mid to lower abdomen',
    conditions: ['Obstruction', 'Inflammatory bowel disease', 'Appendicitis'],
    color: '#be9a74',
    cameraTarget: [0, -0.4, 0.22],
    cameraPosition: [2.4, -0.1, 4.5],
  },
  skeleton: {
    name: 'Skeletal Framework',
    system: 'skeletal',
    description: 'Structural support layer defining posture, protecting organs, and giving anatomical landmarks such as the rib cage, pelvis, and skull.',
    facts: ['Rib cage frames thoracic organs', 'Pelvis supports abdominal contents', 'Long bones anchor major muscles'],
    region: 'Whole body',
    conditions: ['Osteoporosis', 'Fractures', 'Scoliosis'],
    color: '#d8d1c6',
    cameraTarget: [0, 0.9, 0],
    cameraPosition: [3.8, 1.4, 6.5],
  },
};

const systems = [
  { id: 'all', label: 'All Systems', icon: 'AT' },
  { id: 'nervous', label: 'Nervous', icon: 'BR' },
  { id: 'circulatory', label: 'Circulatory', icon: 'CV' },
  { id: 'respiratory', label: 'Respiratory', icon: 'LU' },
  { id: 'digestive', label: 'Digestive', icon: 'DG' },
  { id: 'urinary', label: 'Urinary', icon: 'UR' },
  { id: 'skeletal', label: 'Skeletal', icon: 'SK' },
  { id: 'muscular', label: 'Muscular', icon: 'MS' },
];

function getLayerFocus(activeSystem) {
  if (activeSystem === 'all') {
    return { body: 1, muscular: 1, skeleton: 1, vascular: 1, organs: 1 };
  }

  const defaults = { body: 0.45, muscular: 0.22, skeleton: 0.28, vascular: 0.18, organs: 0.22 };
  if (activeSystem === 'circulatory') return { ...defaults, body: 0.35, vascular: 1, organs: 0.55 };
  if (activeSystem === 'respiratory') return { ...defaults, body: 0.35, skeleton: 0.35, organs: 1 };
  if (activeSystem === 'digestive') return { ...defaults, body: 0.32, organs: 1 };
  if (activeSystem === 'urinary') return { ...defaults, body: 0.32, organs: 1 };
  if (activeSystem === 'nervous') return { ...defaults, body: 0.28, skeleton: 0.35, organs: 1 };
  if (activeSystem === 'skeletal') return { ...defaults, body: 0.25, skeleton: 1, organs: 0.15 };
  if (activeSystem === 'muscular') return { ...defaults, body: 0.32, muscular: 1, organs: 0.18 };
  return defaults;
}

function getGroupOpacity({ visible, focus = 1, isolateOrgan, selectedOrgan, organKey, baseOpacity = 1, contextBase = 0.38 }) {
  if (!visible) return 0;
  if (!isolateOrgan) return baseOpacity * focus;

  if (!organKey) {
    return contextBase * focus;
  }

  if (organKey === isolateOrgan || organKey === selectedOrgan) {
    return baseOpacity;
  }

  return baseOpacity * 0.08 * focus;
}

function CameraController({ target, cameraPos, isAnimating, onAnimationComplete }) {
  const { camera } = useThree();
  const controlsRef = useRef(null);
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const posVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!controlsRef.current) return;

    const nextTarget = target || [0, 0.4, 0];
    const nextPosition = cameraPos || [0, 0.9, 8.8];

    targetVec.set(nextTarget[0], nextTarget[1], nextTarget[2]);
    posVec.set(nextPosition[0], nextPosition[1], nextPosition[2]);

    const lerpFactor = isAnimating ? 0.055 : 0.03;
    camera.position.lerp(posVec, lerpFactor);
    controlsRef.current.target.lerp(targetVec, lerpFactor);
    controlsRef.current.update();

    if (isAnimating && camera.position.distanceTo(posVec) < 0.06) {
      onAnimationComplete?.();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={2.8}
      maxDistance={11}
      autoRotate={!isAnimating && !target}
      autoRotateSpeed={0.18}
      enableDamping
      dampingFactor={0.06}
    />
  );
}

function VesselPath({ points, color, radius, opacity }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point[0], point[1], point[2])));
    return new THREE.TubeGeometry(curve, 56, radius, 10, false);
  }, [points, radius]);

  if (opacity <= 0) return null;

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial color={color} roughness={0.48} metalness={0.04} clearcoat={0.08} transparent opacity={opacity} />
    </mesh>
  );
}

function BodyShell({ opacity }) {
  if (opacity <= 0) return null;

  return (
    <group>
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.95, 2.95, 16, 28]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity} roughness={0.88} clearcoat={0.18} clearcoatRoughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.95, 0.02]}>
        <sphereGeometry args={[0.58, 28, 28]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity} roughness={0.86} clearcoat={0.18} clearcoatRoughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.25, 0.02]}>
        <cylinderGeometry args={[0.18, 0.22, 0.5, 18]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity} roughness={0.88} clearcoat={0.12} clearcoatRoughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <capsuleGeometry args={[0.78, 0.95, 16, 20]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity} roughness={0.88} clearcoat={0.18} clearcoatRoughness={0.72} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-1.02, 1.35, 0]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.2, 1.65, 12, 20]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.92} roughness={0.88} clearcoat={0.16} clearcoatRoughness={0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.02, 1.35, 0]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.2, 1.65, 12, 20]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.92} roughness={0.88} clearcoat={0.16} clearcoatRoughness={0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.04, 0.15, 0.02]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.17, 1.45, 12, 20]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.92} roughness={0.88} clearcoat={0.16} clearcoatRoughness={0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.04, 0.15, 0.02]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.17, 1.45, 12, 20]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.92} roughness={0.88} clearcoat={0.16} clearcoatRoughness={0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.02, -1.05, 0]} rotation={[0, 0, 0.03]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.85} roughness={0.9} />
      </mesh>
      <mesh position={[1.02, -1.05, 0]} rotation={[0, 0, -0.03]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.85} roughness={0.9} />
      </mesh>

      <mesh position={[-0.48, -1.95, 0]} rotation={[0, 0, 0.04]}>
        <capsuleGeometry args={[0.28, 2.35, 14, 24]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.9} roughness={0.88} clearcoat={0.14} clearcoatRoughness={0.74} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.48, -1.95, 0]} rotation={[0, 0, -0.04]}>
        <capsuleGeometry args={[0.28, 2.35, 14, 24]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.9} roughness={0.88} clearcoat={0.14} clearcoatRoughness={0.74} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.46, -3.9, 0.02]} rotation={[0, 0, 0.02]}>
        <capsuleGeometry args={[0.23, 1.95, 12, 24]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.9} roughness={0.88} clearcoat={0.14} clearcoatRoughness={0.74} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.46, -3.9, 0.02]} rotation={[0, 0, -0.02]}>
        <capsuleGeometry args={[0.23, 1.95, 12, 24]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.9} roughness={0.88} clearcoat={0.14} clearcoatRoughness={0.74} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.48, -5.25, 0.2]} rotation={[0.22, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.8} roughness={0.88} />
      </mesh>
      <mesh position={[0.48, -5.25, 0.2]} rotation={[0.22, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
        <meshPhysicalMaterial color={shellTone} transparent opacity={opacity * 0.8} roughness={0.88} />
      </mesh>
    </group>
  );
}

function MuscularLayer({ opacity }) {
  if (opacity <= 0) return null;

  return (
    <group>
      <mesh position={[-0.52, 1.35, 0.18]} rotation={[0.1, 0, 0.15]}>
        <capsuleGeometry args={[0.36, 0.85, 12, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity} roughness={0.78} clearcoat={0.05} />
      </mesh>
      <mesh position={[0.52, 1.35, 0.18]} rotation={[0.1, 0, -0.15]}>
        <capsuleGeometry args={[0.36, 0.85, 12, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity} roughness={0.78} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, 0.4, 0.2]}>
        <capsuleGeometry args={[0.55, 1.8, 14, 22]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.9} roughness={0.8} clearcoat={0.04} />
      </mesh>
      <mesh position={[-0.82, 1.95, 0.08]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      <mesh position={[0.82, 1.95, 0.08]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      <mesh position={[-0.92, 1.1, 0.08]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.18, 1.08, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      <mesh position={[0.92, 1.1, 0.08]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.18, 1.08, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      <mesh position={[-0.94, -0.05, 0.08]}>
        <capsuleGeometry args={[0.15, 1.05, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      <mesh position={[0.94, -0.05, 0.08]}>
        <capsuleGeometry args={[0.15, 1.05, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.95} roughness={0.8} />
      </mesh>
      {[-0.42, -0.14, 0.14, 0.42].map((x, index) => (
        <mesh key={index} position={[x, 0.12, 0.28]}>
          <capsuleGeometry args={[0.14, 1.2, 10, 16]} />
          <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.72} roughness={0.82} />
        </mesh>
      ))}
      <mesh position={[-0.48, -2.05, 0.12]} rotation={[0, 0, 0.04]}>
        <capsuleGeometry args={[0.23, 1.6, 12, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.94} roughness={0.8} />
      </mesh>
      <mesh position={[0.48, -2.05, 0.12]} rotation={[0, 0, -0.04]}>
        <capsuleGeometry args={[0.23, 1.6, 12, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.94} roughness={0.8} />
      </mesh>
      <mesh position={[-0.48, -3.8, 0.1]}>
        <capsuleGeometry args={[0.18, 1.4, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.94} roughness={0.8} />
      </mesh>
      <mesh position={[0.48, -3.8, 0.1]}>
        <capsuleGeometry args={[0.18, 1.4, 10, 18]} />
        <meshPhysicalMaterial color={muscleTone} transparent opacity={opacity * 0.94} roughness={0.8} />
      </mesh>
    </group>
  );
}

function SkeletonLayer({ opacity, onClick, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const accent = hovered || isSelected ? '#f1ede4' : boneTone;
  const emissive = hovered || isSelected ? '#8b7d70' : '#1f1f1f';

  if (opacity <= 0) return null;

  return (
    <group
      onClick={(event) => { event.stopPropagation(); onClick('skeleton'); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <mesh position={[0, 2.96, 0]}>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshPhysicalMaterial color={accent} emissive={emissive} emissiveIntensity={0.16} roughness={0.4} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 2.48, 0.08]}>
        <cylinderGeometry args={[0.12, 0.14, 0.36, 12]} />
        <meshPhysicalMaterial color={accent} emissive={emissive} emissiveIntensity={0.14} roughness={0.4} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 1.45, -0.05]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5, 12]} />
        <meshPhysicalMaterial color={accent} emissive={emissive} emissiveIntensity={0.14} roughness={0.4} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 1.18, 0.38]}>
        <boxGeometry args={[0.18, 1.7, 0.18]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.38, 2.2, 0.1]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.05, 0.55, 8, 14]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.38, 2.2, 0.1]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.05, 0.55, 8, 14]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      {[-0.65, -0.48, -0.31, -0.14, 0.03, 0.2, 0.37, 0.54].map((x, index) => (
        <React.Fragment key={index}>
          <mesh position={[x, 1.45 - Math.abs(x) * 0.08, 0.18]} rotation={[0.22, 0, 0.78]}>
            <capsuleGeometry args={[0.03, 0.9, 6, 12]} />
            <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
          </mesh>
          <mesh position={[-x, 1.45 - Math.abs(x) * 0.08, 0.18]} rotation={[0.22, 0, -0.78]}>
            <capsuleGeometry args={[0.03, 0.9, 6, 12]} />
            <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
          </mesh>
        </React.Fragment>
      ))}
      <mesh position={[0, -0.62, 0.06]}>
        <torusGeometry args={[0.48, 0.1, 10, 26, Math.PI]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.92, 1.75, 0]} rotation={[0, 0, 0.48]}>
        <capsuleGeometry args={[0.05, 0.74, 8, 16]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.92, 1.75, 0]} rotation={[0, 0, -0.48]}>
        <capsuleGeometry args={[0.05, 0.74, 8, 16]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-1.02, 0.8, 0]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.04, 0.72, 8, 16]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[1.02, 0.8, 0]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.04, 0.72, 8, 16]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-1.05, 0.02, 0.02]}>
        <capsuleGeometry args={[0.035, 0.6, 8, 14]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[1.05, 0.02, 0.02]}>
        <capsuleGeometry args={[0.035, 0.6, 8, 14]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.45, -2.05, 0]} rotation={[0, 0, 0.03]}>
        <capsuleGeometry args={[0.065, 2.08, 10, 18]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.45, -2.05, 0]} rotation={[0, 0, -0.03]}>
        <capsuleGeometry args={[0.065, 2.08, 10, 18]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.45, -3.95, 0]} rotation={[0, 0, 0.02]}>
        <capsuleGeometry args={[0.055, 1.75, 10, 18]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.45, -3.95, 0]} rotation={[0, 0, -0.02]}>
        <capsuleGeometry args={[0.055, 1.75, 10, 18]} />
        <meshPhysicalMaterial color={accent} roughness={0.42} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function VascularLayer({ opacity }) {
  const paths = useMemo(() => ([
    { color: vesselRed, radius: 0.046, points: [[0, 2.32, 0.02], [0.05, 1.95, 0.1], [0.08, 1.4, 0.12], [0.05, 0.2, 0.05], [0.05, -1.0, 0.02], [0.1, -2.0, 0], [0.1, -3.2, 0]] },
    { color: vesselBlue, radius: 0.04, points: [[-0.05, 2.22, -0.02], [-0.08, 1.7, -0.08], [-0.05, 0.9, -0.08], [-0.03, -0.4, -0.05], [-0.05, -1.5, -0.04], [-0.1, -2.8, -0.03], [-0.1, -3.9, -0.02]] },
    { color: vesselRed, radius: 0.024, points: [[0.05, 1.98, 0.06], [0.45, 2.1, 0.04], [0.85, 1.9, 0.02], [1.0, 1.35, 0.03], [1.02, 0.4, 0.02], [1.02, -0.45, 0.01]] },
    { color: vesselRed, radius: 0.024, points: [[0.05, 1.98, 0.06], [-0.45, 2.1, 0.04], [-0.85, 1.9, 0.02], [-1.0, 1.35, 0.03], [-1.02, 0.4, 0.02], [-1.02, -0.45, 0.01]] },
    { color: vesselBlue, radius: 0.02, points: [[-0.02, 1.88, -0.04], [0.45, 1.95, -0.02], [0.9, 1.72, -0.02], [1.0, 1.15, -0.01], [1.04, 0.2, -0.02]] },
    { color: vesselBlue, radius: 0.02, points: [[-0.02, 1.88, -0.04], [-0.45, 1.95, -0.02], [-0.9, 1.72, -0.02], [-1.0, 1.15, -0.01], [-1.04, 0.2, -0.02]] },
    { color: vesselRed, radius: 0.026, points: [[0.05, -1.05, 0.02], [0.32, -1.6, 0.02], [0.45, -2.55, 0.02], [0.48, -3.75, 0.01], [0.5, -4.85, 0.02]] },
    { color: vesselRed, radius: 0.026, points: [[0.05, -1.05, 0.02], [-0.32, -1.6, 0.02], [-0.45, -2.55, 0.02], [-0.48, -3.75, 0.01], [-0.5, -4.85, 0.02]] },
    { color: vesselBlue, radius: 0.022, points: [[-0.02, -1.0, -0.02], [0.26, -1.65, -0.01], [0.42, -2.75, -0.01], [0.46, -3.8, -0.02], [0.5, -4.85, -0.02]] },
    { color: vesselBlue, radius: 0.022, points: [[-0.02, -1.0, -0.02], [-0.26, -1.65, -0.01], [-0.42, -2.75, -0.01], [-0.46, -3.8, -0.02], [-0.5, -4.85, -0.02]] },
    { color: vesselRed, radius: 0.018, points: [[0.02, 2.32, 0.03], [0.16, 2.55, 0.02], [0.2, 2.78, 0.02]] },
    { color: vesselRed, radius: 0.018, points: [[-0.02, 2.32, 0.03], [-0.16, 2.55, 0.02], [-0.2, 2.78, 0.02]] },
  ]), []);

  if (opacity <= 0) return null;

  return (
    <group>
      {paths.map((path, index) => (
        <VesselPath key={index} points={path.points} color={path.color} radius={path.radius} opacity={opacity} />
      ))}
    </group>
  );
}

function OrganGroup({ organKey, position, rotation = [0, 0, 0], opacity, color, emissive, children, onClick, isSelected, explodeOffset = [0, 0, 0] }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);
  const destination = useMemo(
    () => [position[0] + explodeOffset[0], position[1] + explodeOffset[1], position[2] + explodeOffset[2]],
    [position, explodeOffset]
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const scale = hovered || isSelected ? 1.04 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  if (opacity <= 0) return null;

  return (
    <group
      ref={groupRef}
      position={destination}
      rotation={rotation}
      onClick={(event) => { event.stopPropagation(); onClick(organKey); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (grandchild) => {
            if (!React.isValidElement(grandchild)) return grandchild;
            if (!String(grandchild.type).includes('meshPhysicalMaterial')) return grandchild;
            return React.cloneElement(grandchild, {
              color,
              emissive: hovered || isSelected ? emissive : '#1c1715',
              emissiveIntensity: hovered || isSelected ? 0.3 : 0.06,
              transparent: true,
              opacity,
            });
          }),
        });
      })}
    </group>
  );
}

function OrgansLayer({ selectedOrgan, onSelect, organsVisible, activeSystem, isolateOrgan, explodeMode }) {
  const heartRef = useRef(null);
  const lungsRef = useRef(null);
  const stomachRef = useRef(null);

  useFrame((state) => {
    if (heartRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4.4) * 0.035;
      heartRef.current.scale.setScalar(pulse);
    }
    if (lungsRef.current) {
      const breath = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.035;
      lungsRef.current.scale.set(breath, breath * 0.98, breath);
    }
    if (stomachRef.current) {
      stomachRef.current.rotation.z = 0.12 + Math.sin(state.clock.elapsedTime * 0.7) * 0.03;
    }
  });

  const focus = getLayerFocus(activeSystem);
  const getOpacity = useCallback((organKey) => {
    const organ = organData[organKey];
    const organFocus = activeSystem === 'all' ? focus.organs : organ.system === activeSystem ? 1 : focus.organs;
    return getGroupOpacity({
      visible: organsVisible,
      focus: organFocus,
      isolateOrgan,
      selectedOrgan,
      organKey,
      baseOpacity: 0.98,
      contextBase: 0.2,
    });
  }, [activeSystem, focus.organs, isolateOrgan, organsVisible, selectedOrgan]);

  const getExplodeOffset = useCallback((organKey) => {
    if (!explodeMode) return [0, 0, 0];
    const offsets = {
      brain: [0, 0.18, 0.12],
      heart: [0.25, 0.1, 0.38],
      lungs: [0, 0.12, 0.42],
      liver: [0.34, -0.03, 0.34],
      stomach: [-0.32, 0.02, 0.34],
      kidneys: [0, 0, -0.28],
      intestines: [0, -0.08, 0.24],
    };
    return offsets[organKey] || [0, 0, 0];
  }, [explodeMode]);

  const intestinesLoops = useMemo(() => [
    [[-0.45, -0.32, 0.16], [-0.12, -0.12, 0.24], [0.22, -0.22, 0.22], [0.45, -0.42, 0.16]],
    [[-0.48, -0.56, 0.16], [-0.14, -0.36, 0.28], [0.18, -0.46, 0.24], [0.48, -0.66, 0.16]],
    [[-0.44, -0.8, 0.14], [-0.12, -0.62, 0.28], [0.16, -0.72, 0.22], [0.42, -0.94, 0.14]],
    [[-0.36, -1.04, 0.1], [-0.08, -0.9, 0.22], [0.1, -1.0, 0.18], [0.34, -1.18, 0.1]],
  ], []);

  return (
    <group>
      <OrganGroup
        organKey="brain"
        position={[0, 2.95, 0.02]}
        opacity={getOpacity('brain')}
        color={organData.brain.color}
        emissive={organData.brain.color}
        onClick={onSelect}
        isSelected={selectedOrgan === 'brain'}
        explodeOffset={getExplodeOffset('brain')}
      >
        <mesh position={[-0.13, 0, 0]}>
          <sphereGeometry args={[0.34, 18, 18]} />
          <meshPhysicalMaterial roughness={0.76} clearcoat={0.04} />
        </mesh>
        <mesh position={[0.13, 0, 0]}>
          <sphereGeometry args={[0.34, 18, 18]} />
          <meshPhysicalMaterial roughness={0.76} clearcoat={0.04} />
        </mesh>
        <mesh position={[0, -0.34, 0.05]}>
          <cylinderGeometry args={[0.08, 0.1, 0.28, 12]} />
          <meshPhysicalMaterial roughness={0.76} clearcoat={0.04} />
        </mesh>
      </OrganGroup>

      <OrganGroup
        organKey="lungs"
        position={[0, 1.48, 0.1]}
        opacity={getOpacity('lungs')}
        color={organData.lungs.color}
        emissive="#b6a7a4"
        onClick={onSelect}
        isSelected={selectedOrgan === 'lungs'}
        explodeOffset={getExplodeOffset('lungs')}
      >
        <group ref={lungsRef}>
          <mesh position={[-0.36, 0, 0]}>
            <capsuleGeometry args={[0.26, 0.9, 10, 18]} />
            <meshPhysicalMaterial roughness={0.68} clearcoat={0.04} />
          </mesh>
          <mesh position={[0.36, 0, 0]}>
            <capsuleGeometry args={[0.3, 0.96, 10, 18]} />
            <meshPhysicalMaterial roughness={0.68} clearcoat={0.04} />
          </mesh>
          <mesh position={[0, 0.36, 0.04]}>
            <cylinderGeometry args={[0.07, 0.09, 0.45, 12]} />
            <meshPhysicalMaterial color="#ac8c7e" roughness={0.58} transparent opacity={getOpacity('lungs')} />
          </mesh>
        </group>
      </OrganGroup>

      <OrganGroup
        organKey="heart"
        position={[0.12, 1.18, 0.22]}
        rotation={[0.1, 0.1, -0.22]}
        opacity={getOpacity('heart')}
        color={organData.heart.color}
        emissive="#b84338"
        onClick={onSelect}
        isSelected={selectedOrgan === 'heart'}
        explodeOffset={getExplodeOffset('heart')}
      >
        <group ref={heartRef}>
          <mesh>
            <sphereGeometry args={[0.28, 20, 20]} />
            <meshPhysicalMaterial roughness={0.42} clearcoat={0.2} />
          </mesh>
          <mesh position={[0.08, 0.18, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.28, 12]} />
            <meshPhysicalMaterial roughness={0.42} clearcoat={0.2} />
          </mesh>
          <mesh position={[-0.08, 0.14, 0.03]} rotation={[0.18, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.22, 12]} />
            <meshPhysicalMaterial roughness={0.42} clearcoat={0.2} />
          </mesh>
        </group>
      </OrganGroup>

      <OrganGroup
        organKey="liver"
        position={[0.48, 0.32, 0.18]}
        rotation={[0.04, 0.04, -0.24]}
        opacity={getOpacity('liver')}
        color={organData.liver.color}
        emissive="#98634c"
        onClick={onSelect}
        isSelected={selectedOrgan === 'liver'}
        explodeOffset={getExplodeOffset('liver')}
      >
        <mesh>
          <capsuleGeometry args={[0.28, 0.82, 12, 18]} />
          <meshPhysicalMaterial roughness={0.54} clearcoat={0.08} />
        </mesh>
      </OrganGroup>

      <OrganGroup
        organKey="stomach"
        position={[-0.36, 0.24, 0.24]}
        rotation={[0.2, -0.12, 0.12]}
        opacity={getOpacity('stomach')}
        color={organData.stomach.color}
        emissive="#c0947d"
        onClick={onSelect}
        isSelected={selectedOrgan === 'stomach'}
        explodeOffset={getExplodeOffset('stomach')}
      >
        <mesh ref={stomachRef}>
          <capsuleGeometry args={[0.22, 0.52, 12, 18]} />
          <meshPhysicalMaterial roughness={0.58} clearcoat={0.08} />
        </mesh>
      </OrganGroup>

      <OrganGroup
        organKey="kidneys"
        position={[0, 0.18, -0.22]}
        opacity={getOpacity('kidneys')}
        color={organData.kidneys.color}
        emissive="#8d6f68"
        onClick={onSelect}
        isSelected={selectedOrgan === 'kidneys'}
        explodeOffset={getExplodeOffset('kidneys')}
      >
        <mesh position={[-0.34, 0, 0]} rotation={[0, 0, 0.22]}>
          <capsuleGeometry args={[0.12, 0.28, 10, 14]} />
          <meshPhysicalMaterial roughness={0.56} clearcoat={0.06} />
        </mesh>
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, -0.22]}>
          <capsuleGeometry args={[0.12, 0.28, 10, 14]} />
          <meshPhysicalMaterial roughness={0.56} clearcoat={0.06} />
        </mesh>
      </OrganGroup>

      <OrganGroup
        organKey="intestines"
        position={[0, -0.48, 0.18]}
        opacity={getOpacity('intestines')}
        color={organData.intestines.color}
        emissive="#c5a480"
        onClick={onSelect}
        isSelected={selectedOrgan === 'intestines'}
        explodeOffset={getExplodeOffset('intestines')}
      >
        <group>
          {intestinesLoops.map((loop, index) => (
            <VesselPath key={index} points={loop} color={organData.intestines.color} radius={0.1} opacity={getOpacity('intestines')} />
          ))}
          <mesh position={[0, -0.02, 0.12]}>
            <torusGeometry args={[0.68, 0.11, 12, 28, Math.PI]} />
            <meshPhysicalMaterial roughness={0.72} transparent opacity={getOpacity('intestines')} />
          </mesh>
        </group>
      </OrganGroup>
    </group>
  );
}

function SceneEffects() {
  const settings = useQualitySettings();
  if (!settings.enablePostprocessing) return null;

  return (
    <EffectComposer>
      {settings.enableAO && <SSAO radius={0.08} intensity={10} luminanceInfluence={0.4} color="#000000" />}
      {settings.enableBloom && <Bloom intensity={0.12} luminanceThreshold={0.82} luminanceSmoothing={0.9} mipmapBlur />}
    </EffectComposer>
  );
}

function AnatomySceneContent({
  selectedOrgan,
  setSelectedOrgan,
  bodyShellOpacity,
  bodyShellVisible,
  muscularVisible,
  skeletonVisible,
  vascularVisible,
  organsVisible,
  explodeMode,
  isolateOrgan,
  activeSystem,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const cameraTarget = selectedOrgan ? organData[selectedOrgan]?.cameraTarget : null;
  const cameraPosition = selectedOrgan ? organData[selectedOrgan]?.cameraPosition : null;
  const focus = getLayerFocus(activeSystem);

  useEffect(() => {
    setIsAnimating(Boolean(selectedOrgan));
  }, [selectedOrgan]);

  const bodyOpacity = bodyShellVisible ? bodyShellOpacity * 0.18 * focus.body : 0;
  const muscularOpacity = getGroupOpacity({
    visible: muscularVisible,
    focus: focus.muscular,
    isolateOrgan,
    selectedOrgan,
    baseOpacity: 0.78,
    contextBase: 0.18,
  });
  const skeletonOpacity = getGroupOpacity({
    visible: skeletonVisible,
    focus: focus.skeleton,
    isolateOrgan,
    selectedOrgan,
    baseOpacity: 0.92,
    contextBase: 0.26,
  });
  const vascularOpacity = getGroupOpacity({
    visible: vascularVisible,
    focus: focus.vascular,
    isolateOrgan,
    selectedOrgan,
    baseOpacity: 0.8,
    contextBase: 0.16,
  });

  return (
    <>
      <color attach="background" args={['#12141c']} />
      <Environment preset="studio" environmentIntensity={0.35} />
      <ambientLight intensity={0.24} />
      <directionalLight position={[4, 8, 5]} intensity={0.95} color="#fff6eb" castShadow />
      <pointLight position={[-4, 2.5, 4]} intensity={0.32} color="#b24b42" />
      <pointLight position={[3.2, -1.5, 4]} intensity={0.18} color="#8db4d2" />

      <CameraController
        target={cameraTarget}
        cameraPos={cameraPosition}
        isAnimating={isAnimating}
        onAnimationComplete={() => setIsAnimating(false)}
      />

      <ContactShadows position={[0, -5.5, 0]} opacity={0.45} scale={16} blur={2.4} far={7} color="#090909" />

      <BodyShell opacity={bodyOpacity} />
      <MuscularLayer opacity={muscularOpacity} />
      <SkeletonLayer opacity={skeletonOpacity} onClick={setSelectedOrgan} isSelected={selectedOrgan === 'skeleton'} />
      <VascularLayer opacity={vascularOpacity} />
      <OrgansLayer
        selectedOrgan={selectedOrgan}
        onSelect={setSelectedOrgan}
        organsVisible={organsVisible}
        activeSystem={activeSystem}
        isolateOrgan={isolateOrgan}
        explodeMode={explodeMode}
      />

      <gridHelper args={[14, 24, '#1f2531', '#181c25']} position={[0, -5.5, 0]} />
      <SceneEffects />
    </>
  );
}

export function AnatomySidebar({
  selectedOrgan,
  setSelectedOrgan,
  bodyShellOpacity,
  setBodyShellOpacity,
  bodyShellVisible,
  setBodyShellVisible,
  muscularVisible,
  setMuscularVisible,
  skeletonVisible,
  setSkeletonVisible,
  vascularVisible,
  setVascularVisible,
  organsVisible,
  setOrgansVisible,
  explodeMode,
  setExplodeMode,
  isolateOrgan,
  setIsolateOrgan,
  activeSystem,
  setActiveSystem,
}) {
  const info = selectedOrgan ? organData[selectedOrgan] : null;

  return (
    <div className="anatomy-sidebar">
      <div className="anatomy-sidebar-section">
        <h4 className="anatomy-sidebar-label">Atlas Focus</h4>
        <div className="anatomy-system-grid">
          {systems.map((system) => (
            <button
              key={system.id}
              className={`anatomy-system-btn ${activeSystem === system.id ? 'active' : ''}`}
              onClick={() => setActiveSystem(activeSystem === system.id ? 'all' : system.id)}
            >
              <span>{system.icon}</span>
              <span>{system.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="anatomy-sidebar-section">
        <h4 className="anatomy-sidebar-label">Layer Visibility</h4>
        <div className="anatomy-layer-row">
          <span className="anatomy-layer-label">Body Shell</span>
          <input
            type="range"
            min="0"
            max="100"
            value={bodyShellOpacity * 100}
            onChange={(event) => setBodyShellOpacity(Number(event.target.value) / 100)}
            className="anatomy-scrubber"
          />
        </div>
        <div className="anatomy-layer-row">
          <label className="anatomy-layer-toggle">
            <input type="checkbox" checked={bodyShellVisible} onChange={() => setBodyShellVisible(!bodyShellVisible)} />
            <span>Body Shell</span>
          </label>
        </div>
        <div className="anatomy-layer-row">
          <label className="anatomy-layer-toggle">
            <input type="checkbox" checked={muscularVisible} onChange={() => setMuscularVisible(!muscularVisible)} />
            <span>Muscular</span>
          </label>
        </div>
        <div className="anatomy-layer-row">
          <label className="anatomy-layer-toggle">
            <input type="checkbox" checked={skeletonVisible} onChange={() => setSkeletonVisible(!skeletonVisible)} />
            <span>Skeleton</span>
          </label>
        </div>
        <div className="anatomy-layer-row">
          <label className="anatomy-layer-toggle">
            <input type="checkbox" checked={vascularVisible} onChange={() => setVascularVisible(!vascularVisible)} />
            <span>Vascular</span>
          </label>
        </div>
        <div className="anatomy-layer-row">
          <label className="anatomy-layer-toggle">
            <input type="checkbox" checked={organsVisible} onChange={() => setOrgansVisible(!organsVisible)} />
            <span>Organs</span>
          </label>
        </div>
      </div>

      <div className="anatomy-sidebar-section">
        <h4 className="anatomy-sidebar-label">View Mode</h4>
        <div className="anatomy-mode-btns">
          <button
            className={`anatomy-mode-btn ${explodeMode ? 'active' : ''}`}
            onClick={() => {
              setExplodeMode(!explodeMode);
              setIsolateOrgan(null);
            }}
          >
            Explode
          </button>
          <button
            className={`anatomy-mode-btn ${isolateOrgan ? 'active' : ''}`}
            onClick={() => {
              if (isolateOrgan) {
                setIsolateOrgan(null);
              } else if (selectedOrgan) {
                setIsolateOrgan(selectedOrgan);
                setExplodeMode(false);
              }
            }}
            disabled={!selectedOrgan}
          >
            Isolate
          </button>
          <button
            className="anatomy-mode-btn"
            onClick={() => {
              setSelectedOrgan(null);
              setIsolateOrgan(null);
              setExplodeMode(false);
              setActiveSystem('all');
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className={`anatomy-sidebar-section anatomy-organ-info ${info ? 'visible' : ''}`}>
        {info ? (
          <>
            <div className="anatomy-organ-header">
              <div className="anatomy-organ-dot" style={{ backgroundColor: info.color }} />
              <h3>{info.name}</h3>
            </div>
            <p className="anatomy-organ-region">{info.region}</p>
            <p className="anatomy-organ-desc">{info.description}</p>
            <div className="anatomy-organ-facts">
              <h4>Key Facts</h4>
              <ul>
                {info.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <div className="anatomy-organ-conditions">
              <h4>Related Conditions</h4>
              <div className="anatomy-condition-tags">
                {info.conditions.map((condition) => (
                  <span key={condition} className="anatomy-condition-tag">{condition}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="anatomy-no-selection">
            <p>Click any organ or the rib cage to inspect the full-body atlas view.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnatomyScene({ onSidebarContent }) {
  const settings = useQualitySettings();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [bodyShellOpacity, setBodyShellOpacity] = useState(1);
  const [bodyShellVisible, setBodyShellVisible] = useState(true);
  const [muscularVisible, setMuscularVisible] = useState(true);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [vascularVisible, setVascularVisible] = useState(true);
  const [organsVisible, setOrgansVisible] = useState(true);
  const [explodeMode, setExplodeMode] = useState(false);
  const [isolateOrgan, setIsolateOrgan] = useState(null);
  const [activeSystem, setActiveSystem] = useState('all');

  const handleSelection = useCallback((organKey) => {
    setSelectedOrgan((current) => (current === organKey ? null : organKey));
  }, []);

  useEffect(() => {
    if (!onSidebarContent) return;
    onSidebarContent(
      <AnatomySidebar
        selectedOrgan={selectedOrgan}
        setSelectedOrgan={handleSelection}
        bodyShellOpacity={bodyShellOpacity}
        setBodyShellOpacity={setBodyShellOpacity}
        bodyShellVisible={bodyShellVisible}
        setBodyShellVisible={setBodyShellVisible}
        muscularVisible={muscularVisible}
        setMuscularVisible={setMuscularVisible}
        skeletonVisible={skeletonVisible}
        setSkeletonVisible={setSkeletonVisible}
        vascularVisible={vascularVisible}
        setVascularVisible={setVascularVisible}
        organsVisible={organsVisible}
        setOrgansVisible={setOrgansVisible}
        explodeMode={explodeMode}
        setExplodeMode={setExplodeMode}
        isolateOrgan={isolateOrgan}
        setIsolateOrgan={setIsolateOrgan}
        activeSystem={activeSystem}
        setActiveSystem={setActiveSystem}
      />
    );
  }, [
    onSidebarContent,
    selectedOrgan,
    handleSelection,
    bodyShellOpacity,
    bodyShellVisible,
    muscularVisible,
    skeletonVisible,
    vascularVisible,
    organsVisible,
    explodeMode,
    isolateOrgan,
    activeSystem,
  ]);

  return (
    <Canvas camera={{ position: [0, 0.9, 8.8], fov: 32 }} gl={{ antialias: true, alpha: true }} dpr={settings.dpr} shadows>
      <Suspense fallback={null}>
        <AnatomySceneContent
          selectedOrgan={selectedOrgan}
          setSelectedOrgan={handleSelection}
          bodyShellOpacity={bodyShellOpacity}
          bodyShellVisible={bodyShellVisible}
          muscularVisible={muscularVisible}
          skeletonVisible={skeletonVisible}
          vascularVisible={vascularVisible}
          organsVisible={organsVisible}
          explodeMode={explodeMode}
          isolateOrgan={isolateOrgan}
          activeSystem={activeSystem}
        />
      </Suspense>
    </Canvas>
  );
}
