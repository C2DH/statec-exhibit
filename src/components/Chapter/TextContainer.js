import React from 'react';
import { animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';

const TextContainer = ({ module, progress }) => {
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  return (
    <animated.div
      className="scrollSection"
      style={{ opacity: opacityScale(progress) }}
    >
      <div className="textContainer">
        <div className="textContainerTitle" style={{ position: 'relative' }}>
          {module.title}
        </div>
        {module.subheading && (
          <div className="textContainerSubTitle">{module.subheading}</div>
        )}
        {/* {module.paragraphs && (
          <p className="moduleParagraph">{module.paragraphs}</p>
        )} */}
      </div>
    </animated.div>
  );
};

export default TextContainer;
