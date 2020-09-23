import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import Flower from './Flower';

const Container = ({ flowerDataset, progress }) => {
  //const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  return (
    <animated.div
      className="scrollSection"
      style={{ opacity: opacityScale(progress) }}
    >
      <div className="sectionText">
        <div className="moduleTitle" style={{ position: 'relative' }}>
          {flowerDataset.title}
        </div>
        {flowerDataset.subheading && (
          <div className="moduleSubTitle">{flowerDataset.subheading}</div>
        )}
        {flowerDataset.paragraphs && (
          <p className="moduleParagraph">{flowerDataset.paragraphs}</p>
        )}
      </div>
      <div className="vizContainer">
        <div
          style={{
            width: '60%',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {flowerDataset.values.map((v, j) => {
            return (
              <div style={{ width: '50%' }} key={`flower-${j}`}>
                <Flower
                  colorA={'#F2C4B0'}
                  colorB={'#E8BCA9'}
                  colorC={'#E989A9'}
                  data={v}
                  height={window.innerWidth * 0.25}
                  progress={progress}
                  key={`flower-${j}`}
                />
              </div>
            );
          })}
        </div>
        <div style={{ width: '40%', paddingLeft: '30px' }}>
          <div className="peakDate">{`Peak date ${progress}`}</div>
          <div className="peakTitle">
            Peak explanation lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Container;
