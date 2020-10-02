import React, { Component, Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from '../Trend';
import populationDataset from '../../data/datasets/population.json';
import landing from '../../assets/images/landing.svg';
import Container from './Container';
import TextContainer from './TextContainer';
import { isMobileWithTablet } from '../../constants';
import logo1 from '../../assets/images/Statec-logo.png';
import logo2 from '../../assets/images/UNI_C2DH_noir_transp.png';

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
      element.children[0].style.top = '50vh';
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
    const moduleDataset = require(`../../data/datasets/${theme.modules[data].datasetHeading}.json`);

    return (
      <div
        className="w-100"
        style={{
          backgroundColor: color,
        }}
      >
        {heading && (
          <div className="heroContainer">
            <div className="heroContainerWrapper">
              <div className="section-small">
                <img
                  src={logo1}
                  alt={'Statec logo'}
                  style={{ height: '8vh' }}
                />
                <img
                  src={logo2}
                  alt={'UNI C2DH logo'}
                  style={{ height: '8vh' }}
                />
                <h1 className="tc">Les chiffres des migrations</h1>
                <h2 className="sans fw3 mt0">Framing Luxembourg</h2>
                <img src={landing} style={{ height: '30vh' }} />
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            backgroundColor: color,
          }}
        >
          <div
            className="w-100 chapter-1"
            style={{
              backgroundColor: color,
              paddingBottom: window.innerHeight * 0.05,
            }}
          >
            <div
              className="section"
              style={{ paddingTop: '30px', backgroundColor: color }}
            >
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 3,
                  backgroundColor: color,
                  height: '50vh',
                  paddingTop: '2vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'justify-between',
                }}
              >
                <div style={{ height: '24vh' }}>
                  <div className="sectionTitle" style={{ height: '20px' }}>
                    {/*theme.title*/}
                  </div>
                  <Trend
                    title={populationDataset.title}
                    legend={populationDataset.legend}
                    data={populationDataset.values}
                    progress={progress}
                    height={window.innerHeight * 0.24 - 100}
                    valueKey="v"
                    timeKey="t"
                    trendName={'populationTrend'}
                    negative={false}
                    from={theme.modules[data].from}
                    to={theme.modules[data].to}
                  />
                </div>
                <div className="relative" style={{ height: '25vh' }}>
                  <Trend
                    title={moduleDataset.title}
                    data={moduleDataset.values}
                    legend={moduleDataset.legend}
                    height={window.innerHeight * 0.24 - 63}
                    valueKey="v"
                    timeKey="t"
                    highlightKey="h"
                    trendName={theme.id}
                    progress={progress}
                    negative={true}
                    from={theme.modules[data].from}
                    to={theme.modules[data].to}
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
                    const moduleDataset = require(`../../data/datasets/${datasetName}.json`);
                    return (
                      <Step data={i} key={i}>
                        <div
                          style={{
                            height: '200vh',
                            paddingTop:
                              module.layout === 'text' ? '60vh' : '18vh',
                          }}
                        >
                          {module.layout === 'flowers' && (
                            <Container
                              module={module}
                              moduleDataset={moduleDataset}
                              progress={i === data ? progress : 0}
                              shouldRender={i === data}
                              focus={theme.modules[data].focus || null}
                              chapter={theme.modules[data]}
                              from={theme.modules[data].from}
                              to={theme.modules[data].to}
                            />
                          )}
                          {module.layout === 'text' && (
                            <TextContainer
                              module={module}
                              progress={i === data ? progress : 0}
                              shouldRender={i === data}
                              chapter={theme.modules[data]}
                              from={theme.modules[data].from}
                              to={theme.modules[data].to}
                            />
                          )}
                        </div>
                      </Step>
                    );
                  })}
                </Scrollama>
              </div>
              <div style={{ height: '120px' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chapter;
