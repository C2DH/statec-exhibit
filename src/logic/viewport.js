import { isMobile, isTablet } from 'react-device-detect';

const getIsMobileWithTablet = () => isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false

export {
  getIsMobileWithTablet,
  isMobile
}
