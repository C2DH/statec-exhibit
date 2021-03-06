import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { extent } from 'd3-array';
import { scalePow } from 'd3-scale';
// import moment from 'moment'
import { useBoundingClientRect } from '../../hooks';
import { isMobileWithTablet } from '../../constants';
// import Flower from '../Flower'
import Bezier from '../Flower/Bezier';

const Flower = ({
  colors = ['#FFCCB6', '#f8b294', '#F77DA6'],
  data = [],
  minValue,
  maxValue,
  field = 'v',
  currentYear,
  active = false,
  fill = '#EDEDED',
  stroke = 'black',
  nMinPetals = 8,
}) => {
  const { t } = useTranslation();
  const [colorA, colorB, colorC] = colors;
  const [{ width, height }, ref] = useBoundingClientRect();
  const dimension = Math.min(width, height);
  const radius = isMobileWithTablet ? dimension / 3.5 : dimension / 4;
  const circumference = 2 * Math.PI * radius;

  const nOfPetals = data.length;
  // const petalMaxWidth =
  //   nOfPetals > nMinPetals
  //     ? parseInt(circumference / (nOfPetals - 1))
  //     : parseInt(circumference / nMinPetals)
  const petalWidth =
    nOfPetals > nMinPetals
      ? parseInt(circumference / (nOfPetals - 1))
      : parseInt(circumference / nMinPetals);
  const angleD = (Math.PI * 2) / nOfPetals;
  const {
    minYear,
    maxYear,
    scaleYUnclamped,
    scaleYUnclampedNegative,
  } = useMemo(() => {
    const [minYear, maxYear] = extent(data, (d) => d.t);
    const scaleYUnclamped = scalePow()
      .exponent(1)
      .domain([Math.max(0, minValue), Math.max(minValue * -1, maxValue)])
      .clamp(false)
      .range([2, radius / 2]); //petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
    const scaleYUnclampedNegative = scalePow()
      .exponent(1)
      .domain([maxValue * -1, 0])
      .clamp(false)
      .range([-radius / 2, -2]);
    return { minYear, maxYear, scaleYUnclamped, scaleYUnclampedNegative };
  }, [data, minValue, maxValue, radius]); // , petalMaxWidth ])
  const maxAngle = angleD + Math.PI;

  return (
    <div
      className="Flower h-100 w-100 flex flex-column"
      style={{
        flexGrow: 1,
      }}
    >
      <div
        className="Flower_legend tc sans"
        style={{
          fontSize: '12px',
          lineHeight: '14px',
          marginTop: 'var(--spacer-1)',
          color: 'var(--gray-500)',
        }}
      >
        Length of the petal = data in the indicated years
      </div>
      <div style={{ flexGrow: 1 }} ref={ref}>
        <div style={{ width, height, overflow: 'hidden' }}>
          <svg width={width} height={height}>
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

            <g transform={`translate(${width / 2},${height - radius * 2})`}>
              <text
                y={-radius * 1.6 - 5}
                textAnchor="start"
                style={{ fontSize: '12px' }}
                x={0}
              >
                {minYear} &rarr;
              </text>
              <line
                x1={0}
                y1={-radius}
                x2={0}
                y2={-radius * 1.6}
                stroke="black"
                strokeDasharray="2 1"
              ></line>
              <g
                transform={`translate(${Math.sin(maxAngle) * radius * 1.6}, ${
                  Math.cos(maxAngle) * radius * 1.6
                })`}
              >
                <text
                  textAnchor="end"
                  y={-5}
                  x={-5}
                  style={{ fontSize: '12px' }}
                >
                  {maxYear}
                </text>
              </g>
              <line
                x1={Math.sin(maxAngle) * radius}
                y1={Math.cos(maxAngle) * radius}
                x2={Math.sin(maxAngle) * radius * 1.5}
                y2={Math.cos(maxAngle) * radius * 1.5}
                stroke="black"
                strokeDasharray="2 1"
              />
              <circle
                cx={0}
                cy={0}
                r={radius}
                stroke={stroke}
                fill="transparent"
              />
              {data.map((d, i) => {
                const theta = (data.length - i) * angleD + Math.PI;
                const deg = theta * (180 / Math.PI);
                const selected = currentYear === d.t;
                const curveHeight =
                  d.v > 0 ? scaleYUnclamped(d.v) : scaleYUnclampedNegative(d.v);

                return (
                  <g
                    transform={`translate(${Math.sin(theta) * radius}, ${
                      Math.cos(theta) * radius
                    }) `}
                    key={`petal-${i}`}
                  >
                    {d.v !== 0 && (
                      <g
                        transform={`translate(-${petalWidth / 2},${
                          curveHeight * -1
                        }) rotate(${-deg + 180}, ${
                          petalWidth / 2
                        }, ${curveHeight})`}
                      >
                        <Bezier
                          fill={d.v > 0 ? `url(#bezierGradient)` : '#e84367'}
                          height={curveHeight}
                          width={petalWidth}
                          c1={petalWidth * 0.2}
                          c2={petalWidth * 0.1}
                          selected={selected}
                        />
                      </g>
                    )}
                    <text
                      style={{
                        display: selected ? 'block' : 'none',
                        textAnchor: 'middle',
                        transform: `rotate(${-deg})`,
                        dominantBaseline: 'central',
                        color: '#2b219f',
                        fontSize: '14px',
                      }}
                      textAnchor="end"
                      dx={Math.sin(theta) * radius * 0.5}
                      dy={Math.cos(theta) * radius * 0.5}
                    >
                      {t('number', { n: d.v })}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Flowers = ({
  module,
  progress = 0,
  currentYear,
  currentDate,
  startDate,
  endDate,
  scaleX,
  displayTitle = false
}) => {
  const [activeFlower, setActiveFlower] = useState(0);
  const { groups = [], dataset = '', from, to } = module;

  const { groupValues, minValue, maxValue, legend } = useMemo(() => {
    let { values, legend } = require(`../../data/datasets/${dataset}.json`);
    values = values.filter((d) => {
      return d.t >= from && d.t <= to;
    });
    const [minYear, maxYear] = extent(values, (d) => d.t);
    const [minValue, maxValue] = values.reduce(
      ([minAcc, maxAcc], d) => {
        const [minLocal, maxLocal] = extent(groups.map((g) => d[g]));
        return [Math.min(minLocal, minAcc), Math.max(maxLocal, maxAcc)];
      },
      [Infinity, -Infinity],
    );
    const groupValues = groups.reduce((acc, g) => {
      acc[g] = values.map((d) => ({
        t: d.t,
        v: d[g],
      }));
      return acc;
    }, {});
    return {
      minYear,
      maxYear,
      minValue,
      maxValue,
      values,
      groupValues,
      legend,
    };
  }, [dataset, groups, from, to]);

  return (
    <div className="Flowers flex flex-column" style={{ height: '90%' }}>
      {displayTitle && module.title.length
        ? <h2 className="textContainerTitle">{module.title} e</h2>
        : null
      }
      <div className="flex flex-column" style={{ flexGrow: 1 }}>
        <ul className="nav nav-tabs w-100 flex flex-row-ns items-end">
          {groups.map((d, i) => (
            <li key={i} className="nav-item flex-auto">
              <button
                className={`Flowers_legend w-100 tc pa2 nav-link ${
                  activeFlower === i && 'active'
                }`}
                key={i}
                onClick={() => setActiveFlower(i)}
              >
                {legend[d]}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-row-ns" style={{ flexGrow: 1 }}>
          {groups.map((g, i) => (
            <div key={`flower-${i}`} className="" style={{
              alignItems: 'stretch',
              width: '50%'
            }}>
              <Flower
                field={g}
                active={activeFlower === i}
                data={groupValues[g]}
                minValue={minValue}
                maxValue={maxValue}
                currentYear={currentYear}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flowers;
