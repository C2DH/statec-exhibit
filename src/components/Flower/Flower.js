import React, { useEffect, useState } from 'react';
import Bezier from './Bezier';
import { extent, merge } from 'd3-array';
import { scaleLinear, scaleTime, scalePow } from 'd3-scale';
import moment from 'moment';
import { red } from '../../constants';
import { useStore } from '../../store';
import { isMobileWithTablet } from '../../constants';

const nMinPetals = 8;

const Flower = ({ colorA, colorB, colorC, data, width, height, extentValues = []} = {}) => {
  const title = data.group;
  let selectedTime = null;
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
  const [min, max] = extentValues.length
    ? extentValues
    : extent(dataArray, (d) => Math.max(0, d.v));
  const dimension = Math.min(width, height);
  const radius = isMobileWithTablet ? dimension / 3.5 : dimension / 4;
  const circumference = 2 * Math.PI * radius;
  const nOfPetals = dataArray.length;
  const petalMaxWidth =
    nOfPetals > nMinPetals
      ? parseInt(circumference / (nOfPetals - 1))
      : parseInt(circumference / nMinPetals);
  const angleD = (Math.PI * 2) / nOfPetals;
  const scaleY = scalePow().exponent(2)
    .domain([min, max])
    .clamp(true)
    .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
  const scaleYUnclamped = scalePow().exponent(2)
    .domain([min, max])
    .clamp(false)
    .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
  const startDate = moment(minDate);
  const endDate = moment(maxDate);
  const scaleX = scaleTime().domain([startDate, endDate]).range([0, 0.5]);
  const progressYear = useStore.getState().actualYear;

  return (
    <div
      style={{
        position: 'relative',
        width: dimension,
        margin: isMobileWithTablet ? '0 auto' : 0,
      }}
    >
      <svg width={dimension} height={dimension}>
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
            <stop offset="48%" stopColor={colorB} stopOpacity={1} />
            <stop offset="100%" stopColor={colorC} stopOpacity={1} />
          </linearGradient>
        </defs>
        <g transform={`translate(${dimension / 2},${dimension / 2})`}>
          {dataArray.map((d, i) => {
            const isNegative = d.v < 0;
            const angle = (dataArray.length - i) * angleD + Math.PI;
            const deg = angle * (180 / Math.PI);
            const petalWidth =
              nOfPetals > nMinPetals
                ? parseInt(circumference / (nOfPetals - 1))
                : parseInt(circumference / nMinPetals);
            const curveHeight = scaleY(d.v);
            let selected = false;
            const keyYear = keysArray[i];
            if (keyYear.includes('-')) {
              const [minKey, maxKey] = keyYear.split('-');
              if (
                progressYear >= Number(minKey) &&
                progressYear <= Number(maxKey)
              ) {
                selected = true;
                selectedTime = keyYear;
              }
            } else {
              if (Number(keyYear) === progressYear) {
                selected = true;
                selectedTime = keyYear;
              }
            }

            return (
              <g
                transform={`translate(${Math.sin(angle) * radius}, ${
                  Math.cos(angle) * radius
                })`}
                key={`petal-${i}`}
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
                    selected={selected}
                  />
                  <text
                    style={{
                      display: selected ? 'block' : 'none',
                    }}
                    dy={-10}
                  >
                    {d.v}
                  </text>
                </g>
              </g>
            );
          })}
          <circle cx={0} cy={0} r={radius * 1} stroke={'none'} fill="#EDEDED" />
        </g>
      </svg>
      <div
        dx={2}
        style={{
          color: red,
          fontSize: isMobileWithTablet ? '5vw' : '1.2vw',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          width: '50%',
          left: '25%',
          height: '30px',
          marginTop: '-15px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {title}
        <br />
        {selectedTime}
      </div>
    </div>
  );
};

export default Flower;
