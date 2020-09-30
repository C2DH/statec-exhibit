import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chapter from './components/Chapter/Chapter';
import theme01 from './data/themes/theme-01.json';

class Home extends Component {
  render() {
    return (
      <div className="w-100">
        <div className="stickyHeader">
          <Link to={'/contents'}>Table of Contents</Link>
          <Link to={'/about'}>About</Link>
        </div>
        <Chapter theme={theme01} heading={true} color={'rgb(217,238,241)'} />
      </div>
    );
  }
}

export default Home;
