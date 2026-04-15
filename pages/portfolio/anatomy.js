import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

const SceneShell = dynamic(() => import('../../components/portfolio/SceneShell'), { ssr: false });
const AnatomyScene = dynamic(() => import('../../components/portfolio/AnatomyScene'), { ssr: false });
const AnatomySidebarModule = dynamic(
  () => import('../../components/portfolio/AnatomyScene').then((mod) => ({ default: () => null })),
  { ssr: false }
);

export default function AnatomyPage() {
  const [sidebarContent, setSidebarContent] = useState(null);

  const handleSidebar = useCallback((content) => {
    setSidebarContent(content);
  }, []);

  return (
    <>
      <Head>
        <title>Medical Anatomy Explorer | ƎJO-D</title>
        <meta name="description" content="Interactive atlas-style 3D anatomy explorer with full-body context, layered systems, organ focus, and in-place anatomical relationships." />
      </Head>
      <SceneShell
        title="Medical Anatomy Explorer"
        subtitle="Atlas-style full body anatomy • Click structures to inspect • Drag to rotate"
        sidebar={sidebarContent}
        controls={[
          { key: 'Click organ', action: 'Select and fly to organ' },
          { key: 'Body shell', action: 'Adjust outer shell transparency' },
          { key: 'Layer toggles', action: 'Reveal muscular, skeletal, vascular, and organ systems' },
          { key: 'Explode', action: 'Spread internal structures for clarity' },
          { key: 'Isolate', action: 'Focus on a selected structure in context' },
        ]}
      >
        <AnatomyScene onSidebarContent={handleSidebar} />
      </SceneShell>
    </>
  );
}
