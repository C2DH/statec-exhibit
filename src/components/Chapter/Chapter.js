import React, { Component} from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { isMobileWithTablet } from '../../constants';
import { Spring, animated } from 'react-spring/renderprops';
import Container from './Container';
import TextContainer from './TextContainer';
import Trend from '../Trend';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      steps: [],
      progress: 0,
      scrolled: false,
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
    this.timerID = setTimeout(() => {
      console.info('Chapter @componentDidMount: resize should update Scrollama')
      window.dispatchEvent(new Event('resize'));
    }, 20)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onStepEnter = ({ element, data }) => {
    if (element.children[0]) {
      element.children[0].style.position = 'fixed';
      element.children[0].style.top = isMobileWithTablet ? '60vh' : '50vh';
      element.children[0].style.paddingTop = 0;
      element.children[0].style.left = '5%';
      element.children[0].style.width = '90%';
    }
    this.setState({ data });
  };

  onStepExit = ({ element, direction, data }) => {
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
    const {
      theme,
      // headColor,
      color,
      chapterIndex,
      showCover = true,
      showTitle = true,
    } = this.props;
    const moduleDataset = require(`../../data/datasets/${theme.modules[data].datasetHeading}.json`);
    const themeDataset = require(`../../data/datasets/${theme.dataset}.json`);

    console.log('rendering chapter', data);

    return (
      <div
        className="w-100"
        style={{
          backgroundColor: color,
        }}
      >
        {showCover && (
          <div className="chapterCover">
            <div
              className="chapterFrameWrapper"
              style={{
                backgroundColor: color,
                width: '100%',
                height: '100vh',
                zIndex: 1,
                position: 'absolute',
              }}
            >
              <Spring
                to={{
                  backgroundClipPath:
                    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                }}
                from={{
                  backgroundClipPath:
                    'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
                }}
                config={{
                  duration: 500,
                  tension: 0,
                  friction: 0,
                  precision: 0.01,
                }}
              >
                {(props) => (
                  <animated.div
                    className="chapterFrame"
                    style={{
                      // transition: 'clip-path .5s ease-in-out',
                      clipPath: props.backgroundClipPath,
                    }}
                  >
                    <div
                      className="bg"
                      style={{
                        // willChange: 'transform',
                        backgroundImage: `url(${theme.cover.url})`,
                      }}
                    />
                  </animated.div>
                )}
              </Spring>
              <div className="chapterCoverWrapper withCover">
                <div className="section-small">
                  <h2
                    className="sans mv0"
                    style={{
                      fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                    }}
                  >{`Chapter ${chapterIndex}`}</h2>
                  <h1
                    className="tc"
                    style={{
                      fontSize: '8vw',
                      marginTop: '10px',
                      marginBottom: '80px',
                    }}
                  >
                    {theme.title}
                  </h1>
                </div>
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
                  height: isMobileWithTablet ? '60vh' : '50vh',
                  paddingTop: '2vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'justify-between',
                }}
              >
                <div
                  style={{
                    height: isMobileWithTablet ? '30vh' : '24vh',
                    paddingTop: '15px',
                  }}
                >
                  {showTitle && (
                    <div
                      className="sectionTitle"
                      style={{
                        height: '20px',
                        marginTop: '-15px',
                        fontSize: '16px',
                      }}
                    >
                      {theme.title}
                    </div>
                  )}
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
                    valueFrom={theme.modules[data].datasetValueFrom}
                    valueTo={theme.modules[data].datasetValueTo}
                    additionalTrends={
                      theme.modules[data].datasetAdditionalTrends
                    }
                    additionalTrendsColors={
                      theme.modules[data].datasetAdditionalTrendsColors
                    }
                  />
                </div>
                <div
                  className="relative"
                  style={{ height: isMobileWithTablet ? '30vh' : '25vh' }}
                >
                  <Trend
                    id={moduleDataset.id}
                    title={moduleDataset.title}
                    data={moduleDataset.values}
                    legend={moduleDataset.legend}
                    height={
                      isMobileWithTablet
                        ? window.innerHeight * 0.3 - 63
                        : window.innerHeight * 0.24 - 63
                    }
                    valueKey="v"
                    timeKey="t"
                    highlightKey="h"
                    trendName={theme.id}
                    progress={progress}
                    negative={true}
                    from={theme.modules[data].from}
                    to={theme.modules[data].to}
                    valueFrom={theme.modules[data].datasetHeadingValueFrom}
                    valueTo={theme.modules[data].datasetHeadingValueTo}
                    hotspots={theme.modules[data].moduleHotspots}
                    paragraphs={theme.modules[data].paragraphs}
                    additionalTrends={
                      theme.modules[data].datasetHeadingAdditionalTrends
                    }
                    additionalTrendsColors={
                      theme.modules[data].datasetHeadingAdditionalTrendsColors
                    }
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
                    let moduleDataset = null;
                    if (module.dataset) {
                      moduleDataset = require(`../../data/datasets/${module.dataset}.json`);
                    }
                    return (
                      <Step data={i} key={`theme-${chapterIndex}-${i}`}>
                        <div
                          style={{
                            height: '200vh',
                            paddingTop:
                              module.layout === 'text' ? '60vh' : '18vh',
                          }}
                        >
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
                              isLast={i === theme.modules.length - 1}
                              chapterIndex={chapterIndex}
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
                              isLast={i === theme.modules.length - 1}
                              chapterIndex={chapterIndex}
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
