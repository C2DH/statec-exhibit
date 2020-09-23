import React, { Component } from 'react';
import Chapter from './Chapter';
import theme01 from './data/themes/theme-01.json';

class Home extends Component {
  render() {
    return (
      <div className="w-100">
        <Chapter theme={theme01} heading={true} color={'rgb(208, 228, 231)'} />
      </div>
    );
  }
}

export default Home;
