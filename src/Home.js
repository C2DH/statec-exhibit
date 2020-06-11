import React, { Component } from 'react';
import Timeline from './Timeline';
import { Scrollama, Step } from 'react-scrollama';
import Trend from './Trend';
import populationDataset from './data/datasets/population.json';
import birthDataset from './data/datasets/number-of-births.json';
import densityDataset from './data/datasets/density-of-inhabitants.json';
import popSoldeDataset from './data/datasets/population-solde.json';
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
              colorA={'#93C5D6'}
              colorB={'#BAE8DB'}
              trendName={'populationTrend'}
              negative={false}
            />
          </div>
        </div>
        <div
          className="w-100 chapter-2"
          style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
        >
          <div className="section">
            <h1 className="tc">Project Title Lorem Ipsum</h1>
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </h2>
          </div>
        </div>
        <div>
          <Scrollama
            onStepEnter={this.onStepEnter}
            onStepExit={this.onStepExit}
            progress={true}
            onStepProgress={this.onStepProgress}
            debug={false}
            offset={0}
          >
            <Step data={1} key={1}>
              <div
                className="w-100 chapter-1"
                style={{ backgroundColor: '#D0E4E7', height: '200vh' }}
              >
                <div className="section">
                  <Trend
                    data={birthDataset.values}
                    height={400}
                    valueKey="v"
                    timeKey="t"
                    colorA={'#93C5D6'}
                    colorB={'#BAE8DB'}
                    trendName={'birthTrend'}
                    progress={progress}
                    negative={true}
                  />
                  <div className="sectionText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam ut ultricies sapien, ut convallis diam. Integer id
                    felis vel metus condimentum pulvinar. Nam ullamcorper
                    iaculis ligula, non vehicula erat posuere vitae. Duis
                    posuere lacinia dui ac molestie. Integer volutpat hendrerit
                    odio, vel pharetra tellus vestibulum quis. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Praesent in urna quis sem commodo
                    elementum eu quis sapien. Sed eget tellus sollicitudin
                    tortor lobortis consectetur. Nulla turpis nisi, sodales eget
                    lacus eget, efficitur ultrices magna. Nullam pretium ante et
                    sem lacinia, in imperdiet velit euismod. Donec mollis eget
                    velit luctus maximus.{' '}
                  </div>
                </div>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div
                className="w-100 chapter-2"
                style={{ backgroundColor: '#CCEBCE', height: '200vh' }}
              >
                <div className="section">
                  <Trend
                    data={densityDataset.values}
                    height={400}
                    valueKey="v"
                    timeKey="t"
                    colorA={'#93C5D6'}
                    colorB={'#BAE8DB'}
                    trendName={'densityTrend'}
                    progress={progress}
                    negative={true}
                  />
                  <div className="sectionText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam ut ultricies sapien, ut convallis diam. Integer id
                    felis vel metus condimentum pulvinar. Nam ullamcorper
                    iaculis ligula, non vehicula erat posuere vitae. Duis
                    posuere lacinia dui ac molestie. Integer volutpat hendrerit
                    odio, vel pharetra tellus vestibulum quis. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Praesent in urna quis sem commodo
                    elementum eu quis sapien. Sed eget tellus sollicitudin
                    tortor lobortis consectetur. Nulla turpis nisi, sodales eget
                    lacus eget, efficitur ultrices magna. Nullam pretium ante et
                    sem lacinia, in imperdiet velit euismod. Donec mollis eget
                    velit luctus maximus.{' '}
                  </div>
                </div>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div
                className="w-100 chapter-3"
                style={{ backgroundColor: '#D0E4E7', height: '200vh' }}
              >
                <div className="section">
                  <Trend
                    data={popSoldeDataset.values}
                    height={400}
                    valueKey="v"
                    timeKey="t"
                    colorA={'#93C5D6'}
                    colorB={'#BAE8DB'}
                    trendName={'popSoldeTrend'}
                    progress={progress}
                    negative={true}
                  />
                  <div className="sectionText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam ut ultricies sapien, ut convallis diam. Integer id
                    felis vel metus condimentum pulvinar. Nam ullamcorper
                    iaculis ligula, non vehicula erat posuere vitae. Duis
                    posuere lacinia dui ac molestie. Integer volutpat hendrerit
                    odio, vel pharetra tellus vestibulum quis. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Praesent in urna quis sem commodo
                    elementum eu quis sapien. Sed eget tellus sollicitudin
                    tortor lobortis consectetur. Nulla turpis nisi, sodales eget
                    lacus eget, efficitur ultrices magna. Nullam pretium ante et
                    sem lacinia, in imperdiet velit euismod. Donec mollis eget
                    velit luctus maximus.{' '}
                  </div>
                </div>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    );
  }
}

export default Home;
