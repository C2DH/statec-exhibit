import React from 'react';
import { animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import Flower from '../Flower/Flower';
import { isMobileWithTablet } from '../../constants';

const Container = ({
  module,
  moduleDataset,
  progress,
  shouldRender,
  focus,
}) => {
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  const progressScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 0, 1, 0]);

  return (
    <animated.div
      className="scrollSection"
      style={{ opacity: opacityScale(progress) }}
    >
      <div className="sectionText">
        <div className="moduleTitle" style={{ position: 'relative' }}>
          {moduleDataset.title}
          {moduleDataset.subheading ? `, ${moduleDataset.subheading}` : ''}
        </div>
        {moduleDataset.paragraphs && (
          <p className="moduleParagraph">{moduleDataset.paragraphs}</p>
        )}
      </div>
      <div className="vizContainer">
        <div
          style={{
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {shouldRender &&
            moduleDataset.values
              .filter((v, i) => {
                // use the `groups` properties to filter flowers
                if (isMobileWithTablet) {
                  return focus ? focus === v.group : true;
                } else {
                  if (!Array.isArray(module.groups)) {
                    return v;
                  }
                  return module.groups.includes(v.group);
                }
              })
              .map((v, j) => {
                return (
                  <div
                    key={`flower-${j}`}
                    style={{
                      width: isMobileWithTablet ? '100%' : '25%',
                      paddingTop: isMobileWithTablet ? 0 : '4vh',
                    }}
                  >
                    <Flower
                      colorA={'#FFCCB6'}
                      colorB={'#f8b294'}
                      colorC={'#F77DA6'}
                      data={v}
                      height={
                        isMobileWithTablet
                          ? window.innerHeight * 0.5
                          : window.innerHeight * 0.4
                      }
                      width={
                        isMobileWithTablet
                          ? window.innerWidth * 0.7
                          : window.innerWidth * 0.28
                      }
                      progress={progressScale(progress)}
                      key={`flower-${j}`}
                    />
                  </div>
                );
              })}
        </div>
        {/* <div style={{ width: '40%', paddingLeft: '30px' }}>
          <div className="peakDate">{`Peak date ${progress}`}</div>
          <div className="peakTitle">
            Peak explanation lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </div>
        </div> */}
      </div>
    </animated.div>
  );
};

export default Container;
