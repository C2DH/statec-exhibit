import React from 'react';
import { animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import Narrative from '../Narrative/Narrative';

const ImageContainer = ({ index, module, progress, from, to, chapter }) => {
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);
  return (
    <animated.div
      className="scrollSection"
      style={{
        opacity: opacityScale(progress),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          className="imageContainer"
          style={{ width: '60%', paddingRight: '15px' }}
        >
          <figure>
            <img src={module.image.src} />
          </figure>
          <div>{index + 1}</div>
          <div className="textContainerTitle" style={{ position: 'relative' }}>
            {module.title}
          </div>
          {module.subheading && (
            <div
              className="textContainerSubTitle"
              dangerouslySetInnerHTML={{
                __html: module.subheading,
              }}
            />
          )}
        </div>
        <div
          className="textContainer"
          style={{ width: '40%', fontSize: '25px' }}
        >
          <div
            style={{
              width: '100%',
              height: '90%',
              backgroundColor: 'rgba(0,0,0,0.02)',
              paddingLeft: '10px',
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
    </animated.div>
  );
};

export default ImageContainer;
