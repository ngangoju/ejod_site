import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

const SceneShell = dynamic(() => import('../../components/portfolio/SceneShell'), { ssr: false });
const CampusScene = dynamic(() => import('../../components/portfolio/CampusScene'), { ssr: false });

export default function CampusPage() {
  const [sidebarContent, setSidebarContent] = useState(null);

  const handleSidebar = useCallback((content) => {
    setSidebarContent(content);
  }, []);

  return (
    <>
      <Head>
        <title>Campus Virtual Tour | ƎJO-D</title>
        <meta name="description" content="Explore our interactive 3D campus virtual tour — navigate buildings, take guided tours, and explore interiors." />
      </Head>
      <SceneShell
        title="Campus Virtual Tour"
        subtitle="Explore our digital twin campus • Click buildings for info"
        sidebar={sidebarContent}
        controls={[
          { key: 'Click building', action: 'Select and fly to building' },
          { key: 'Guided Tour', action: 'Auto-navigate campus highlights' },
          { key: 'Enter Building', action: 'View interior details' },
        ]}
      >
        <CampusScene onSidebarContent={handleSidebar} />
      </SceneShell>
    </>
  );
}
