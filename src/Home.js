import React, { Component } from 'react';
import About from './About';
import Chapter from './components/Chapter/Chapter';
import Contents from './Contents';
import theme01 from './data/themes/theme-01.json';
import { useStore } from './store';

function Home() {
  return (
    <div className="w-100" style={{ backgroundColor: 'rgb(217,238,241)' }}>
      <div className="w-100 vh-100 position-fixed" style={{
        backgroundImage: `url(${theme01.cover.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
      }}></div>
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
      <About />
      <Contents />
      <Chapter theme={theme01} heading={true} color={'rgba(217,238,241)'} />
    </div>
  );
}

export default Home;
