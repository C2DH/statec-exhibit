import { useEffect, useRef, useState } from 'react'

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/*
  usage:
  ```
  const [{ width, height, windowDimensions }, ref] = useBoundingClientRect()
  // [...]
  <div ref={ref}>
  ```
*/
export const useBoundingClientRect = () => {
  const ref = useRef();
  const [bbox, setBbox] = useState({
    width: 0, height: 0, windowDimensions: '0x0'
  });
  const setCurrentBoundingClientRect = () => {
    const boundingClientRect = ref && ref.current
      ? ref.current.getBoundingClientRect()
      : { width: 0, height: 0, windowDimensions: '0x0' }
    const windowDimensions = `${boundingClientRect.width}x${boundingClientRect.height}`
    if (windowDimensions !== bbox.windowDimensions) {
      // extract one dimension by one dimension, the only way
      // as the result of el.getBoundingClientRect() returns a special object
      // of type ClientRect (or DomRect apparently)
      const {top, right, bottom, left, width, height, x, y} = boundingClientRect
      console.info(bbox.windowDimensions)
      setBbox({
        top, right, bottom, left, width, height, x, y,
        windowDimensions,
      })
    }
  };
  useEffect(() => {
    let timer;
    setCurrentBoundingClientRect();
    const delaySetCurrentBoundingClientRect = () => {
      clearTimeout(timer)
      timer = setTimeout(setCurrentBoundingClientRect, 200)
    }
    delaySetCurrentBoundingClientRect()
    window.addEventListener('resize', delaySetCurrentBoundingClientRect)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', delaySetCurrentBoundingClientRect)
    }
  });
  return [bbox, ref];
};
