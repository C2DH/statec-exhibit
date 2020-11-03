import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { useStore } from '../store';
import { Scrollama, Step } from 'react-scrollama';
import styles from './Home.module.css';
import landing0 from '../assets/images/0.landing.jpg';

const STEPS = [
  {
    id: 0,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
    url: landing0,
  },
  {
    id: 2,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(50% 20%, 50% 20%, 50% 80%, 50% 80%)',
    //url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg',
  },
  {
    id: 3,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
    //url: 'https://live.staticflickr.com/8086/8403972132_d29349e32d_k_d.jpg',
  },
];

const Covers = ({ index, direction }) => {
  const step = STEPS[index > -1 ? index : 0];
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

const Home = () => {
  const [currentStep, setCurrentStep] = useState({
    index: -1,
    direction: 'down',
  });

  const handleStepEnter = ({ data, direction }) => {
    setCurrentStep({ index: data, direction });
    useStore.setState({ backgroundColor: STEPS[data].backgroundColor });
  };
  return (
    <div className="home">
      <Covers index={currentStep.index} direction={currentStep.direction} />
      <Scrollama onStepEnter={handleStepEnter} offset={0.5}>
        <Step data={0}>
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <div
              className="mw9 center pa4 ph5-l"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <h1 className="f2 f1-m tc mv0">
                <span style={{ color: 'var(--secondary)', fontSize: '8vw' }}>
                  Framing Luxembourg
                </span>
              </h1>
              <h2 className="f3-ns f5 fw1 lh-title tc mt0-ns mt4">
                <span>
                  In the 19th century, statistics became a central tool for
                  framing social realities.
                </span>
              </h2>
            </div>
          </div>
        </Step>
        <Step data={1}>
          <div className={styles.stepWrapper}>
            <div className="mw9 center pa4 pt5-ns ph5-l">
              <h2 className="f2-ns f3 fw1 lh-title tc">
                Through the categories they offer, they made things visible but
                hide others. Telling the history of how a territory was “put
                into numbers” over the last 200 years makes unveil the different
                stories that the Luxembourg state choose to tell.
              </h2>
            </div>
          </div>
        </Step>
        <Step data={2}>
          <div
            className={`${styles.stepChapterWrapper} ${
              currentStep.index === 2 ? styles.stepWrapperActive : ''
            }`}
          >
            <h2 className={`${styles.chapterNumber} sans f2-ns`}>Chapter 1</h2>
            <h2 className={`${styles.chapterTitle} f-4-ns`}>
              <a href="/a-country-of-migration">A Country of Migrations</a>
            </h2>
            <h2 className={`${styles.chapterNumber} sans f2-ns`}>Chapter 2</h2>
            <h2 className={`${styles.chapterTitle} f-4-ns`}>
              <a href="/family">Family Life</a>
            </h2>
          </div>
        </Step>
        {/* <Step data={3}>
          <div
            className={`${styles.stepChapterWrapper} ${
              currentStep.index === 3 ? styles.stepWrapperActive : ''
            }`}
          >
            <h2 className={`${styles.chapterNumber} sans f2-ns`}>Chapter 2</h2>
            <h2 className={`${styles.chapterTitle} f-4-ns`}>
              <a href="/family">Family Life</a>
            </h2>
          </div>
        </Step> */}
        {/* <Step data={4}>
          <div
            className="tc"
            style={{
              padding: '40vh 150px',
              // border: '1px solid black'
            }}
          >
            THis is a project blab lab
          </div>
        </Step> */}
      </Scrollama>
    </div>
  );
};

export default Home;
