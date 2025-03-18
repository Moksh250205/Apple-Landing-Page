/* eslint-disable react-hooks/exhaustive-deps */
import gsap from "gsap";
import React from "react";
import { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model2 from "../components/Scene2";
import { useContext } from "react";
import { ColorContext } from "./../context/ColorContext";
import { useEffect } from "react";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background: var(--dark);
  z-index: 10;
  box-shadow: 0 0 10px 0 rgb(255, 255, 255);
`;

const ModelContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, var(--dark), transparent);
    pointer-events: none;
  }
`;

const InfoPanel = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5%;
  z-index: 10;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    background: rgba(3, 0, 20, 0.7);
    backdrop-filter: blur(10px);
  }
`;

const ColorTitle = styled.h2`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: ${props => props.color || 'var(--white)'};
  margin-bottom: 2rem;
  line-height: 1;
  text-transform: uppercase;
  position: relative;
  opacity: 0.9;
  transition: color 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: ${props => props.color || 'var(--white)'};
    transition: background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

const ColorDescription = styled.p`
  font-size: var(--fontmd);
  font-weight: 300;
  color: var(--white);
  max-width: 500px;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const ColorSwatches = styled.div`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
  
  &::before {
    content: 'Select a color';
    position: absolute;
    top: -30px;
    left: 0;
    font-size: var(--fontxs);
    color: var(--white);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const ColorSwatch = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: ${props => props.color};
  
  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: border-color 0.3s ease;
  }
  
  &.active {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${props => `${props.color}80`};
    
    &::after {
      border-color: var(--white);
    }
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px ${props => `${props.color}60`};
  }
  
  .color-name {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--fontxxs);
    color: var(--white);
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }
  
  &:hover .color-name,
  &.active .color-name {
    opacity: 0.8;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 500px;
  
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.color || 'var(--white)'};
    transition: fill 0.8s ease;
  }
`;

const FeatureText = styled.div`
  h4 {
    font-size: var(--fontxs);
    color: var(--white);
    margin: 0 0 5px 0;
    font-weight: 500;
  }
  
  p {
    font-size: var(--fontxxs);
    color: var(--greyLight);
    margin: 0;
    line-height: 1.4;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(${props => props.rgbColor || '155, 181, 206'}, 0.2) 0%, rgba(3, 0, 20, 0) 70%);
  filter: blur(50px);
  opacity: 0.6;
  transition: background 1s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
  pointer-events: none;
`;

const LabelHiddenMobile = styled.h3`
  position: absolute;
  top: 2rem;
  left: 5%;
  font-size: var(--fontxs);
  font-weight: 400;
  color: var(--white);
  opacity: 0.6;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  font-size: var(--fontxxs);
  color: var(--white);
  opacity: 0.6;
  
  svg {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    fill: var(--white);
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ColorSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gradientRef = useRef(null);
  const featuresRef = useRef(null);
  
  // State for animation controls
  const [isChangingColor, setIsChangingColor] = useState(false);

  const { currentColor, changeColorContext } = useContext(ColorContext);

  // Color configurations
  const colors = [
    {
      color: "#9BB5CE",
      text: "Sierra Blue",
      rgbColor: "155, 181, 206",
      description: "Crafted with a stunning new finish, Sierra Blue complements the sleek and durable design of iPhone 14 Pro Max."
    },
    {
      color: "#F9E5C9",
      text: "Gold",
      rgbColor: "249, 229, 201",
      description: "The elegant Gold finish creates a sophisticated look and feel, with a premium design that stands out."
    },
    {
      color: "#505F4E",
      text: "Alpine Green",
      rgbColor: "80, 95, 78",
      description: "Alpine Green brings a bold yet refined look to the iPhone 14 Pro Max, with a matte textured finish."
    },
    {
      color: "#574f6f",
      text: "Deep Purple",
      rgbColor: "87, 79, 111",
      description: "Deep Purple offers a luxurious and distinctive appearance with a subtle shimmering effect in different lighting."
    },
    {
      color: "#A50011",
      text: "Red",
      rgbColor: "165, 0, 17",
      description: "The vibrant Product Red finish makes a bold statement while contributing to the Global Fund to combat COVID-19."
    },
    {
      color: "#215E7C",
      text: "Blue",
      rgbColor: "33, 94, 124",
      description: "The sophisticated Blue finish delivers a calm yet striking appearance with a premium, polished look."
    },
  ];

  // Feature items
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>,
      title: "Premium Finish",
      description: "Precision-milled with a textured matte glass back"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/></svg>,
      title: "Color-matched Design",
      description: "Every detail perfectly matched to the exterior color"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.105 8.79A3.001 3.001 0 0 0 10 11h4a5.001 5.001 0 0 1 4.927 4.146A3.001 3.001 0 0 1 18 21a3 3 0 0 1-1.105-5.79A3.001 3.001 0 0 0 14 13h-4a5.001 5.001 0 0 1-4.927-4.146A3.001 3.001 0 0 1 6 3a3 3 0 0 1 1.105 5.79z"/></svg>,
      title: "Durability",
      description: "Ceramic Shield front, tougher than any smartphone glass"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zm0 2c-.823 0-1.575.4-2.038 1.052l-.095.144-.718 1.176-1.355-.253a7.05 7.05 0 0 0-2.267-.052l-.316.052-1.356.255-.72-1.176A2.5 2.5 0 1 0 4.73 8.265l.131.123 1.041.904-.475 1.295A7 7 0 1 0 19 13c0-.716-.107-1.416-.314-2.083l-.112-.33-.475-1.295 1.04-.904A2.5 2.5 0 0 0 17.5 4zM10 13a2 2 0 1 0 4 0h2a4 4 0 1 1-8 0h2z"/></svg>,
      title: "Water Resistance",
      description: "IP68 rating for water and dust resistance (6m for 30 min)"
    }
  ];

  useEffect(() => {
    if (!currentColor) return;
    
    const titleElem = titleRef.current;
    const gradientElem = gradientRef.current;
    const featIconsElems = document.querySelectorAll('.feature-icon svg');
    
    // Update title color and background gradient
    gsap.to(titleElem, {
      color: currentColor.color,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Update the pseudo-element color
    if (titleElem) {
      titleElem.style.setProperty('--title-underline-color', currentColor.color);
    }
    
    gsap.to(gradientElem, {
      background: `radial-gradient(circle, rgba(${currentColor.rgbColor}, 0.2) 0%, rgba(3, 0, 20, 0) 70%)`,
      duration: 1,
      ease: "power2.out"
    });
    
    // Update feature icons color
    featIconsElems.forEach(icon => {
      gsap.to(icon, {
        fill: currentColor.color,
        duration: 0.8,
        ease: "power2.out"
      });
    });
    
    // Animate feature list when color changes
    gsap.fromTo(featuresRef.current.children,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2
      }
    );

  }, [currentColor]);

  useLayoutEffect(() => {
    let Elem = sectionRef.current;

    // Set the initial color when the section loads
    const initialColor = colors[0];
    changeColorContext(initialColor);

    // pin the section
    gsap.to(Elem, {
      scrollTrigger: {
        trigger: Elem,
        start: "top top",
        end: `+=${Elem.offsetWidth + 1000}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Setup scroll-based color transitions
    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: Elem,
        start: "top top",
        end: `+=${Elem.offsetWidth + 1000}`,
        scrub: 1,
      },
    });
    
    // Add color change triggers for each color
    colors.forEach((colorObj, index) => {
      t2.to(Elem, {
        onStart: () => !isChangingColor && changeColorContext(colorObj),
        onStartParams: [colorObj],
        onReverseComplete: () => !isChangingColor && index > 0 && changeColorContext(colors[index - 1]),
        duration: 1
      });
    });

    return () => {
      if (t2) t2.kill();
    };
  }, []);

  const handleColorClick = (colorObj) => {
    if (isChangingColor) return;
    setIsChangingColor(true);
    
    // Run color change with animation
    gsap.to(sectionRef.current, {
      backgroundColor: "rgba(3, 0, 20, 1)",
      duration: 0.3,
      onComplete: () => {
        changeColorContext(colorObj);
        gsap.to(sectionRef.current, {
          backgroundColor: "var(--dark)",
          duration: 0.5,
          delay: 0.2,
          onComplete: () => setIsChangingColor(false)
        });
      }
    });
  };

  // Find the active color object
  const activeColor = colors.find(c => c.color === currentColor?.color) || colors[0];

  return (
    <Section ref={sectionRef}>
      <BackgroundGradient ref={gradientRef} rgbColor={activeColor.rgbColor} />
      
      <LabelHiddenMobile>iPhone 14 Pro Max Colors</LabelHiddenMobile>
      
      <InfoPanel>
        <ColorTitle 
          ref={titleRef} 
          color={activeColor.color}
        >
          {activeColor.text}
        </ColorTitle>
        
        <ColorDescription>
          {activeColor.description}
        </ColorDescription>
        
        <ColorSwatches>
          {colors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              className={currentColor && currentColor.color === color.color ? "active" : ""}
              onClick={() => handleColorClick(color)}
            >
              <span className="color-name">{color.text}</span>
            </ColorSwatch>
          ))}
        </ColorSwatches>
        
        <FeatureList ref={featuresRef}>
          {features.map((feature, index) => (
            <FeatureItem key={index} className="feature-item">
              <FeatureIcon color={activeColor.color} className="feature-icon">
                {feature.icon}
              </FeatureIcon>
              <FeatureText>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </FeatureText>
            </FeatureItem>
          ))}
        </FeatureList>
      </InfoPanel>
      
      <ModelContainer>
        <CanvasWrapper>
          <Canvas camera={{ fov: 6.5 }}>
            <ambientLight intensity={1.25} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <Model2 />
            </Suspense>
          </Canvas>
        </CanvasWrapper>
      </ModelContainer>
      
      <ScrollIndicator>
        Scroll to explore more colors
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 10a1 1 0 0 1 .993.883L13 15v3a1 1 0 0 1-1.993.117L11 18v-3a1 1 0 0 1 1-1zm0-8a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z" />
        </svg>
      </ScrollIndicator>
    </Section>
  );
};

export default ColorSection;
