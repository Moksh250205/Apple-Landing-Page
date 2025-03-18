import styled from "styled-components";
import { useEffect, useState } from "react";
import gsap from "gsap";

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 9999;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  padding: 0 2rem 2rem;
`;

const LoaderBar = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: var(--gradient-primary);
  background-size: 200% 200%;
  animation: gradient-shift 2s ease infinite;
  border-radius: 4px;
  transition: width 0.1s linear;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  font-family: var(--fontM);
  font-size: var(--fontsm);
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const LoadingText = styled.span`
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

const PercentageText = styled.span`
  font-size: var(--fontxl);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalSteps = 100; // 0 to 100
    const totalDuration = 2500; // 2.5 seconds in milliseconds
    const stepDuration = totalDuration / totalSteps;

    let interval = setInterval(() => {
      setProgress(prev => {
        if (prev === 100) {
          clearInterval(interval);
          gsap.to('.preloader-container', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => onComplete?.()
          });
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration); // 25ms * 100 steps = 2.5 seconds total

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <PreloaderContainer className="preloader-container">
      <LoaderWrapper>
        <LoaderBar>
          <ProgressBar progress={progress} />
        </LoaderBar>
        <ProgressContainer>
          <LoadingText>Experience Premium</LoadingText>
          <PercentageText>{progress}%</PercentageText>
        </ProgressContainer>
      </LoaderWrapper>
    </PreloaderContainer>
  );
};

export default Preloader; 