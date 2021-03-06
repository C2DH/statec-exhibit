import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { isMobileWithTablet } from '../../constants';
import { Spring, animated } from 'react-spring/renderprops';
import Container from './Container';
import TextContainer from './TextContainer';
import GraphicContainer from './GraphicContainer';
import Trend from '../Trend';
import ChapterFooter from './ChapterFooter';


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
      console.info(
        'Chapter @componentDidMount: resize should update Scrollama',
      );
      window.dispatchEvent(new Event('resize'));
    }, 200);

    const img = new Image();
    img.src = this.props.theme.cover.url; // by setting an src, you trigger browser download

    img.onload = () => {
      // when it finishes loading, update the component state
      this.setState({ imageIsReady: true });
    };
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
    const { progress, data, imageIsReady } = this.state;
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

    console.log('rendering chapter', theme.id);

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
              {isMobileWithTablet ? (
                <Spring
                  to={{
                    backgroundClipPath:
                      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  }}
                  from={{
                    backgroundClipPath:
                      'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
                  }}
                  delay={1000}
                >
                  {(props) => (
                    <animated.div
                      className="chapterBg"
                      style={{
                        clipPath: props.backgroundClipPath,
                        backgroundImage: `url(${theme.cover.url})`,
                        opacity: props.opacity,
                      }}
                    />
                  )}
                </Spring>
              ) : (
                <Spring
                  to={{
                    backgroundClipPath:
                      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  }}
                  from={{
                    backgroundClipPath:
                      'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
                  }}
                  delay={1000}
                >
                  {(props) => (
                    <animated.div
                      className="chapterFrame"
                      style={{
                        clipPath: props.backgroundClipPath,
                      }}
                    >
                      <img src={theme.cover.url} />
                    </animated.div>
                  )}
                </Spring>
              )}
              <Spring
                to={{
                  opacity: 1,
                }}
                from={{
                  opacity: 0,
                }}
                delay={100}
              >
                {(props) => (
                  <div className="chapterCoverWrapper withCover">
                    <animated.div
                      className="section-small"
                      style={{
                        opacity: props.opacity,
                      }}
                    >
                      <h2
                        className="sans mv0"
                        style={{
                          fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                        }}
                      >{`Chapter ${chapterIndex}`}</h2>
                      <h1
                        className="tc"
                        style={{
                          fontSize: isMobileWithTablet ? '16vw' : '8vw',
                          marginTop: '10px',
                          marginBottom: '80px',
                        }}
                      >
                        {theme.title}
                      </h1>
                    </animated.div>
                  </div>
                )}
              </Spring>
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
              {theme.modules.map((module, i) => {
               if (!['compare', 'textOnly', 'text'].includes(module.layout)) {
                 return null
               }
               return <GraphicContainer key={i} module={module} progress={i === data ? progress : 0} />
              })}
              <div>
                <Scrollama
                  onStepEnter={this.onStepEnter}
                  onStepExit={this.onStepExit}
                  progress
                  onStepProgress={this.onStepProgress}
                  offset={0.42}
                  threshold={0}
                >
                  {theme.modules.map((module, i) => (
                    <Step data={i} key={`theme-${chapterIndex}-${i}`}>
                      <div
                        style={{
                          height: window.innerHeight * 2,
                          borderTop: '1px solid'
                        }}
                      >&nbsp;{i}</div>
                    </Step>
                  ))}
                  {/* theme.modules.map((module, i) => {
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
                          {module.layout === 'oldtext' && (
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
                  }) */}
                </Scrollama>
              </div>
              <div style={{ height: '120px' }}></div>
            </div>
          </div>
          <ChapterFooter chapterIndex={chapterIndex} />
        </div>
      </div>
    );
  }
}

export default Chapter;
