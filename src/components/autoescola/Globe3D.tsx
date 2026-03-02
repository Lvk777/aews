"use client";

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface Globe3DProps {
  isDark?: boolean;
}

export const Globe3D = ({ isDark = true }: Globe3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const baseColor: [number, number, number] = isDark ? [0.2, 0.4, 0.8] : [0.9, 0.95, 1.0];
    const markerColor: [number, number, number] = isDark ? [0.4, 0.8, 1.0] : [0.1, 0.5, 0.9];
    const glowColor: [number, number, number] = isDark ? [0.3, 0.6, 1.0] : [0.4, 0.7, 1.0];

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1800,
      height: 1800,
      phi: phiRef.current,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.8,
      mapSamples: 25000,
      mapBrightness: isDark ? 12 : 15,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      markers: [
        { location: [-23.5505, -46.6333], size: 0.08 }, // São Paulo
        { location: [40.7128, -74.0060], size: 0.06 },  // New York
        { location: [48.8566, 2.3522], size: 0.06 },   // Paris
        { location: [35.6762, 139.6503], size: 0.06 },  // Tokyo
      ],
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += 0.006;
      },
    });

    canvasRef.current.style.opacity = '1';

    return () => globe.destroy();
  }, [isDark]);

  return (
    <div className="relative w-full aspect-square max-w-[1200px] mx-auto overflow-visible">
      <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-1000 ${
        isDark ? 'bg-blue-600/20' : 'bg-blue-400/20'
      }`} />
      
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
          opacity: 0,
          transition: 'opacity 1s ease',
          contain: 'layout paint',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};

export default Globe3D;
