import React, { Component } from 'react';
import Theme from './components/Theme/Theme';
import theme01 from './data/themes/theme-01.json';

class Home extends Component {
  state = {
    data: 0,
    steps: [10, 20, 30],
    progress: 0,
  };

  onStepEnter = ({ element, data }) => {
    if (element.children[0]) {
      element.children[0].style.position = 'sticky';
      element.children[0].style.top = 0;
    }
    this.setState({ data });
  };

  onStepExit = ({ element }) => {
    if (element.children[0]) {
      element.children[0].position = 'relative';
    }
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    const { progress, data } = this.state;

    return (
      <div className="w-100">
        {/* <HendecagonChart
          data={dataH}
          countryKey={'BE'}
          countryName={'Belgium'}
        /> */}
        <Theme
          theme={theme01}
          progress={progress}
          onStepEnter={this.onStepEnter}
          onStepExit={this.onStepExit}
          onStepProgress={this.onStepProgress}
        />
      </div>
    );
  }
}

export default Home;
