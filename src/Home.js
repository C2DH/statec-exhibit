import React, { Component } from 'react';
import Timeline from './Timeline';
import { Scrollama, Step } from 'react-scrollama';
import Trend from './Trend';
import populationDataset from './data/datasets/population.json';
import birthDataset from './data/datasets/number-of-births.json';
import densityDataset from './data/datasets/density-of-inhabitants.json';
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
        <div className="stickyHeader">
          <div className="mt3" style={{ marginLeft: '10%' }}>
            <Trend
              data={populationDataset.values}
              height={80}
              valueKey="v"
              timeKey="t"
              colorA={'rgb(242,219,218)'}
              colorB={'rgb(255,246,245)'}
              trendName={'populationTrend'}
            />
          </div>
        </div>
        <div
          className="w-100 chapter-2"
          style={{ backgroundColor: '#CFE0C3', height: '100vh' }}
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
              <div
                className="w-100 chapter-1"
                style={{ backgroundColor: '#9EC1A3', height: '200vh' }}
              >
                {/* <Timeline
                  progress={data === 1 ? progress : 1}
                  isScrollActive={data === 1}
                /> */}
                <div style={{ paddingTop: '120px', marginLeft: '10%' }}>
                  <Trend
                    data={birthDataset.values}
                    height={400}
                    valueKey="v"
                    timeKey="t"
                    colorA={'#DAD299'}
                    colorB={'#B0DAB9'}
                    trendName={'birthTrend'}
                    progress={progress}
                  />
                  {Math.round(progress * 100)}
                </div>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div
                className="w-100 chapter-2"
                style={{ backgroundColor: '#70A9A1', height: '200vh' }}
              >
                <div style={{ paddingTop: '120px', marginLeft: '10%' }}>
                  <Trend
                    data={densityDataset.values}
                    height={400}
                    valueKey="v"
                    timeKey="t"
                    colorA={'#E6DADA'}
                    colorB={'#274046'}
                    trendName={'densityTrend'}
                    progress={progress}
                  />
                  {Math.round(progress * 100)}
                </div>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div
                className="w-100 chapter-3"
                style={{ backgroundColor: '#40798C', height: '200vh' }}
              ></div>
            </Step>
            <Step data={4} key={4}>
              <div
                className="w-100 chapter-3"
                style={{ backgroundColor: '#1F363D', height: '200vh' }}
              ></div>
            </Step>
            <Step data={5} key={5}>
              <div
                className="w-100 chapter-3"
                style={{ backgroundColor: '#152429', height: '200vh' }}
              ></div>
            </Step>
          </Scrollama>
        </div>
      </div>
    );
  }
}

export default Home;
