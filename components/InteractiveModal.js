import React, { useEffect, useRef } from 'react';
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
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore later
    const previousFocusedElement = document.activeElement;

    // Focus the dialog itself
    if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      
      if (e.key === 'Tab' && dialogRef.current) {
        // Basic focus trap within dialog
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusedElement) {
        previousFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

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

  const getTitle = () => {
    switch(type) {
      case 'anatomy': return "Medical Anatomy Explorer Demo";
      case 'campus': return "Campus Virtual Tour Demo";
      case 'surgical': return "Surgical Skills Simulator Demo";
      default: return "Interactive Demo";
    }
  }

  return (
    <div className="anatomy-modal-overlay" onClick={onClose}>
      <div 
        className="anatomy-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={getTitle()}
        ref={dialogRef}
        tabIndex={-1}
      >
        {renderContent()}
      </div>
    </div>
  );
}
