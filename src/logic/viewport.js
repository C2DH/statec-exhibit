import { isMobile, isTablet } from 'react-device-detect';

export const getIsMobileWithTablet = () => isMobile
  ? isTablet
    ? window.innerWidth < window.innerHeight
      ? true
      : false
    : true
  : false

export const setBodyNoScroll = (noscroll=true) => {
  console.debug('setBodyNoScroll noscroll:', noscroll)
  document.body.classList.toggle('noscroll', noscroll)
}

export {
  isMobile,
  isTablet
}
