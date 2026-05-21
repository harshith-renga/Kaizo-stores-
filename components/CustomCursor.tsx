"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for trailing effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track all interactive hover elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .interactive-3d'
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHovered(true));
        target.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Run initially and set up a mutation observer to catch newly added elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // CSS styling to hide default cursor on pointer-capable devices
    const style = document.createElement("style");
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        a, button, [role="button"], input, select, textarea, .interactive-3d, body {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!mounted) return null;

  // Render cursor elements (hidden on mobile devices without mouse pointers)
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Ring with Spring lag */}
      <motion.div
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(189, 0, 255, 0.1)" : "rgba(189, 0, 255, 0)",
          borderColor: hovered ? "#BD00FF" : "rgba(189, 0, 255, 0.7)",
          boxShadow: hovered 
            ? "0 0 15px rgba(189, 0, 255, 0.6), inset 0 0 10px rgba(189, 0, 255, 0.3)" 
            : "0 0 0px rgba(189, 0, 255, 0)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      {/* Center Dot (precise position) */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 0.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}
