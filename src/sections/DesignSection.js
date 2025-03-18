import React, { useLayoutEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  color: var(--white);
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: var(--fontBig);
  font-weight: 700;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);

  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontxxl);
  }
`;

const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);

  @media screen and (max-width: 64em) {
    grid-template-columns: 1fr;
  }
`;

const DesignCard = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  transition: transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    padding: 1px;
    background: var(--gradient-primary);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
  }

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: var(--fontlg);
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--white);
  }

  p {
    font-size: var(--fontsm);
    color: var(--greyLight);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--fontxs);
    color: var(--greyLight);

    &::before {
      content: '•';
      color: var(--primary);
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 48em) {
    padding: 1.5rem;
  }
`;

const BackgroundEffect = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 163, 255, 0.1) 0%,
    transparent 70%
  );
  z-index: 1;
`;

const DesignSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%",
          scrub: true,
        },
      });

      // Animate grid
      gsap.to(gridRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <BackgroundEffect />
      <ContentWrapper>
        <Title ref={titleRef}>Revolutionary Design</Title>
        <DesignGrid ref={gridRef}>
          <DesignCard>
            <h3>Premium Materials</h3>
            <p>
              Crafted from aerospace-grade aluminum and durable glass, the iPhone 14 Pro Max features a sophisticated design that's both beautiful and resilient.
            </p>
            <div className="feature-list">
              <div className="feature-item">Aerospace-grade aluminum frame</div>
              <div className="feature-item">Ceramic Shield front cover</div>
              <div className="feature-item">Textured matte glass back</div>
              <div className="feature-item">IP68 water and dust resistance</div>
            </div>
          </DesignCard>

          <DesignCard>
            <h3>Dynamic Island</h3>
            <p>
              Experience the future of interaction with Dynamic Island, a revolutionary way to interact with your iPhone that adapts to show important information and controls.
            </p>
            <div className="feature-list">
              <div className="feature-item">Adaptive interface</div>
              <div className="feature-item">Real-time notifications</div>
              <div className="feature-item">Music controls</div>
              <div className="feature-item">App integration</div>
            </div>
          </DesignCard>
        </DesignGrid>
      </ContentWrapper>
    </Section>
  );
};

export default DesignSection;
