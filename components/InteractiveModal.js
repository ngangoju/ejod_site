import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for 3D components
const AnatomyExplorer = dynamic(() => import('./AnatomyExplorer'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const CampusExplorer = dynamic(() => import('./CampusExplorer'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const SurgicalSimulator = dynamic(() => import('./SurgicalSimulator'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function LoadingScreen() {
  return (
    <div className="anatomy-modal-loading">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Initializing Interactive Environment...</p>
      </div>
    </div>
  );
}

export default function InteractiveModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'anatomy':
        return <AnatomyExplorer onClose={onClose} />;
      case 'campus':
        return <CampusExplorer onClose={onClose} />;
      case 'surgical':
        return <SurgicalSimulator onClose={onClose} />;
      default:
        return <AnatomyExplorer onClose={onClose} />;
    }
  };

  return (
    <div className="anatomy-modal-overlay" onClick={onClose}>
      <div className="anatomy-modal" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
}
