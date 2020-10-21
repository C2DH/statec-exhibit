import { isMobile, isTablet } from 'react-device-detect';
export const isMobileWithTablet = isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false;
export const isMobileC = isMobile ? true : false;
export const isTabletC = isTablet ? true : false;

export const red = '#d8434e';
