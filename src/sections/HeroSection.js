import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundVideo from "../assets/video/Ink - 21536.mp4";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const Title = styled.h1`
  position: relative;
  font-size: var(--fontBig);
  font-weight: 700;
  color: var(--white);
  text-align: center;
  line-height: 1;
  margin-bottom: 1rem;
  text-transform: uppercase;
  
  span {
    background: var(--gradient-primary);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: var(--gradient-size);
    animation: gradient-shift 8s linear infinite;
  }
  
  .word {
    display: inline-block;
    overflow: hidden;
    margin-right: 0.5rem;
  }
  
  .char {
    display: inline-block;
    transform: translateY(100%);
    opacity: 0;
  }

  @media screen and (max-width: 768px) {
    font-size: calc(var(--fontxxxl) * 0.8);
  }
`;

const SubTitle = styled.h2`
  font-size: var(--fontlg);
  font-weight: 400;
  color: var(--white);
  opacity: 0.8;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  
  span {
    color: var(--secondary);
  }
  
  @media screen and (max-width: 768px) {
    font-size: var(--fontmd);
  }
`;

const ExploreButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  color: var(--white);
  font-size: var(--fontsm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1rem 3rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: all var(--transition-medium);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    z-index: -2;
    border-radius: var(--radius-full);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: var(--dark);
    border-radius: var(--radius-full);
    z-index: -1;
    transition: all var(--transition-medium);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--glow-primary);
    
    &::after {
      opacity: 0.8;
    }
  }
  
  .icon {
    margin-left: 0.5rem;
    transition: transform var(--transition-medium);
  }
  
  &:hover .icon {
    transform: translateX(5px);
  }
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(3, 0, 20, 0.4) 0%, rgba(3, 0, 20, 0.8) 70%, rgba(3, 0, 20, 0.95) 100%);
  }

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: 0.6;
  }
`;

const Globe = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  
  .globe-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--gradient-radial-1);
    animation: pulse 4s ease-in-out infinite alternate;
    
    &::before {
      content: '';
      position: absolute;
      width: 110%;
      height: 110%;
      top: -5%;
      left: -5%;
      border-radius: 50%;
      background: transparent;
      border: 2px solid rgba(58, 134, 255, 0.2);
      animation: spin 20s linear infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      width: 120%;
      height: 120%;
      top: -10%;
      left: -10%;
      border-radius: 50%;
      background: transparent;
      border: 2px solid rgba(131, 56, 236, 0.2);
      animation: spin 30s linear infinite reverse;
    }
  }
  
  .globe-inner {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(3, 0, 20, 0.1) 60%);
    backdrop-filter: blur(8px);
  }
  
  .globe-dots {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    
    .dot {
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--white);
      border-radius: 50%;
      opacity: 0.6;
    }
  }
  
  @media screen and (max-width: 1200px) {
    width: 400px;
    height: 400px;
    right: -150px;
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  z-index: 5;
  width: 180px;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--white);
  opacity: 0;
  transform: translateY(20px);
  
  h4 {
    font-size: var(--fontxs);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  p {
    font-size: var(--fontxxs);
    opacity: 0.8;
  }
  
  &.card-1 {
    left: 25%;
    bottom: 20%;
  }
  
  &.card-2 {
    right: 25%;
    bottom: 20%;
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ShineText = styled.h3`
  position: absolute;
  font-size: var(--fontxs);
  font-weight: 400;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.6;
  white-space: nowrap;
  
  &.top-left {
    top: 2rem;
    left: 2rem;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;
  }
  
  &.bottom-right {
    bottom: 2rem;
    right: 2rem;
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Helper function to create random dots
const createDots = (count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dots.push({ id: i, x, y });
  }
  return dots;
};

const HeroSection = () => {
  const [dots] = useState(() => createDots(100));
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const globeRef = useRef(null);
  const charElements = useRef([]);
  useEffect(() => {
    // Setup title animation
    const chars = titleRef.current.querySelectorAll('.char');
    charElements.current = chars;

    gsap.fromTo(chars, 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Animate subtitle
    gsap.fromTo(subtitleRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2
      }
    );

    // Animate button
    gsap.fromTo(buttonRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5
      }
    );

    // Animate floating cards
    gsap.to([card1Ref.current, card2Ref.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.8
    });

    // Animate globe
    gsap.fromTo(globeRef.current,
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8
      }
    );

    // Create scroll trigger animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 30%",
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      },
      onLeaveBack: () => {
        gsap.to(chars, {
          y: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.in"
        });
      }
    });
  }, []);

  return (
    <Section >
      <VideoContainer>
        <video src={backgroundVideo} type="video/mp4" autoPlay muted loop />
      </VideoContainer>
      
      <ContentWrapper>
        <Title ref={titleRef}>
          {/* Split text for character animation */}
          <div className="word">
            <span className="char">i</span>
            <span className="char">P</span>
            <span className="char">h</span>
            <span className="char">o</span>
            <span className="char">n</span>
            <span className="char">e</span>
          </div>
          <div className="word">
            <span className="char">1</span>
            <span className="char">4</span>
          </div>
          <div className="word">
            <span className="char">P</span>
            <span className="char">r</span>
            <span className="char">o</span>
          </div>
          <div className="word">
            <span className="char"><span>M</span></span>
            <span className="char"><span>a</span></span>
            <span className="char"><span>x</span></span>
          </div>
        </Title>
        
        <SubTitle ref={subtitleRef}>
          Experience the ultimate cutting edge technology with the <span>most powerful</span> iPhone ever created.
        </SubTitle>
        
        <ExploreButton ref={buttonRef} className="shine">
          Explore Features <span className="icon">→</span>
        </ExploreButton>
      </ContentWrapper>
      
      <Globe ref={globeRef}>
        <div className="globe-container">
          <div className="globe-inner"></div>
          <div className="globe-dots">
            {dots.map(dot => (
              <div 
                key={dot.id} 
                className="dot" 
                style={{ 
                  top: `${dot.y}%`, 
                  left: `${dot.x}%`,
                  animationDelay: `${dot.id * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </Globe>
      
      <FloatingCard className="card-1 float" ref={card1Ref}>
        <h4>48MP Pro Camera</h4>
        <p>Revolutionary quad-pixel sensor and Photonic Engine</p>
      </FloatingCard>
      
      <FloatingCard className="card-2 float" ref={card2Ref}>
        <h4>A16 Bionic Chip</h4>
        <p>The fastest chip ever in a smartphone</p>
      </FloatingCard>
      
      <ShineText className="top-left">Apple iPhone 14 Pro Max</ShineText>
      <ShineText className="bottom-right">Scroll to Explore</ShineText>
    </Section>
  );
};

export default HeroSection;
