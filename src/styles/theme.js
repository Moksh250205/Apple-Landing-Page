export const theme = {
  colors: {
    primary: '#0062E6',       // Deep Blue
    secondary: '#3A0CA3',     // Royal Purple
    accent: '#F72585',        // Vibrant Magenta
    dark: '#121212',          // Richer Black
    white: '#FFFFFF',
    greyLight: '#E0E0E0',
    greyDark: '#333333',
    success: '#02C39A',       // Teal
    warning: '#F9A826',       // Amber
    error: '#E63946',         // Red
  },
  fonts: {
    fontR: "'SF Pro Display Regular', sans-serif",
    fontM: "'SF Pro Display Medium', sans-serif",
    fontB: "'SF Pro Display Bold', sans-serif",
    fontEB: "'SF Pro Display ExtraBold', sans-serif",
    fontL: "'SF Pro Display Light', sans-serif",
    fontEL: "'SF Pro Display ExtraLight', sans-serif",
    fontTh: "'SF Pro Display Thin', sans-serif",
    fontH: "'SF Pro Display Heavy', sans-serif",
    fontBl: "'SF Pro Display Black', sans-serif",
  },
  fontSize: {
    fontxs: '0.75rem',    // 12px
    fontsm: '0.875rem',   // 14px
    fontmd: '1rem',       // 16px
    fontlg: '1.25rem',    // 20px
    fontxl: '1.5rem',     // 24px
    fontxxl: '2rem',      // 32px
    fontxxxl: '3rem',     // 48px
    fontBig: '4rem',      // 64px
  },
  spacing: {
    sectionPadding: '5rem 0',
    containerPadding: '0 2rem',
  },
  borderRadius: {
    radiusSm: '0.25rem',
    radiusMd: '0.5rem',
    radiusLg: '1rem',
    radiusFull: '9999px',
  },
  transitions: {
    transition: 'all 0.3s ease',
    transitionFast: 'all 0.2s ease',
    transitionSlow: 'all 0.5s ease',
  },
  shadows: {
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    shadowMd: '0 4px 6px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    shadowXl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0062E6 0%, #4DA8FF 100%)',
    secondary: 'linear-gradient(135deg, #3A0CA3 0%, #7209B7 100%)',
    accent: 'linear-gradient(135deg, #F72585 0%, #FF6B97 100%)',
    dark: 'linear-gradient(135deg, #121212 0%, #2D2D2D 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px',
  },
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
}; 