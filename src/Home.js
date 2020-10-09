import React, { Suspense } from 'react';
import Chapter from './components/Chapter/Chapter';
import theme01 from './data/themes/theme-01.json';
import theme02 from './data/themes/theme-02.json';
import logo1 from './assets/images/Statec-logo.png';
import logo2 from './assets/images/UNI_C2DH_noir_transp.png';
import landing from './assets/images/landing.svg';
import { useStore } from './store';

const Contents = React.lazy(() => import('./Contents'));
const About = React.lazy(() => import('./About'));

const AvailableThemes = Object.freeze({
  [theme01.id]: theme01,
  [theme02.id]: theme02,
});
const DefaultThemeId = String(theme01.id);

const Home = ({
  match: {
    params: { themeId },
  },
}) => {
  const currentTheme =
    AvailableThemes[String(themeId)] ?? AvailableThemes[DefaultThemeId];
  console.info('current theme:', themeId, currentTheme.title);
  return (
    <div className="w-100" style={{ backgroundColor: 'rgb(217,238,241)' }}>
      <div className="heroContainer">
        <div
          className="w-100 vh-100"
          style={{
            position: 'absolute',
          }}
        ></div>
        <div className="heroContainerWrapper withCover">
          <div className="section-small">
            <img src={logo1} alt={'Statec logo'} style={{ height: '8vh' }} />
            <img src={logo2} alt={'UNI C2DH logo'} style={{ height: '8vh' }} />
            <h1 className="tc fw3 mt3">Les chiffres des migrations</h1>
            <h2 className="sans mt0">Framing Luxembourg</h2>
            <img src={landing} alt="scroll" style={{ height: '30vh' }} />
          </div>
        </div>
      </div>

      <div className="stickyHeader">
        <div
          className="stickyHeaderLink"
          onClick={() =>
            useStore.setState({ menuOpen: true, aboutOpen: false })
          }
        >
          Table of Contents
        </div>
        <div
          className="stickyHeaderLink"
          onClick={() =>
            useStore.setState({ aboutOpen: true, menuOpen: false })
          }
        >
          About
        </div>
      </div>
      <Suspense fallback={''}>
        <About />
        <Contents />
      </Suspense>
      <Chapter
        theme={currentTheme}
        heading={true}
        color={'rgb(217,238,241)'}
        headColor={'rgba(217,238,241, .8)'}
        chapterIndex={1}
      />
    </div>
  );
};

export default Home;
