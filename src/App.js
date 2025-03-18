import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import HeroSection from "./sections/HeroSection";
import DisplaySection from "./sections/DisplaySection";
import ProcessorSection from "./sections/ProcessorSection";
import DesignSection from "./sections/DesignSection";
import BatterySection from "./sections/BatterySection";
import BentoSection from "./sections/BentoSection";
import PricingSection from "./sections/PricingSection";
import Preloader from "./components/Preloader";
import PhoneModel from "./sections/PhoneModel";
import Quote from "./sections/Quote";
import { ColorContextProvider } from "./context/ColorContext";
import ColorSection from "./sections/ColorSection";
import CameraSection from "./sections/CameraSection";
import gsap from "gsap";
import styled from "styled-components";

// Styled components for cursor
const MagicCursor = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s, border 0.2s, opacity 0.2s;
  mix-blend-mode: difference;
  
  &.active {
    width: 60px;
    height: 60px;
    background: rgba(58, 134, 255, 0.1);
  }
  
  &.link-active {
    width: 80px;
    height: 80px;
    border-width: 3px;
    border-color: var(--secondary);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorDot = styled.div`
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  z-index: 9999;
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1
      });
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    // Show cursor when mouse enters the viewport
    gsap.to([cursor, cursorDot], {
      opacity: 1,
      duration: 0.4,
      delay: 0.3
    });
    
    // Apply hover effects on interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        borderColor: 'var(--secondary)',
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        borderColor: 'var(--primary)',
        duration: 0.3
      });
    };
    
    const interactiveElements = document.querySelectorAll('button, a, input, .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Loader animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MagicCursor ref={cursorRef} />
          <CursorDot ref={cursorDotRef} />
          
          <Quote />
          <PhoneModel />
          <HeroSection />
          <DesignSection />
          <DisplaySection />
          <ProcessorSection />
          <BatterySection />
          <BentoSection />
          <ColorContextProvider>
            <ColorSection />
            <CameraSection />
            <PricingSection />
          </ColorContextProvider>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
