import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const QualityContext = createContext(null);

const QUALITY_PRESETS = {
  low: {
    dpr: [1, 1],
    shadowMapSize: 512,
    enablePostprocessing: false,
    enableAO: false,
    enableBloom: false,
    label: 'Performance',
  },
  medium: {
    dpr: [1, 1.5],
    shadowMapSize: 1024,
    enablePostprocessing: true,
    enableAO: false,
    enableBloom: true,
    label: 'Balanced',
  },
  high: {
    dpr: [1, 2],
    shadowMapSize: 2048,
    enablePostprocessing: true,
    enableAO: true,
    enableBloom: true,
    label: 'Quality',
  },
};

export function QualityProvider({ children }) {
  const [quality, setQuality] = useState('medium');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ejod-3d-quality');
      if (saved && QUALITY_PRESETS[saved]) {
        setQuality(saved);
      }
    } catch (e) {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ejod-3d-quality', quality);
    } catch (e) {
      // localStorage unavailable
    }
  }, [quality]);

  const value = useMemo(() => ({ quality, setQuality }), [quality]);

  return (
    <QualityContext.Provider value={value}>
      {children}
    </QualityContext.Provider>
  );
}

export function useQuality() {
  const ctx = useContext(QualityContext);
  if (!ctx) {
    // Fallback for when used outside provider
    return { quality: 'medium', setQuality: () => {} };
  }
  return ctx;
}

export function useQualitySettings() {
  const { quality } = useQuality();
  return QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium;
}

export { QUALITY_PRESETS };
export default QualityContext;
