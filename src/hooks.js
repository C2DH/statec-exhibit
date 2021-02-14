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


export const useImage = (src, delay=1000) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

    useEffect(() => {
      setHasStartedInitialFetch(true);
      setError(false);
      setIsLoading(true);
      // Here's where the magic happens.
      const image = new Image();
      let timer1 = setTimeout(() => {
        image.src = src;
      }, delay);

      const handleError = (err) => {
          setError(true);
      };

      const handleLoad = () => {
        setIsLoading(false);
        setError(null);
      };

      image.onerror = handleError;
      image.onload = handleLoad;

      return () => {
        clearTimeout(timer1)
        image.removeEventListener("error", handleError);
        image.removeEventListener("load", handleLoad);
      };
    }, [src, delay]);

    return { isLoading, error, hasStartedInitialFetch };
};
