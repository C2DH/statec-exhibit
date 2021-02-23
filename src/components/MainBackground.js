import React from 'react';
import { useStore } from '../store';

const MainBackground = () => {
  const backgroundColor = useStore((state) => state.backgroundColor);

  return (
    <div
      className="vh-100 w-100 fixed"
      style={{
        backgroundColor: backgroundColor,
        top: 0,
        bottom: 0,
        zIndex: -1,
        transition: 'background-color .6s ease-in-out',
        willChange: 'background-color',
      }}
    ></div>
  );
};

export default MainBackground;
