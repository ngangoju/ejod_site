import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const assetDir = path.join(root, 'public', 'models', 'anatomy');
const assetPath = path.join(assetDir, 'anatomy-atlas.glb');

const requirements = [
  'Use a neutral standing pose aligned to world origin.',
  'Group or name meshes by layer: body shell, muscular, skeleton, vascular, organs.',
  'Preserve major landmarks: skull, clavicle, sternum, ribs, pelvis.',
  'Keep organ node names stable for camera targeting and isolation.',
];

console.log('Anatomy asset directory:', assetDir);

if (!fs.existsSync(assetDir)) {
  console.error('Missing directory: public/models/anatomy');
  process.exit(1);
}

if (!fs.existsSync(assetPath)) {
  console.warn('No anatomy atlas asset found yet.');
  console.warn('Expected file: public/models/anatomy/anatomy-atlas.glb');
  console.warn('Preparation checklist:');
  requirements.forEach((item) => console.warn(`- ${item}`));
  process.exit(0);
}

const stats = fs.statSync(assetPath);
console.log('Found anatomy asset:', assetPath);
console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

if (stats.size > 40 * 1024 * 1024) {
  console.warn('Asset is larger than 40 MB. Consider texture compression and mesh optimization before shipping.');
}

console.log('Validation complete.');
