import React from 'react';
import { useStore } from '../store';
import { useCurrentWindowDimensions } from '../hooks'

const MainBackground = () => {
  const { width, height } = useCurrentWindowDimensions()
  const backgroundColor = useStore((state) => state.backgroundColor);

  return (
    <div
      className="MainBackground fixed"
      style={{
        backgroundColor: backgroundColor,
        height, width,
        zIndex: -1,
        transition: 'background-color .6s ease-in-out',
        willChange: 'background-color',
      }}
    ></div>
  );
};

export default MainBackground;
