import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const Section = styled.section`
  width: 100vw;
  min-height: 200vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--dark);
  color: var(--white);
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 64em) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-size: var(--fontBig);
  font-weight: 700;
  margin: 4rem 0;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontxxl);
    margin: 2rem 0;
  }
`;

const FeatureBlock = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  opacity: 0;
  transform: translateY(20px);

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

  @media screen and (max-width: 48em) {
    padding: 1.5rem;
  }
`;

const Title = styled.h3`
  font-size: var(--fontlg);
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--white);
  
  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
  }
`;

const Text = styled.p`
  font-size: var(--fontsm);
  color: var(--greyLight);
  margin-bottom: 1.5rem;
  line-height: 1.5;

  @media screen and (max-width: 48em) {
    font-size: var(--fontxs);
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  span {
    font-size: var(--fontxl);
    font-weight: 700;
    color: var(--primary);
  }
  
  small {
    font-size: var(--fontxs);
    color: var(--greyLight);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 0;
  transform: rotate(-25deg);
  z-index: 1;

  @media screen and (max-width: 48em) {
    padding: 2rem 0;
    transform: rotate(-15deg);
  }
`;

const MovingText = styled.h2`
  font-size: var(--fontxxl);
  font-weight: 700;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontlg);
  }
`;

const DisplaySection = () => {
  const container = useRef(null);
  const textOne = useRef(null);
  const textTwo = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main title
      gsap.to(sectionRef.current.querySelector('.main-title'), {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%",
          scrub: true,
        },
      });

      // Animate feature blocks
      gsap.to('.feature-block', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.feature-block',
          start: "top bottom",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // Animate moving text
      gsap.to(textOne.current, {
        x: "-20%",
        scrollTrigger: {
          trigger: container.current,
          start: "top-=500 top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(textTwo.current, {
        x: "20%",
        scrollTrigger: {
          trigger: container.current,
          start: "top-=500 top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <MainTitle className="main-title">
        Immersive Display Experience
      </MainTitle>

      <ContentWrapper>
        <FeatureBlock className="feature-block">
          <Title>Super Retina XDR Display</Title>
          <Text>
            Experience true-to-life colors and incredible brightness with our most advanced OLED display. The Super Retina XDR display delivers up to 2000 nits peak brightness for stunning HDR content and exceptional outdoor readability.
          </Text>
          <Stat>
            <span>2000</span>
            <small>nits peak brightness</small>
          </Stat>
        </FeatureBlock>

        <FeatureBlock className="feature-block">
          <Title>ProMotion Technology</Title>
          <Text>
            Enjoy ultra-smooth scrolling and responsive touch with adaptive refresh rates up to 120Hz. ProMotion technology automatically adjusts to match the motion of your content, preserving battery life when you need it most.
          </Text>
          <Stat>
            <span>120</span>
            <small>Hz refresh rate</small>
          </Stat>
        </FeatureBlock>

        <FeatureBlock className="feature-block">
          <Title>Ceramic Shield</Title>
          <Text>
            Protected by the Ceramic Shield front cover, which goes beyond glass by adding a new high-temperature crystallization step that grows nano-ceramic crystals within the glass matrix.
          </Text>
          <Stat>
            <span>4x</span>
            <small>better drop performance</small>
          </Stat>
        </FeatureBlock>

        <FeatureBlock className="feature-block">
          <Title>Always-On Display</Title>
          <Text>
            Your essential information is always visible at a glance. The Always-On display intelligently dims when you're not using it, preserving battery life while keeping your important information accessible.
          </Text>
          <Stat>
            <span>1</span>
            <small>Hz refresh in Always-On mode</small>
          </Stat>
        </FeatureBlock>
      </ContentWrapper>

      <TextContainer ref={container}>
        <MovingText ref={textOne}>Tougher than ever!</MovingText>
        <MovingText ref={textTwo}>Every touch matters.</MovingText>
      </TextContainer>
    </Section>
  );
};

export default DisplaySection;
