import React, { useEffect, useState } from 'react';
import Bezier from './Bezier';
import { extent, merge } from 'd3-array';
import { scaleLinear, scaleTime, scalePow } from 'd3-scale';
import moment from 'moment';
import { red } from '../../constants';
import { useStore } from '../../store';
import { isMobileWithTablet, isTabletC } from '../../constants';
import FlowerLegend from './FlowerLegend'

const nMinPetals = 8;

const Flower = ({
  colorA,
  colorB,
  colorC,
  data,
  width,
  height,
  extentValues = [],
  extentDates = [],
  fill="#EDEDED",
  stroke="black",
} = {}) => {
  const title = data.group;
  let selectedTime = null;
  // console.info('Flower extentDates', extentDates, data):
  let entries = Object.entries(data.keys)
  if (extentDates.length) {
    entries = entries.filter(([key, value]) => {
      const year = parseInt(key, 10)
      return year >= extentDates[0] && year <= extentDates[1]
    })
  }
  const dataArray = [] // Object.values(data.keys);
  const keysArray = [] // Object.keys(data.keys);
  entries.forEach(([key, value]) => {
    dataArray.push(value)
    keysArray.push(key)
  })
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
  const scaleY = scalePow()
    .exponent(2)
    .domain([min, max])
    .clamp(true)
    .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
  const scaleYUnclamped = scalePow()
    .exponent(2)
    .domain([min, max])
    .clamp(false)
    .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
  const startDate = moment(minDate);
  const endDate = moment(maxDate);
  const scaleX = scaleTime().domain([startDate, endDate]).range([0, 0.5]);
  const progressYear = useStore.getState().actualYear;

  return (
    <div className="Flower"
      style={{
        position: 'relative',
        width: dimension,
        margin: isMobileWithTablet ? '0 auto' : 0,
      }}
    >
      <FlowerLegend title={title} selectedTime={progressYear} />
      <div className="relative">
        <div className="tc absolute h-50 bl" style={{
          left: '50%',
          zIndex:-1,
          top: -20
        }}><span className="pl2">{minDate}</span></div>
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
          <g transform={`translate(${dimension / 2},0)`}>
            <text>{minDate}</text>
          </g>
          <g transform={`translate(${dimension / 2},${dimension / 2})`}>
            <circle cx={0} cy={0} r={radius * 1} stroke={stroke} fill={fill} />
            {dataArray.map((d, i) => {
              const isNegative = d.v < 0;
              const angle = (dataArray.length - i) * angleD + Math.PI;
              const deg = angle * (180 / Math.PI);
              const petalWidth =
                nOfPetals > nMinPetals
                  ? parseInt(circumference / (nOfPetals - 1))
                  : parseInt(circumference / nMinPetals);
              const curveHeight = scaleYUnclamped(d.v);
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

              if (selected) {
                console.log((dataArray.length - i) * angleD);
              }

              return (
                <g
                  transform={`translate(${Math.sin(angle) * radius}, ${
                    Math.cos(angle) * radius
                  }) `}
                  key={`petal-${i}`}
                >
                  <g
                    transform={`translate(-${petalWidth / 2},${
                      curveHeight * -1
                    }) rotate(${-deg + 180}, ${petalWidth / 2}, ${curveHeight})`}
                  >
                    <Bezier
                      height={curveHeight}
                      width={petalWidth}
                      c1={petalWidth * 0.2}
                      c2={petalWidth * 0.1}
                      selected={selected}
                    />
                  </g>
                  <text
                    style={{
                      display: selected ? 'block' : 'none',
                      textAnchor: 'middle',
                      transform: `rotate(${-deg})`,
                      dominantBaseline: 'central',
                      color: '#2b219f',
                      fontSize: '12px',
                    }}
                    dx={Math.sin(angle) * radius * 0.5}
                    dy={Math.cos(angle) * radius * 0.5}
                  >
                    {d.v}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Flower;
