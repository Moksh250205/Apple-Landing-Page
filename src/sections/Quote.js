import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import styled, { keyframes } from "styled-components";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--darker);
`;

const TextContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-radial-1);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const moveUp = keyframes`
  100% {
    transform: translateY(0);
  }
`;

const Text = styled.p`
  width: 50%;
  font-size: var(--fontlg);
  position: relative;
  height: var(--fontmd);
  overflow: hidden;
  margin-bottom: 0.5rem;

  span {
    position: absolute;
    transform: translateY(3rem);
    animation-name: ${moveUp};
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-delay: ${(props) => props.delay};
    font-family: var(--fontL);
    color: var(--white);
    text-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
    
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: 0;
      width: 4px;
      height: 100%;
      background: var(--primary);
      transform: scaleY(0);
      transform-origin: top;
      animation: lineReveal 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;
      animation-delay: ${(props) => props.delay};
    }
  }

  .author {
    width: 100%;
    text-align: end;
    color: var(--primary);
    font-family: var(--fontR);
    opacity: 0.9;
    font-style: italic;
    
    &::before {
      display: none;
    }
  }

  @media screen and (max-width: 70em) {
    width: 70%;
  }

  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
    height: var(--fontsm);
  }
  @media screen and (max-width: 40em) {
    width: 90%;
  }
  @media screen and (max-width: 30em) {
    font-size: var(--fontxs);
  }
`;

const Quote = () => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let Elem = sectionRef.current;

    let trigger = ScrollTrigger.create({
      trigger: Elem,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <TextContainer>
        <Text delay="0s">
          <span>&#8220; You can't connect the dots looking forward;</span>
        </Text>
        <Text delay="0.4s">
          <span>&nbsp;&nbsp;&nbsp;you can only connect them looking backward.</span>
        </Text>
        <Text delay="0.8s">
          <span>&nbsp;&nbsp;&nbsp;so you have to trust that the dots</span>
        </Text>
        <Text delay="1.2s">
          <span>&nbsp;&nbsp;&nbsp;will somehow connect in your future. &#8221;</span>
        </Text>
        <Text delay="1.6s">
          <span className="author">&#x23AF; Steve Jobs</span>
        </Text>
      </TextContainer>
    </Section>
  );
};

export default Quote;
