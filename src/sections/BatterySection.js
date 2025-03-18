/* eslint-disable react-hooks/exhaustive-deps */
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--dark);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 70% 50%,
      rgba(0, 163, 255, 0.1) 0%,
      transparent 70%
    );
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 64em) {
    padding: 0 2rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 500px;
  opacity: 0;
  transform: translateX(-20px);

  @media screen and (max-width: 48em) {
    position: absolute;
    top: 2rem;
    left: 2rem;
    transform: none;
  }
`;

const Title = styled.h1`
  font-size: var(--fontxxxl);
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontxl);
    width: 80%;
  }
`;

const Description = styled.p`
  font-size: var(--fontsm);
  color: var(--greyLight);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 400px;

  @media screen and (max-width: 48em) {
    font-size: var(--fontxs);
    width: 90%;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
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
    font-size: var(--fontxxs);
  }
`;

const Battery = styled.ul`
  position: relative;
  list-style: none;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  width: 15rem;
  box-shadow: var(--glass-shadow);

  li {
    width: 100%;
    height: 5rem;
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    opacity: 0;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  & > *:not(:first-child):not(:last-child) {
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 48em) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12rem;
  }
`;

const BatterySection = () => {
  const battery = useRef(null);
  const textContent = useRef(null);
  let elements = gsap.utils.selector(battery);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text content
      gsap.to(textContent.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textContent.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      // Animate battery bars
      elements("li").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
          opacity: 1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section id="battery">
      <ContentWrapper>
        <TextContent ref={textContent}>
          <Title>All-day battery life</Title>
          <Description>
            Experience exceptional battery performance with advanced power management and up to 29 hours of video playback.
          </Description>
          <FeatureList>
            <li>29 hours video playback</li>
            <li>Fast charging</li>
            <li>Wireless charging</li>
          </FeatureList>
        </TextContent>

        <Battery ref={battery}>
          <li />
          <li />
          <li />
          <li />
          <li />
        </Battery>
      </ContentWrapper>
    </Section>
  );
};

export default BatterySection;
