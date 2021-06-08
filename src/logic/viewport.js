import { isMobile, isTablet } from 'react-device-detect';

export const getIsMobileWithTablet = () => isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false
