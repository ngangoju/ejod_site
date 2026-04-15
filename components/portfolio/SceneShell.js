import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BsArrowLeft, BsGearFill, BsQuestionCircle, BsX, BsKeyboard } from 'react-icons/bs';
import { QualityProvider, useQuality, QUALITY_PRESETS } from './QualityContext';

// ---------- Quality Dropdown ----------
function QualityDropdown() {
  const { quality, setQuality } = useQuality();
  const [open, setOpen] = useState(false);

  return (
    <div className="scene-shell-quality">
      <button
        className="scene-shell-btn"
        onClick={() => setOpen(!open)}
        aria-label="Quality settings"
        title="Quality settings"
      >
        <BsGearFill />
        <span className="scene-shell-btn-label">{QUALITY_PRESETS[quality].label}</span>
      </button>
      {open && (
        <>
          <div className="scene-shell-quality-backdrop" onClick={() => setOpen(false)} />
          <div className="scene-shell-quality-menu">
            {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                className={`scene-shell-quality-option ${quality === key ? 'active' : ''}`}
                onClick={() => { setQuality(key); setOpen(false); }}
              >
                <span className="scene-shell-quality-dot" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- Controls Help Overlay ----------
function ControlsHelp({ controls, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="scene-shell-help-overlay" onClick={onClose}>
      <div className="scene-shell-help-card" onClick={(e) => e.stopPropagation()}>
        <div className="scene-shell-help-header">
          <h3>Controls</h3>
          <button onClick={onClose} className="scene-shell-btn" aria-label="Close help">
            <BsX />
          </button>
        </div>
        <div className="scene-shell-help-list">
          {controls.map((ctrl, i) => (
            <div key={i} className="scene-shell-help-item">
              <kbd className="scene-shell-kbd">{ctrl.key}</kbd>
              <span>{ctrl.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Loading Screen ----------
function LoadingOverlay({ progress, label }) {
  return (
    <div className="scene-shell-loading">
      <div className="scene-shell-loading-content">
        <div className="scene-shell-loading-logo">ƎJO-D</div>
        <div className="scene-shell-loading-bar-track">
          <div
            className="scene-shell-loading-bar-fill"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
        <p className="scene-shell-loading-label">{label || 'Initializing experience…'}</p>
      </div>
    </div>
  );
}

// ---------- Main Shell ----------
function SceneShellInner({
  title,
  subtitle,
  children,
  sidebar,
  controls = [],
  loading = false,
  loadingProgress = 0,
  loadingLabel,
}) {
  const [showHelp, setShowHelp] = useState(false);

  const defaultControls = [
    { key: 'Click + Drag', action: 'Rotate camera' },
    { key: 'Scroll', action: 'Zoom in / out' },
    { key: '?', action: 'Toggle this help panel' },
    ...controls,
  ];

  // Keyboard shortcut for help
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowHelp((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="scene-shell">
      {/* Loading */}
      {loading && <LoadingOverlay progress={loadingProgress} label={loadingLabel} />}

      {/* Header */}
      <header className="scene-shell-header">
        <div className="scene-shell-header-left">
          <Link href="/portfolio" className="scene-shell-back" aria-label="Back to portfolio">
            <BsArrowLeft />
          </Link>
          <div className="scene-shell-header-text">
            <h1 className="scene-shell-title">{title}</h1>
            {subtitle && <p className="scene-shell-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="scene-shell-header-right">
          <QualityDropdown />
          <button
            className="scene-shell-btn"
            onClick={() => setShowHelp(true)}
            aria-label="Show controls help"
            title="Controls (press ?)"
          >
            <BsKeyboard />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="scene-shell-body">
        <div className="scene-shell-canvas-area">
          {children}
        </div>
        {sidebar && (
          <aside className="scene-shell-sidebar">
            {sidebar}
          </aside>
        )}
      </div>

      {/* Help overlay */}
      {showHelp && (
        <ControlsHelp
          controls={defaultControls}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}

// Wrapped with QualityProvider
export default function SceneShell(props) {
  return (
    <QualityProvider>
      <SceneShellInner {...props} />
    </QualityProvider>
  );
}
