import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model3 from "../components/Scene3";
import { AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useContext } from "react";
import { ColorContext } from "./../context/ColorContext";
import { useEffect } from "react";
import gsap from "gsap";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: var(--dark);
  overflow: hidden;
`;

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  transition: background-color 0.5s ease;

  @media screen and (max-width: 64em) {
    padding: 0 2rem;
    flex-direction: column;
  }
`;

const Phone = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: grab;

  @media screen and (max-width: 64em) {
    width: 100%;
    height: 60%;
  }
`;

const Colors = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--glass-blur);
  padding: 0.8rem;
  border-radius: var(--radius-lg);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);

  @media screen and (max-width: 64em) {
    left: 10%;
  }
`;

const Color = styled.li`
  list-style: none;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0.4rem 0;
  border: 2px solid var(--white);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }
`;

const Details = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 0 40px rgba(0, 163, 255, 0.1),
    inset 0 0 20px rgba(0, 163, 255, 0.05);
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(0, 163, 255, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(0, 163, 255, 0.2);
    box-shadow: 
      0 0 60px rgba(0, 163, 255, 0.15),
      inset 0 0 30px rgba(0, 163, 255, 0.1);

    &::before {
      opacity: 1;
    }
  }

  @media screen and (max-width: 64em) {
    width: 100%;
    align-items: center;
    margin-top: 2rem;
  }
`;

const Title = styled.h2`
  font-size: var(--fontxl);
  font-weight: 800;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.2rem 0;
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
  text-shadow: 0 2px 10px rgba(0, 163, 255, 0.2);

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--gradient-primary);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const SubTitle = styled.h2`
  font-size: var(--fontxs);
  font-family: var(--fontR);
  color: var(--greyLight);
  margin: 0.2rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    background: var(--primary);
    border-radius: 50%;
  }
`;

const Price = styled.div`
  font-size: var(--fontmd);
  color: var(--primary);
  font-weight: 700;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(0, 163, 255, 0.05);
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 163, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 163, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  span {
    font-size: var(--fontxxs);
    color: var(--greyLight);
    font-weight: normal;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  outline: none;
  background: var(--gradient-primary);
  color: var(--white);
  font-weight: 600;
  font-size: var(--fontxs);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 5px 15px rgba(0, 163, 255, 0.3),
      0 0 30px rgba(0, 163, 255, 0.2);

    &::before {
      left: 100%;
    }
  }
`;

const BtnLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--fontxs);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.8rem;
  border-radius: 50px;
  background: rgba(0, 163, 255, 0.05);
  border: 1px solid rgba(0, 163, 255, 0.1);
  letter-spacing: 0.5px;

  &:hover {
    color: var(--white);
    background: rgba(0, 163, 255, 0.1);
    border-color: rgba(0, 163, 255, 0.2);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const IndicatorText = styled.div`
  font-size: var(--fontxxs);
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  backdrop-filter: var(--glass-blur);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--white);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  span {
    color: var(--primary);
    font-weight: 600;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 163, 255, 0.15) 0%,
    transparent 70%
  );
  z-index: 0;
  animation: pulse 4s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;

const PricingSection = () => {
  const sectionRef = useRef(null);
  const { currentColor, changeColorContext } = useContext(ColorContext);

  useEffect(() => {
    sectionRef.current.style.backgroundColor = `rgba(${currentColor.rgbColor},0.1)`;
  }, [currentColor]);

  let updateColor = (color, text, rgbColor) => {
    const colorObj = {
      color,
      text,
      rgbColor,
    };
    changeColorContext(colorObj);
  };

  return (
    <Container>
      <BackgroundGradient />
      <Section ref={sectionRef}>
        <Phone>
          <IndicatorText>
            <span>360°</span> Rotate to explore
          </IndicatorText>
          <Canvas camera={{ fov: 14 }}>
            <ambientLight intensity={1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <Model3 />
            </Suspense>
            <Environment preset="night" />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <OrbitControls enableZoom={false} />
          </Canvas>

          <Colors>
            <Color
              color="#9BB5CE"
              onClick={() =>
                updateColor("#9BB5CE", "Sierra Blue", "155, 181, 206")
              }
            />
            <Color
              color="#F9E5C9"
              onClick={() => updateColor("#F9E5C9", "Gold", "249, 229, 201")}
            />
            <Color
              color="#505F4E"
              onClick={() =>
                updateColor("#505F4E", "Alpine Green", "80, 95, 78")
              }
            />
            <Color
              color="#574f6f"
              onClick={() =>
                updateColor("#574f6f", "Deep Purple", "87, 79, 111")
              }
            />
            <Color
              color="#A50011"
              onClick={() => updateColor("#A50011", "Red", "165, 0, 17")}
            />
            <Color
              color="#215E7C"
              onClick={() => updateColor("#215E7C", "Blue", "33, 94, 124")}
            />
          </Colors>
        </Phone>

        <Details>
          <SubTitle>iPhone</SubTitle>
          <Title>14 Pro Max</Title>
          <Price>
            From $1099 <span>*</span>
          </Price>
          <ButtonContainer>
            <Btn>Buy Now</Btn>
            <BtnLink href="#">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BtnLink>
          </ButtonContainer>
        </Details>
      </Section>
    </Container>
  );
};

export default PricingSection;
