import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring'
import { useStore } from '../store'
import { Scrollama, Step } from 'react-scrollama'
import styles from './Home.module.css'


const STEPS = [
  {
    id: 0,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(15% 80px, 100% 80px, 85% 100%, 0% 100%)',
    url: 'https://ww1.lu/media/image/snapshots/JY53aSd.medium.jpg',
  },
  {
    id: 2,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(49.5% 10%, 50.5% 10%, 50.5% 90%, 49.5% 90%)',
    url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg'
  },
  {
    id: 3,
    backgroundColor: 'var(--theme-01)',
    backgroundClipPath: 'polygon(15% 0%, 95% 0%, 85% 100%, 5% 100%)',
    url: 'https://live.staticflickr.com/8086/8403972132_d29349e32d_k_d.jpg'
  },
  {
    id: 4,
    backgroundColor: 'var(--theme-02)',
    backgroundClipPath: 'polygon(15% 0%, 95% 0%, 85% 100%, 5% 100%)',
    url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg'
  },
  {
    id: 5,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(15% 15%, 95% 15%, 85% 16%, 5% 16%)',
    url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg'
  }
]



const Covers = ({ index, direction }) => {
  const step = STEPS[index > -1 ? index : 0]
  const { backgroundColor, backgroundClipPath } = step
  // console.info('update',index, direction)
  const transitions = useTransition(step, item => item.id, 
    direction === 'down' 
    ? {
      from: {  transform: 'translate3d(0%,100%,0)' },
      enter: {  transform: 'translate3d(0%,0,0)' },
      leave: {  transform: 'translate3d(0,-100%,0)' },
    } 
    : {
      from: {  transform: 'translate3d(0%,-100%,0)' },
      enter: {  transform: 'translate3d(0%,0,0)' },
      leave: {  transform: 'translate3d(0,100%,0)' },
    })
  return (
    <div style={{position: 'fixed', bottom: '50px', zIndex: -1, left: '50px', right:'50px', top: '50px',
clipPath: backgroundClipPath, transition: 'clip-path .5s ease-in-out'}}>
    {transitions.map(({ item, props, key }) => (
      <animated.div key={key}
        className="bg"
        style={{ ...props, backgroundImage: `linear-gradient(${item.backgroundColor},${item.backgroundColor}),url(${item.url})` }}
      />
    ))}
    <div style={{position: 'absolute', bottom: '0', zIndex: 1, left: '0', right:'0', top: '0', backgroundColor, opacity: .65 }} />
    </div>
  )
}

const Home = () => {
  const [currentStep, setCurrentStep] = useState({ index: -1, direction: 'down' });
  
  const handleStepEnter = ({ data, direction}) => {
    setCurrentStep({ index: data, direction})
    useStore.setState({ backgroundColor: STEPS[data].backgroundColor })
  }
  return (
    <div className="home">
      <Covers index={currentStep.index} direction={currentStep.direction}/>
      <Scrollama onStepEnter={handleStepEnter} offset={0.5}>
        <Step data={0}>
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="mw9 center pa4 pt5-ns ph7-l">
              <h2 className="f3-ns f5 fw1 lh-title tc mt0-ns mt4" >
                <span>
                In the 19th century, statistics became a central tool for framing social realities.
                </span>
              </h2>
            </div>
            <h1 className="f2 f1-m f-headline-l tc measure-narrow mv0">
              <span style={{color: 'var(--accent)', fontSize: '500%'}}>
              Framing Luxembourg</span>
            </h1>
          </div>
        </Step>
        <Step data={1}>
          <div className={styles.stepWrapper}>
            <div className="mw9 center pa4 pt5-ns ph7-l">
              <h2 className="f2-ns f3 fw1 lh-title tc">Through the categories they offer, they made things visible but hide others.
              Telling the history of how a territory was “put into numbers” over the last 200 years makes unveil
              the different stories that the Luxembourg state choose to tell.
              </h2>
            </div>
          </div>
        </Step>
        <Step data={2}>
          <div className={`${styles.stepChapterWrapper} ${currentStep.index===2 ? styles.stepWrapperActive : ''}`}>
            <h2 className={`${styles.chapterNumber} sans f2-ns`}>Chapter 1</h2>
            <h2 className={`${styles.chapterTitle} f-4-ns`}>
              <a href="/a-country-of-migration">A Country of Migrations</a>
            </h2>
          </div>
        </Step>
        <Step data={3}>
          <div className={`${styles.stepChapterWrapper} ${currentStep.index===3 ? styles.stepWrapperActive : ''}`}>
            <h2 className={`${styles.chapterNumber} sans f2-ns`}>Chapter 2</h2>
            <h2 className={`${styles.chapterTitle} f-4-ns`} >
              <a href="/family">Family Life</a>
            </h2>
          </div>
        </Step>
        <Step data={4}>
          <div className='tc' style={{
            padding: '40vh 150px',
            // border: '1px solid black'
          }}>
            THis is a project blab lab
          </div>
        </Step>
      </Scrollama>
    </div>
  );
};

export default Home;
