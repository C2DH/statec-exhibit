import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { Scrollama, Step } from 'react-scrollama';
import styles from './Home.module.css';
import { isMobileWithTablet, ChapterRoutes } from '../constants';
import Covers from '../components/Cover/Cover';
import { animated, useSpring } from 'react-spring';

const STEPS = [
  {
    id: 0,
    backgroundColor: 'var(--accent)',
    backgroundClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    url: '/0.landing.jpg',
  },
];

const Home = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1500);
  }, []);

  const props = useSpring({
    opacity: open ? 1 : 0,
  });

  return (
    <div className="home">
      <Covers index={0} direction={'down'} steps={STEPS} />
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <animated.div
          className="mw9 center pa4 ph5-l"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            opacity: props.opacity,
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
            <span>{t('pagesHomeSubheading')}</span>
          </h2>
          <div
            className="fw1 lh-title tc mt5"
            style={{
              color: 'var(--secondary)',
              fontSize: isMobileWithTablet ? '1vw' : '1.5vw',
            }}
          >
            Scroll down to explore ↓{' '}
          </div>
        </animated.div>
      </div>
      <div className={styles.stepWrapper}>
        <div className="mw9 center pa4 pt5-ns ph5-l">
          <h2 className="f2-ns f3 fw1 lh-title tc">
            {t('pagesHomeParagraph01')}
            <br />
            <br />
            {t('pagesHomeParagraph02')}
          </h2>
        </div>
      </div>
      <div className={`${styles.stepChapterWrapper} `}>
        <div className="block mb4">
          {ChapterRoutes.map((route, i) => (
            <div key={i}>
              <h2
                className={`${styles.chapterNumber} sans f2-ns`}
                style={{
                  fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                }}
              >
                {t('chapterNumber', { n: i + 1 })}
              </h2>
              <h2
                className={`${styles.chapterTitle}`}
                style={{
                  fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                  marginTop: '10px',
                  marginBottom: '80px',
                }}
              >
                <Link to={route.to}>{t(route.label)} </Link>
                <span
                  style={{ fontSize: isMobileWithTablet ? '2.5vw' : '2.5vw' }}
                >
                  ↗
                </span>
              </h2>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center ph4 mv4 mv3-ns">
          <img
            src="/statec-logo-blu.png"
            alt="STATEC"
            height={40}
            className="mr2"
          />
          <img
            src="/UNI_C2DH_blu.png"
            alt="Luxembourg Centre for Contemporary and Digital History - University of Luxembourg"
            height={40}
            className="ml2"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
