import React from 'react';
import dynamic from 'next/dynamic';
import { BsX, BsArrowRight, BsPlayFill } from 'react-icons/bs';

// Dynamically import the 3D component to avoid SSR issues
const AnatomyExplorer = dynamic(() => import('./AnatomyExplorer'), {
  ssr: false,
  loading: () => (
    <div className="anatomy-modal-loading">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Initializing 3D Environment...</p>
      </div>
    </div>
  ),
});

export default function AnatomyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="anatomy-modal-overlay" onClick={onClose}>
      <div className="anatomy-modal" onClick={(e) => e.stopPropagation()}>
        <AnatomyExplorer onClose={onClose} />
      </div>
    </div>
  );
}
