import React, { useLayoutEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import a15 from "../assets/Images/A15-Bionic.jpg";

const Section = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--dark);
  color: var(--white);
  overflow: hidden;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fontBig);
  font-weight: 700;
  z-index: 1;
  opacity: 0;

  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }
  @media screen and (max-width: 64em) {
    font-size: var(--fontxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontxl);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 163, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
`;

const Processor = styled.div`
  width: 25%;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${glow} 3s ease infinite;
  padding: 1rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  border: var(--glass-border);
  opacity: 0;
  scale: 0.8;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 10px rgba(0, 163, 255, 0.3));
  }

  @media screen and (max-width: 48em) {
    display: none;
  }
`;

const Text = styled.div`
  font-size: var(--fontxs);
  color: var(--greyLight);
  width: 30%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);

  span {
    margin: 0.5rem 0;
    padding-left: 2rem;
    line-height: 1.6;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      background: var(--primary);
      border-radius: 50%;
    }
  }

  @media screen and (max-width: 64em) {
    width: 50%;
  }
  @media screen and (max-width: 48em) {
    width: 100%;
    font-size: var(--fontxxs);
    span {
      width: 40%;
      padding-left: 1rem;
    }

    & > *:last-child {
      align-self: flex-end;
      padding-left: 0;
      padding-right: 1rem;
      text-align: right;
    }
  }
`;

const ProcessorSection = () => {
  const sectionRef = useRef(null);
  const processorRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.to(sectionRef.current.querySelector('h1'), {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%",
          scrub: true,
        },
      });

      // Animate processor
      gsap.to(processorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: processorRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      // Animate text
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
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
      <Title>A16 Bionic Chip</Title>
      <Processor ref={processorRef}>
        <img src={a15} alt="A16 Bionic processor" />
      </Processor>
      <Text ref={textRef}>
        <span>
          The A16 Bionic chip features a 6-core CPU with 2 performance cores and 4 efficiency cores, delivering up to 40% faster performance than the competition. Its 16-core Neural Engine can perform up to 17 trillion operations per second.
        </span>
        <span>
          With a 5-core GPU and 16-core Neural Engine, the A16 Bionic enables advanced machine learning capabilities, enhanced computational photography, and smooth graphics performance for the most demanding apps and games.
        </span>
      </Text>
    </Section>
  );
};

export default ProcessorSection;
