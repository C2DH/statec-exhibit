import React, { Component } from 'react';
import Timeline from './Timeline';
import { Scrollama, Step } from 'react-scrollama';

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
        <div
          className="w-100 chapter-2"
          style={{ backgroundColor: 'yellow', height: '100vh' }}
        ></div>
        <div>
          <Scrollama
            onStepEnter={this.onStepEnter}
            onStepExit={this.onStepExit}
            progress={true}
            onStepProgress={this.onStepProgress}
            debug
            offset={0}
          >
            <Step data={1} key={1}>
              <div className="w-100 chapter-1" style={{ height: '200vh' }}>
                <Timeline
                  progress={data === 1 ? progress : 1}
                  isScrollActive={data === 1}
                />
                {Math.round(progress * 100)}
              </div>
            </Step>
            <Step data={2} key={2}>
              <div
                className="w-100 chapter-2"
                style={{ backgroundColor: 'red', height: '200vh' }}
              ></div>
            </Step>
            <Step data={3} key={3}>
              <div
                className="w-100 chapter-3"
                style={{ backgroundColor: 'green', height: '200vh' }}
              ></div>
            </Step>
          </Scrollama>
        </div>
      </div>
    );
  }
}

export default Home;
