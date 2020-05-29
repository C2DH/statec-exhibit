import { isMobile, isTablet } from 'react-device-detect';
export const isMobileWithTablet = isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false;
