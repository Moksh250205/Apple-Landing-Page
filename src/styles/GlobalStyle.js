import { createGlobalStyle } from "styled-components";
import fontLight from "../assets/fonts/SourceSansPro-Light.ttf";
import fontRegular from "../assets/fonts/SourceSansPro-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
/* Base Reset */
*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: 'Source Sans Pro light';
    src: local('Source Sans Pro light'), url(${fontLight}) format("truetype") ;
    font-display:swap;
    font-style: normal;
}

@font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro'), url(${fontRegular}) format("truetype") ;
    font-display:swap;
    font-style: normal;
}

body{
    font-family: "Clash Display", sans-serif;
    overflow-x: hidden;
    background: var(--dark);
    color: var(--white);
    
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at top right, rgba(0, 163, 255, 0.03), transparent 50%);
        pointer-events: none;
        z-index: -1;
    }
}

:root{
    /* Typography */
    --fontBig: clamp(5em, 10vw, 7em);
    --fontxxxl: clamp(3.5em, 8vw, 5.5em);
    --fontxxl: clamp(2.5em, 6vw, 3.4375em);
    --fontxl: clamp(2em, 4vw, 2.75em);
    --fontlg: clamp(1.5em, 3vw, 1.9375em);
    --fontmd: clamp(1.25em, 2vw, 1.375em);
    --fontsm: clamp(1em, 1.5vw, 1.125em);
    --fontxs: clamp(0.875em, 1vw, 1em);
    --fontxxs: clamp(0.75em, 0.75vw, 0.75em);

    /* Colors */
    --dark: #000000;
    --darker: #0A0A0A;
    --light: #FFFFFF;
    --grey: #333333;
    --greyLight: #666666;
    --offWhite: #F5F5F5;
    --white: #FFFFFF;
    
    /* New Monochromatic Palette with Electric Blue */
    --primary: #0062E6;
    --secondary: #3A0CA3;
    --tertiary: #00A3FF;
    --accent: #F72585;
    --success: #02C39A;
    --warning: #F9A826;
    --error: #E63946;
    
    /* Primary with opacity */
    --primaryRgba: "0, 163, 255";
    --secondaryRgba: "255, 59, 48";
    --tertiaryRgba: "0, 163, 255";
    
    /* Fonts */
    --fontL: "Source Sans Pro light", "Helvetica Neue", sans-serif;
    --fontR: "Source Sans Pro", "Helvetica Neue", sans-serif;
    --fontM: 'SF Pro Display Medium', sans-serif;
    --fontB: 'SF Pro Display Bold', sans-serif;
    --fontEB: 'SF Pro Display ExtraBold', sans-serif;
    --fontEL: 'SF Pro Display ExtraLight', sans-serif;
    --fontTh: 'SF Pro Display Thin', sans-serif;
    --fontH: 'SF Pro Display Heavy', sans-serif;
    --fontBl: 'SF Pro Display Black', sans-serif;

    /* Linear Gradients */
    --gradient-primary: linear-gradient(135deg, #0062E6 0%, #4DA8FF 100%);
    --gradient-secondary: linear-gradient(135deg, #3A0CA3 0%, #7209B7 100%);
    --gradient-tertiary: linear-gradient(90deg, #000000, #00A3FF);
    --gradient-cool: linear-gradient(120deg, #00A3FF 0%, #000000 100%);
    --gradient-warm: linear-gradient(120deg, #000000 0%, #00A3FF 100%);
    --gradient-rainbow: linear-gradient(to right, #000000, #00A3FF, #FFFFFF);
    --gradient-accent: linear-gradient(135deg, #F72585 0%, #FF6B97 100%);
    --gradient-dark: linear-gradient(135deg, #121212 0%, #2D2D2D 100%);
    --gradient-glass: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    --gradient-size: 200% 200%;
    
    /* Radial Gradients */
    --gradient-radial-1: radial-gradient(circle, rgba(0, 163, 255, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);
    --gradient-radial-2: radial-gradient(circle, rgba(0, 163, 255, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);
    
    /* Animated Gradient */
    --gradient: linear-gradient(-45deg, #000000, #00A3FF, #FFFFFF, #00A3FF);
    
    /* Glassmorphism */
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-bg-dark: rgba(0, 0, 0, 0.85);
    --glass-border: 1px solid rgba(255, 255, 255, 0.05);
    --glass-radius: 16px;
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
    --glass-blur: blur(8px);
    
    /* Animations */
    --transition-fast: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-medium: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-slow: 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-elastic: 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 163, 255, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 163, 255, 0.15);
    --shadow-lg: 0 8px 24px rgba(0, 163, 255, 0.2);
    --shadow-xl: 0 12px 32px rgba(0, 163, 255, 0.25);
    
    /* Glow Effects */
    --glow-primary: 0 0 15px rgba(0, 163, 255, 0.7);
    --glow-secondary: 0 0 15px rgba(0, 163, 255, 0.7);
    --glow-tertiary: 0 0 15px rgba(0, 163, 255, 0.7);
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;
    
    /* Z-index */
    --z-negative: -1;
    --z-low: 10;
    --z-mid: 50;
    --z-high: 100;
    --z-modal: 1000;
    --z-tooltip: 2000;
}

/* ===== UTILITY CLASSES ===== */

/* Glassmorphism */
.glass {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    border-radius: var(--glass-radius);
    box-shadow: var(--glass-shadow);
}

.glass-dark {
    background: var(--glass-bg-dark);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    border-radius: var(--glass-radius);
    box-shadow: var(--glass-shadow);
}

/* Glowing borders */
.glow-border {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: var(--gradient-rainbow);
        background-size: var(--gradient-size);
        animation: gradient-shift 8s linear infinite;
        z-index: -1;
        border-radius: inherit;
    }
    
    &::after {
        content: '';
        position: absolute;
        inset: 1px;
        background: var(--dark);
        border-radius: inherit;
        z-index: -1;
    }
}

/* Shine effect */
.shine {
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(45deg);
        z-index: 1;
        transition: all 0.8s;
        pointer-events: none;
    }
    
    &:hover::before {
        transform: translateX(100%) rotate(45deg);
    }
}

/* Animation classes */
.fade-in {
    animation: fadeIn var(--transition-medium) forwards;
}

.slide-up {
    animation: slideUp var(--transition-medium) forwards;
}

.scale-in {
    animation: scaleIn var(--transition-medium) forwards;
}

.float {
    animation: float 6s ease-in-out infinite;
}

.pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.spin {
    animation: spin 10s linear infinite;
}

.gradient-shift {
    background: var(--gradient);
    background-size: var(--gradient-size);
    animation: gradient-shift 15s ease infinite;
}

/* Animation Keyframes */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Bento Grid */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
    
    &.bento-3 {
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(180px, auto);
        
        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        
        @media (max-width: 480px) {
            grid-template-columns: 1fr;
        }
    }
    
    .bento-item {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        min-height: 180px;
        transition: transform var(--transition-medium);
        
        &:hover {
            transform: translateY(-5px);
        }
        
        &.span-2 {
            grid-column: span 2;
            
            @media (max-width: 480px) {
                grid-column: span 1;
            }
        }
        
        &.span-row-2 {
            grid-row: span 2;
        }
    }
}

/* Text reveal effect */
.text-reveal {
    display: inline-block;
    position: relative;
    overflow: hidden;
    
    .reveal-content {
        display: block;
        transform: translateY(100%);
        animation: text-reveal 0.5s var(--transition-elastic) forwards;
        animation-delay: calc(var(--index, 0) * 0.1s);
    }
}

@keyframes text-reveal {
    to {
        transform: translateY(0);
    }
}

/* Magic cursor */
.magic-cursor {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--primary);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: var(--z-tooltip);
    transition: width 0.3s, height 0.3s, border 0.3s;
    
    &.active {
        width: 80px;
        height: 80px;
        border: 4px solid var(--secondary);
    }
}

.cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: var(--z-tooltip);
    transition: width 0.3s, height 0.3s, background 0.3s;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--dark);
}

::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
}
`