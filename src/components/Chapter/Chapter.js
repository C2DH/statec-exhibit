import React, { Component, Fragment, Suspense } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { isMobileWithTablet } from '../../constants';

const Container = React.lazy(() => import('./Container'));
const TextContainer = React.lazy(() => import('./TextContainer'));
const ImageContainer = React.lazy(() =>
  import('../ImageContainer/ImageContainer'),
);
const Trend = React.lazy(() => import('../Trend'));

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
    const { theme, headColor, color, chapterIndex } = this.props;
    const moduleDataset = require(`../../data/datasets/${theme.modules[data].datasetHeading}.json`);
    const themeDataset = require(`../../data/datasets/${theme.dataset}.json`);

    return (
      <div
        className="w-100"
        style={{
          backgroundColor: color,
        }}
      >
        <div className="chapterCover">
          <div
            style={{
              backgroundImage: `url(${theme.cover.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
              position: 'absolute',
              zIndex: 0,
            }}
          ></div>
          <div
            className="chapterCoverWrapper withCover"
            style={{ backgroundColor: headColor }}
          >
            <div className="section-small">
              <h2 className="sans">{`Chapter ${chapterIndex}`}</h2>
              <h1 className="tc  fw3 mt0">{theme.title}</h1>
            </div>
          </div>
        </div>
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
                <Suspense fallback={''}>
                  <div style={{ height: '24vh' }}>
                    <div className="sectionTitle" style={{ height: '20px' }}>
                      {theme.title}
                    </div>
                    <Trend
                      title={themeDataset.title}
                      legend={themeDataset.legend}
                      data={themeDataset.values}
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
                      hotspots={theme.modules[data].moduleHotspots}
                      paragraphs={theme.modules[data].paragraphs}
                    />
                  </div>
                  <div className="hr"></div>
                </Suspense>
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
                    let moduleDataset = null;
                    if (module.dataset) {
                      moduleDataset = require(`../../data/datasets/${module.dataset}.json`);
                    }
                    return (
                      <Step data={i} key={i}>
                        <div
                          style={{
                            height: '200vh',
                            paddingTop:
                              module.layout === 'text' ? '60vh' : '18vh',
                          }}
                        >
                          <Suspense fallback={''}>
                            {module.layout === 'image' && (
                              <ImageContainer
                                index={i}
                                module={module}
                                progress={i === data ? progress : 0}
                                shouldRender={i === data}
                                chapter={theme.modules[data]}
                                from={theme.modules[data].from}
                                to={theme.modules[data].to}
                              />
                            )}
                            {module.layout === 'flowers' && moduleDataset && (
                              <Container
                                module={module}
                                moduleDataset={moduleDataset}
                                progress={i === data ? progress : 0}
                                shouldRender={i === data}
                                focus={theme.modules[data].focus || null}
                                chapter={theme.modules[data]}
                                extentValues={theme.modules[data].extent}
                                from={theme.modules[data].from}
                                to={theme.modules[data].to}
                              />
                            )}
                            {module.layout === 'text' && (
                              <TextContainer
                                index={i}
                                module={module}
                                progress={i === data ? progress : 0}
                                shouldRender={i === data}
                                chapter={theme.modules[data]}
                                from={theme.modules[data].from}
                                to={theme.modules[data].to}
                              />
                            )}
                          </Suspense>
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
