import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  padding: 8rem 2rem;
  background-color: #000000; /* Black background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  z-index: 10;
`;

const SectionTitle = styled.h2`
  font-size: var(--fontxxl);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  
  span {
    color: var(--primary);
  }

  @media screen and (max-width: 768px) {
    font-size: var(--fontxl);
    margin-bottom: 2rem;
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BentoItem = styled.div`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-medium);
  grid-column: ${props => props.span || "span 1"};
  grid-row: ${props => props.rowSpan || "span 1"};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.bg || "rgba(0, 163, 255, 0.1)"};
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    z-index: -1;
    transition: background-color 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    
    &::before {
      background: ${props => props.hoverBg || "rgba(0, 163, 255, 0.2)"};
    }
    
    .bento-icon svg {
      fill: #ffffff;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    grid-column: span 1 !important;
  }
`;

const BentoContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  color: #ffffff;
  position: relative;
  z-index: 2;
`;

const BentoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const BentoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  margin-right: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    fill: var(--primary);
    transition: all 0.3s ease;
  }
`;

const BentoTitle = styled.h3`
  font-size: var(--fontmd);
  font-weight: 600;
  margin: 0;
`;

const BentoDescription = styled.p`
  font-size: var(--fontxs);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const BentoFooter = styled.div`
  margin-top: auto;
  font-size: var(--fontxxs);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  
  svg {
    width: 16px;
    height: 16px;
    margin-left: 0.5rem;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(0, 163, 255, 0.3) 0%, rgba(0, 163, 255, 0) 70%);
  opacity: 0.3;
  z-index: 1;
  filter: blur(100px);
  animation: pulse 8s infinite alternate;
`;

const BentoSection = () => {
  const sectionRef = useRef(null);
  const bentoItemsRef = useRef([]);
  
  useEffect(() => {
    const bentoItems = bentoItemsRef.current;
    
    // Animation for bento items
    gsap.fromTo(bentoItems, 
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Hover effect for bento items
    bentoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
    
    return () => {
      bentoItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  const addToRefs = (el) => {
    if (el && !bentoItemsRef.current.includes(el)) {
      bentoItemsRef.current.push(el);
    }
  };

  return (
    <Section ref={sectionRef}>
      <BackgroundGradient />
      
      <Container>
        <SectionTitle>Key <span>Features</span></SectionTitle>
        
        <BentoGrid>
          <BentoItem 
            ref={addToRefs} 
            span="span 2" 
            rowSpan="span 2" 
            bg="rgba(0, 163, 255, 0.1)"
            hoverBg="rgba(0, 163, 255, 0.2)"
          >
            <BentoContent>
              <BentoHeader>
                <BentoIcon className="bento-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 8.5V6H4v6.5l3.375-2.7a1 1 0 0 1 1.25 0L12 12.667l3.375-2.867a1 1 0 0 1 1.25 0L20 12.5zM4 18h16v-3.732l-3.375-2.7a1 1 0 0 0-1.25 0L12 14.434l-3.375-2.867a1 1 0 0 0-1.25 0L4 14.268V18z" />
                  </svg>
                </BentoIcon>
                <BentoTitle>48MP Pro Camera</BentoTitle>
              </BentoHeader>
              <BentoDescription>
                Capture stunning high-resolution images with incredible detail. The new 48MP main camera features a quad-pixel sensor and Photonic Engine for amazing low-light photos.
              </BentoDescription>
              <BentoFooter>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </BentoFooter>
            </BentoContent>
          </BentoItem>
          
          <BentoItem 
            ref={addToRefs}
            bg="rgba(0, 163, 255, 0.1)"
            hoverBg="rgba(0, 163, 255, 0.2)"
          >
            <BentoContent>
              <BentoHeader>
                <BentoIcon className="bento-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13 10h7l-9 13v-9H4l9-13z" />
                  </svg>
                </BentoIcon>
                <BentoTitle>A16 Bionic</BentoTitle>
              </BentoHeader>
              <BentoDescription>
                The fastest chip ever in a smartphone, with a 6-core CPU and 5-core GPU for lightning-fast performance.
              </BentoDescription>
              <BentoFooter>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </BentoFooter>
            </BentoContent>
          </BentoItem>
          
          <BentoItem 
            ref={addToRefs}
            bg="rgba(0, 163, 255, 0.1)"
            hoverBg="rgba(0, 163, 255, 0.2)"
          >
            <BentoContent>
              <BentoHeader>
                <BentoIcon className="bento-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h3v2h-3v3h-2v-3H8v-2h3V8h2v3z" />
                  </svg>
                </BentoIcon>
                <BentoTitle>Dynamic Island</BentoTitle>
              </BentoHeader>
              <BentoDescription>
                A magical new way to interact with iPhone, that fluidly expands to show important alerts and activities.
              </BentoDescription>
              <BentoFooter>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </BentoFooter>
            </BentoContent>
          </BentoItem>
          
          <BentoItem 
            ref={addToRefs}
            span="span 2"
            bg="rgba(0, 163, 255, 0.1)"
            hoverBg="rgba(0, 163, 255, 0.2)"
          >
            <BentoContent>
              <BentoHeader>
                <BentoIcon className="bento-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 4h6v2H9V4zm11 7h-6.25l2.778-3.164-1.416-1.244L11.5 11.293 7.889 6.592 6.472 7.836l2.778 3.164H3v2h6.278L6.5 16.164l1.416 1.244 3.611-4.7 3.611 4.7 1.416-1.244-2.778-3.164H20v-2z" />
                  </svg>
                </BentoIcon>
                <BentoTitle>Always-On Display</BentoTitle>
              </BentoHeader>
              <BentoDescription>
                Your Lock Screen stays visible, showing the time, widgets, and notifications without waking your iPhone.
              </BentoDescription>
              <BentoFooter>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </BentoFooter>
            </BentoContent>
          </BentoItem>
          
          <BentoItem 
            ref={addToRefs}
            bg="rgba(0, 163, 255, 0.1)"
            hoverBg="rgba(0, 163, 255, 0.2)"
          >
            <BentoContent>
              <BentoHeader>
                <BentoIcon className="bento-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M5 15v2a2 2 0 0 0 1.85 1.995L7 19h10a2 2 0 0 0 1.995-1.85L19 17v-2h-2v2H7v-2H5zm6-9h2v7h-2V6z" />
                  </svg>
                </BentoIcon>
                <BentoTitle>All-Day Battery</BentoTitle>
              </BentoHeader>
              <BentoDescription>
                Up to 29 hours of video playback, the longest battery life ever in an iPhone.
              </BentoDescription>
              <BentoFooter>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </BentoFooter>
            </BentoContent>
          </BentoItem>
        </BentoGrid>
      </Container>
    </Section>
  );
};

export default BentoSection;
