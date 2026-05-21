"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse positions normalized from 0 to 1
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out tilt translations using springs
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  
  // Transform 0-1 values into tilt degrees
  const rotateXTransform = useTransform(y, [0, 1], [maxTilt, -maxTilt]);
  const rotateYTransform = useTransform(x, [0, 1], [-maxTilt, maxTilt]);

  const rotateX = useSpring(rotateXTransform, springConfig);
  const rotateY = useSpring(rotateYTransform, springConfig);

  // Transform 0-1 values into glare background positions
  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  // Combined glare style
  const [glareBg, setGlareBg] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const normalizedX = mouseX / rect.width;
    const normalizedY = mouseY / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);

    // Update inline style for glare center position
    setGlareBg(
      `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), rgba(189, 0, 255, 0.03) 50%, transparent 100%)`
    );
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group select-none overflow-hidden rounded-sm transition-all duration-300 border border-dark-border bg-dark-surface/90 ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}
        
        {/* Glamour Glare overlay */}
        {hovered && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-100 mix-blend-screen"
            style={{
              background: glareBg,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
