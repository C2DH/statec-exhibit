import React, { useEffect, useState } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import styles from '../../pages/Home.module.css';

const Cover = ({ steps, index, direction }) => {
  const step = steps[index > -1 ? index : 0];
  const [open, setOpen] = useState(false);
  const { backgroundColor, backgroundClipPath } = step;

  // const transitions = useTransition(
  //   step,
  //   (item) => item.id,
  //   direction === 'down'
  //     ? {
  //         from: { transform: 'translate(0%,0%)' },
  //         enter: { transform: 'translate(0%,0)' },
  //         leave: { transform: 'translate(0,0%)' },
  //       }
  //     : {
  //         from: { transform: 'translate(0%,0%)' },
  //         enter: { transform: 'translate(0%,0)' },
  //         leave: { transform: 'translate(0,0%)' },
  //       },
  // );
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, []);

  const props = useSpring({
    backgroundClipPath: open
      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      : 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
    opacity: step.id === 0 ? 1 : 0,
  });

  console.log(step);

  return (
    <div className={styles.backgroundFrameWrapper}>
      <div
        className={styles.backgroundFrame}
        style={{
          clipPath: props.backgroundClipPath,
          transition: 'clip-path .5s ease-in-out',
          transitionDelay: '.8s',
        }}
      >
        <animated.div
          className="bg"
          style={{
            clipPath: props.backgroundClipPath,
            display: 'flex',
            alignItems: 'center',
            opacity: props.opacity,
          }}
        >
          <img src={step.url} />
        </animated.div>
      </div>
    </div>
  );
};

export default Cover;
