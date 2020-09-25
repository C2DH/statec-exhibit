import React, { Component, Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from './components/Trend';
import populationDataset from './data/datasets/population.json';
import landing from './assets/images/landing.svg';
import Container from './components/Container';
import TextContainer from './components/TextContainer';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      steps: [],
      progress: 0,
    };
  }

  componentDidMount() {
    if (this.props.theme.modules) {
      const steps = Array.from(
        Array(this.props.theme.modules.length),
        (_, x) => x * 10,
      );
      this.setState({ steps: steps });
    }
  }

  onStepEnter = ({ element, data }) => {
    if (element.children[0]) {
      element.children[0].style.position = 'fixed';
      element.children[0].style.top = '48vh';
      element.children[0].style.paddingTop = 0;
      element.children[0].style.left = '5%';
      element.children[0].style.width = '90%';
    }
    this.setState({ data });
  };

  onStepExit = ({ element, direction, data }) => {
    console.log('onStepExit');
    if (element.children[0]) {
      element.children[0].style.position = 'relative';
      element.children[0].style.top = '0';
      element.children[0].style.paddingTop = 0;
      element.children[0].style.left = '0';
      element.children[0].style.width = '100%';
      element.children[0].style.opacity = 0;
    }

    if (direction === 'up' && data === this.state.steps[0]) {
      this.setState({ data: 0 });
    }
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    const { progress, data } = this.state;
    const { theme, heading, color } = this.props;
    const themeDatasetName = theme.dataset;
    const themeDataset = require(`./data/datasets/${themeDatasetName}.json`);
    const moduleDataset = require(`./data/datasets/population-solde.json`);

    return (
      <div className="w-100">
        {heading && (
          <div
            className="w-100 chapter-2"
            style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
          >
            <div
              className="absolute"
              style={{
                backgroundColor: '#FFD8C2',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 2,
              }}
            >
              <div className="section-small">
                <h1 className="tc">Les chiffres des migrations</h1>
                <h2 className="sans fw3 mt0">Framing Luxembourg</h2>
                <img src={landing} width={250} />
              </div>
            </div>
          </div>
        )}
        <div>
          <div
            className="w-100 chapter-1"
            style={{
              backgroundColor: color,
              paddingBottom: window.innerHeight * 0.05,
            }}
          >
            <div className="section" style={{ paddingTop: '30px' }}>
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 3,
                  backgroundColor: color,
                  height: 'calc(46vh + 15px)',
                  paddingTop: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'justify-between',
                }}
              >
                <div style={{ height: '20vh' }}>
                  <div className="sectionTitle">{theme.title}</div>
                  <div className="mt3">
                    <Trend
                      title={populationDataset.title}
                      data={populationDataset.values}
                      progress={progress}
                      height={70}
                      valueKey="v"
                      timeKey="t"
                      trendName={'populationTrend'}
                      negative={false}
                    />
                  </div>
                </div>
                <div className="relative" style={{ height: '25vh' }}>
                  <Trend
                    title={moduleDataset.title}
                    data={moduleDataset.values}
                    height={window.innerHeight * 0.2}
                    valueKey="v"
                    timeKey="t"
                    highlightKey="h"
                    trendName={theme.id}
                    progress={progress}
                    negative={true}
                  />
                </div>
                <div className="hr"></div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <Scrollama
                  onStepEnter={this.onStepEnter}
                  onStepExit={this.onStepExit}
                  progress
                  onStepProgress={this.onStepProgress}
                  offset={0.42}
                  threshold={0}
                >
                  {theme.modules.map((module, i) => {
                    const datasetName = module.dataset;
                    const moduleDataset = require(`./data/datasets/${datasetName}.json`);
                    const moduleDatasetName = module.datasetHeading;
                    return (
                      <Step data={i} key={i}>
                        <div style={{ height: '200vh', paddingTop: '48vh' }}>
                          {module.layout === 'flowers' && (
                            <Container
                              module={module}
                              moduleDataset={moduleDataset}
                              progress={i === data ? progress : 0}
                              shouldRender={i === data}
                            />
                          )}
                          {module.layout === 'text' && (
                            <TextContainer
                              module={module}
                              progress={i === data ? progress : 0}
                              shouldRender={i === data}
                            />
                          )}
                        </div>
                      </Step>
                    );
                  })}
                </Scrollama>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chapter;
