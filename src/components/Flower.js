import React, { useEffect, useState } from 'react';
import Bezier from './Bezier';
import { extent, merge } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';

const Flower = ({ colorA, colorB, data, height, title }) => {
  const dataArray = Object.values(data.keys);
  const keysArray = Object.keys(data.keys);
  const dates = keysArray.map((d) => {
    if (d.includes('-')) {
      const splitted = d.split('-');
      return [splitted[0], splitted[1]];
    }
    return [d];
  });
  const flattenDates = merge(dates);
  const [minDate, maxDate] = extent(flattenDates, (d) => d);
  const radius = height / 3.5;
  const circumference = 2 * Math.PI * radius;
  const nOfPetals = dataArray.length;
  const petalMaxWidth = parseInt(circumference / (nOfPetals - 1));
  const angleD = (Math.PI * 2) / nOfPetals;
  const scaleY = scaleLinear().domain([0, 1000]).range([0, petalMaxWidth]);
  // const scaleWidth = scaleLinear()
  //   .domain([0, Number(maxDate) - Number(minDate) - 1])
  //   .range([0, circumference]);

  // console.log(Number(maxDate) - Number(minDate) - 1);
  // console.log(circumference);

  return (
    <div style={{ position: 'relative', width: height }}>
      <svg width={height} height={height}>
        <defs>
          <linearGradient
            id={`bezierGradient`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={colorA} stopOpacity={1} />
            <stop offset="100%" stopColor={colorB} stopOpacity={1} />
          </linearGradient>
        </defs>
        <g transform={`translate(${height / 2},${height / 2})`}>
          {dataArray.map((d, i) => {
            const angle = i * angleD;
            const deg = angle * (180 / Math.PI);
            const petalWidth = parseInt(circumference / (nOfPetals - 1));
            const curveHeight = scaleY(d.v);
            // const date = dates[i];
            // const petalWidth =
            //   scaleWidth(
            //     date.length === 1 ? 1 : Number(date[1]) - Number(date[0]),
            //   ) * 2;

            // console.log(
            //   'petalWidth',
            //   date.length === 1 ? 1 : Number(date[1]) - Number(date[0]),
            // );

            return (
              <g
                transform={`translate(${Math.sin(angle) * radius}, ${
                  Math.cos(angle) * radius
                })`}
              >
                <g
                  transform={`translate(-${
                    petalWidth / 2
                  },-${curveHeight}) rotate(${-deg + 180}, ${
                    petalWidth / 2
                  }, ${curveHeight})`}
                >
                  <Bezier
                    height={curveHeight}
                    width={petalWidth}
                    c1={petalWidth * 0.2}
                    c2={petalWidth * 0.1}
                  />
                </g>
              </g>
            );
          })}
          <circle
            cx={0}
            cy={0}
            r={radius * 1.03}
            stroke={'none'}
            fill="white"
          />

          {/* <g
          transform={`matrix(sx, 0, 0, ${sy}, ${cx}-${sx}*${cx}, ${cy}-${sy}*${cy})`}
        >
          <Bezier height={100} width={100} c1={20} c2={10} />
        </g> */}
        </g>
      </svg>
      <div
        dx={2}
        style={{
          color: '#d1646c',
          fontSize: '14px',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          width: '50%',
          left: '25%',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default Flower;
