import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from '../../pages/Home.module.css';

const Cover = ({ steps, index, direction }) => {
  console.log(steps);
  const step = steps[index > -1 ? index : 0];
  const { backgroundColor, backgroundClipPath } = step;
  const transitions = useTransition(
    step,
    (item) => item.id,
    direction === 'down'
      ? {
          from: { transform: 'translate(0%,0%)' },
          enter: { transform: 'translate(0%,0)' },
          leave: { transform: 'translate(0,0%)' },
        }
      : {
          from: { transform: 'translate(0%,0%)' },
          enter: { transform: 'translate(0%,0)' },
          leave: { transform: 'translate(0,0%)' },
        },
  );
  return (
    <div className={styles.backgroundFrameWrapper}>
      <div
        className={styles.backgroundFrame}
        style={{
          clipPath: backgroundClipPath,
          transition: 'clip-path .5s ease-in-out',
        }}
      >
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            className="bg"
            style={{
              ...props,
              willChange: 'transform',
              backgroundImage: `url(${item.url})`,
            }}
          />
        ))}
        {/* <div
          className={styles.backgroundFrameOverlay}
          style={{ backgroundColor }}
        /> */}
      </div>
    </div>
  );
};

export default Cover;
