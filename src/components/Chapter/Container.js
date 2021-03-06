import React from 'react';
import { animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import Flower from '../Flower/Flower';
import { isMobileWithTablet } from '../../constants';
import Narrative from '../Narrative/Narrative';
import Link from '../Link';

const Container = ({
  module,
  moduleDataset,
  progress,
  shouldRender,
  focus,
  from,
  to,
  chapter,
  extentValues,
  isLast,
  chapterIndex,
}) => {
  console.log('progress', progress);
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  const progressScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 0, 1, 0]);

  return (
    <div className="scrollSection" style={{ opacity: opacityScale(progress) }}>
      <div className="vizContainer">
        <div
          style={{
            width: '50%',
            display: isMobileWithTablet ? 'none' : 'flex',
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
              // filter by date
              .slice(0, isMobileWithTablet ? 1 : 2)
              .map((v, j) => {
                return (
                  <div
                    key={`flower-${j}`}
                    style={{
                      width: isMobileWithTablet ? '100%' : '50%',
                      paddingTop: isMobileWithTablet ? 0 : '4vh',
                      display: 'flex',
                      alignItems: 'top',
                    }}
                  >
                    <Flower
                      colorA={'#FFCCB6'}
                      colorB={'#f8b294'}
                      colorC={'#F77DA6'}
                      data={v}
                      extentDates={[from, to]}
                      extentValues={extentValues}
                      height={
                        isMobileWithTablet
                          ? window.innerHeight * 0.4
                          : window.innerHeight * 0.4
                      }
                      width={
                        isMobileWithTablet
                          ? window.innerWidth * 0.4
                          : window.innerWidth * 0.24
                      }
                      progress={progressScale(progress)}
                      key={`flower-${j}`}
                    />
                  </div>
                );
              })}
        </div>
        <div
          className="textContainer"
          style={{
            width: isMobileWithTablet ? '100%' : '50%',
            fontSize: '25px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '90%',
              //backgroundColor: 'rgba(0,0,0,0.02)',
              paddingLeft: isMobileWithTablet ? 0 : '10px',
              fontSize: '25px',
            }}
          >
            <Narrative
              chapter={chapter}
              progress={progress}
              from={from}
              to={to}
            />
          </div>
        </div>
      </div>
      {/* <div
        className="sectionText"
        style={{ display: isMobileWithTablet ? 'none' : 'flex' }}
      >
        <div className="moduleTitle" style={{ position: 'relative' }}>
          {moduleDataset.title}
          {moduleDataset.subheading ? `, ${moduleDataset.subheading}` : ''}
        </div>
        {moduleDataset.paragraphs && (
          <p className="moduleParagraph">{moduleDataset.paragraphs}</p>
        )}
      </div> */}
      {isLast && <Link chapterIndex={chapterIndex} />}
    </div>
  );
};

export default Container;
