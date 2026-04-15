import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

const SceneShell = dynamic(() => import('../../components/portfolio/SceneShell'), { ssr: false });
const SurgicalScene = dynamic(() => import('../../components/portfolio/SurgicalScene'), { ssr: false });

export default function SurgeryPage() {
  const [sidebarContent, setSidebarContent] = useState(null);

  const handleSidebar = useCallback((content) => {
    setSidebarContent(content);
  }, []);

  return (
    <>
      <Head>
        <title>Surgical Skills Simulator | ƎJO-D</title>
        <meta name="description" content="Practice surgical incision technique in our interactive AR training simulator with real-time feedback and scoring." />
      </Head>
      <SceneShell
        title="Surgical Skills Simulator"
        subtitle="Click and drag to make your incision • Follow the guide path"
        sidebar={sidebarContent}
        controls={[
          { key: 'Click + Drag', action: 'Control scalpel along incision path' },
          { key: 'Stay on path', action: 'Maintain precision score' },
          { key: 'Scroll', action: 'Zoom in/out on operating field' },
        ]}
      >
        <SurgicalScene onSidebarContent={handleSidebar} />
      </SceneShell>
    </>
  );
}
