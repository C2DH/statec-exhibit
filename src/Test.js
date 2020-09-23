import React, { Component, Fragment } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Trend from './components/Trend';
import populationDataset from './data/datasets/population.json';
import landing from './assets/images/landing.svg';
import theme from './data/themes/theme-01.json';

class Test extends Component {
  state = {
    data: 0,
    steps: [10, 20, 30],
    progress: 0,
  };

  onStepEnter = ({ element, data }) => {
    if (element.children[0]) {
      element.children[0].style.position = 'fixed';
      element.children[0].style.top = '50vh';
      element.children[0].style.paddingTop = 0;
    }
    this.setState({ data });
  };

  onStepExit = ({ element }) => {
    console.log('onStepExit');
    if (element.children[0]) {
      element.children[0].style.position = 'relative';
      element.children[0].style.top = '0';
    }
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    const { progress, data } = this.state;
    const themeDatasetName = theme.dataset;
    const themeDataset = require(`./data/datasets/${themeDatasetName}.json`);
    const moduleDataset = require(`./data/datasets/population-solde.json`);

    return (
      <div className="w-100">
        <Fragment>
          <div
            className="w-100 chapter-2"
            style={{ backgroundColor: '#FFD8C2', height: '100vh' }}
          >
            <div className="section-small">
              <h1 className="tc">Les chiffres des migrations</h1>
              <h2 className="sans fw3 mt0">Framing Luxembourg</h2>
              <img src={landing} width={250} />
            </div>
          </div>
          <div>
            <div
              className="w-100 chapter-1"
              style={{
                backgroundColor: '#D0E4E7',
                paddingBottom: window.innerHeight * 0.05,
              }}
            >
              <div className="section" styl>
                <div
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 3,
                    backgroundColor: 'rgb(208, 228, 231)',
                  }}
                >
                  <div className="">
                    <div className="mt3">
                      <Trend
                        data={populationDataset.values}
                        height={70}
                        valueKey="v"
                        timeKey="t"
                        trendName={'populationTrend'}
                        negative={false}
                      />
                      <div
                        className="moduleTitle"
                        style={{ top: 10, left: '10vw' }}
                      >
                        Population (1840-2014)
                      </div>
                    </div>
                  </div>
                  <div className="sectionTitle">{theme.title}</div>
                  <div className="relative">
                    <Trend
                      data={moduleDataset.values}
                      height={window.innerHeight * 0.2}
                      valueKey="v"
                      timeKey="t"
                      highlightKey="h"
                      trendName={theme.id}
                      progress={progress}
                      negative={true}
                    />
                    <div className="moduleTitle" style={{ bottom: -16 }}>
                      aaaaa
                    </div>
                  </div>
                </div>
                <div className="hr"></div>
                <div>
                  <Scrollama
                    onStepEnter={this.onStepEnter}
                    onStepExit={this.onStepExit}
                    progress
                    onStepProgress={this.onStepProgress}
                    offset={0}
                    threshold={0}
                  >
                    {theme.modules.map((mod, i) => {
                      const datasetName = mod.dataset;
                      const flowerDataset = require(`./data/datasets/${datasetName}.json`);
                      const moduleDatasetName = mod.datasetHeading;
                      return (
                        <Step data={i} key={i}>
                          <div style={{ height: '250vh' }}>
                            <div
                              className="section"
                              style={{ paddingTop: '50vh' }}
                            >
                              <div className="sectionText">
                                <div
                                  className="moduleTitle"
                                  style={{ position: 'relative' }}
                                >
                                  aaaaa
                                </div>
                                <div className="moduleSubTitle">aaaaa</div>

                                <p className="moduleParagraph">aaaaa</p>
                              </div>
                              <div className="vizContainer">
                                <div
                                  style={{
                                    width: '60%',
                                    display: 'flex',
                                    overflow: 'hidden',
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: '40%',
                                    paddingLeft: '30px',
                                  }}
                                >
                                  <div className="peakDate">{`Peak date ${i}`}</div>
                                  <div className="peakTitle">
                                    Peak explanation lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna
                                    aliqua.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Step>
                      );
                    })}
                  </Scrollama>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Test;
