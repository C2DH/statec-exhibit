import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { Scrollama, Step } from 'react-scrollama';
import styles from './Home.module.css';
import { isMobileWithTablet } from '../constants';
import Covers from '../components/Cover/Cover';

const STEPS = [
  {
    id: 0,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    url: '/0.landing.jpg',
  },
  {
    id: 1,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(49% 0%, 49% 0%, 51% 100%, 51% 100%)',
    //url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg',
  },
  {
    id: 2,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(49% 0%, 49% 0%, 51% 100%, 51% 100%)',
    //url: 'https://ww1.lu/media/image/snapshots/nxwsWaG.medium.jpg',
  },
  {
    id: 3,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
    //url: 'https://live.staticflickr.com/8086/8403972132_d29349e32d_k_d.jpg',
  },
];

const Home = () => {
  const { t } = useTranslation();
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
      <Covers
        index={currentStep.index}
        direction={currentStep.direction}
        steps={STEPS}
      />
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
                <span
                  style={{
                    color: 'var(--secondary)',
                    fontSize: isMobileWithTablet ? '16vw' : '8vw',
                  }}
                >
                  {t('pagesHomeTitle')}
                </span>
              </h1>
              <h2
                className="fw1 lh-title tc mt3"
                style={{ fontSize: isMobileWithTablet ? '4vw' : '2vw' }}
              >
                <span>
                  {t('pagesHomeSubheading')}
                </span>
              </h2>
            </div>
          </div>
        </Step>
        <Step data={1}>
          <div className={styles.stepWrapper}>
            <div className="mw9 center pa4 pt5-ns ph5-l">
              <h2 className="f2-ns f3 fw1 lh-title tc">
                {t('pagesHomeParagraph01')}<br/><br/>
                {t('pagesHomeParagraph02')}
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
            <div className="block mb4">
              <h2
                className={`${styles.chapterNumber} sans f2-ns`}
                style={{
                  fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                }}
              >
                Chapter 1
              </h2>
              <h2
                className={`${styles.chapterTitle}`}
                style={{
                  fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                  marginTop: '10px',
                  marginBottom: '80px',
                }}
              >
                <a href="/a-country-of-migration">A Country of Migrations</a>
              </h2>
              <h2
                className={`${styles.chapterNumber} sans f2-ns`}
                style={{
                  fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                }}
              >
                Chapter 2
              </h2>
              <h2
                className={`${styles.chapterTitle}`}
                style={{
                  fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                  marginTop: '10px',
                  marginBottom: '80px',
                }}
              >
                <a href="/family">Family Life</a>
              </h2>
            </div>
            <div className="flex items-center justify-center ph4 mv4 mv3-ns">
              <img src="/statec-logo-blu.png" height={40} className="mr2" />
              <img src="/UNI_C2DH_blu.png" height={40} className="ml2" />
            </div>
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
