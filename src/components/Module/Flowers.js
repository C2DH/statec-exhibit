import React, { useMemo, useState } from 'react'
import { extent } from 'd3-array'
import { scalePow } from 'd3-scale'
// import moment from 'moment'
import { useBoundingClientRect } from '../../hooks'
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
  fill="#EDEDED",
  stroke="black",
  nMinPetals=8,
}) => {
  const [colorA, colorB, colorC] = colors
  const [{ width, height }, ref] = useBoundingClientRect()
  const dimension = Math.min(width, height);
  const radius = isMobileWithTablet ? dimension / 3.5 : dimension / 4;
  const circumference = 2 * Math.PI * radius;

  const nOfPetals = data.length;
  const petalMaxWidth =
    nOfPetals > nMinPetals
      ? parseInt(circumference / (nOfPetals - 1))
      : parseInt(circumference / nMinPetals)
  const petalWidth =
    nOfPetals > nMinPetals
      ? parseInt(circumference / (nOfPetals - 1))
      : parseInt(circumference / nMinPetals)
  const angleD = (Math.PI * 2) / nOfPetals;
  const { minYear, maxYear, scaleYUnclamped } = useMemo(() => {
    const [minYear, maxYear] = extent(data, d=> d.t)
    const scaleYUnclamped = scalePow()
      .exponent(2)
      .domain([Math.max(0, minValue), Math.max(Math.abs(minValue), maxValue)])
      .clamp(false)
      .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
    return { minYear, maxYear, scaleYUnclamped }
  }, [data, minValue, maxValue, petalMaxWidth ])
  // const scaleYUnclamped = scalePow()
  //   .exponent(2)
  //   .domain([minValue, maxValue])
  //   .clamp(false)
  //   .range([2, petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
  //
  const maxAngle = angleD + Math.PI;

  return (
    <div className="Flower h-100 w-100 flex flex-column" style={{
      flexGrow:1
    }}>
      <div className="tc">{minYear} &rarr; {maxYear}</div>
      <div style={{ flexGrow: 1 }} ref={ref}>
        <div style={{width, height, overflow: 'hidden'}}>
          <svg width={width} height={height} >
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
              <text y={20}>{minYear}</text>
            </g>



            <g transform={`translate(${width / 2},${height - (radius * 2)})`}>
              <g transform={`translate(${Math.sin(maxAngle) * radius}, ${
                Math.cos(maxAngle) * radius
              }) `}>
                <text textAnchor='end'>{maxYear}</text>

              </g>
              <circle cx={0} cy={0} r={radius} stroke={stroke} fill={fill} />
              {data.map((d, i) => {
                const theta = (data.length - i) * angleD + Math.PI;
                const deg = theta * (180 / Math.PI);
                const selected = currentYear === d.t
                const curveHeight = scaleYUnclamped(d.v);

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
                      textAnchor='end'
                      dx={Math.sin(theta) * radius * .5}
                      dy={Math.cos(theta) * radius * .5}
                    >
                      {d.v}
                    </text>
                    <text
                      style={{
                        display: selected ? 'block' : 'none',
                        textAnchor: 'middle',
                        transform: `rotate(${-deg})`,
                        dominantBaseline: 'central',
                        color: '#2b219f',
                        fontSize: '12px'
                      }}
                        textAnchor='end'
                      dx={Math.sin(theta) * radius * .5}
                      dy={20 + (Math.cos(theta) * radius * .5)}
                    >
                      {d.t}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}


const Flowers = ({
  module, progress=0,
  currentYear,
  currentDate, startDate, endDate, scaleX
}) => {
  const [activeFlower, setActiveFlower] = useState(0)
  const { groups=[], dataset='' } = module

  const { groupValues, minValue, maxValue, legend } = useMemo(() => {
    const { values, legend } = require(`../../data/datasets/${dataset}.json`);
    const [minYear, maxYear] = extent(values, d => d.t)
    const [minValue, maxValue] = values.reduce(([minAcc, maxAcc], d) => {
      const [minLocal, maxLocal] = extent(groups.map(g => d[g]))
      return [Math.min(minLocal, minAcc), Math.max(maxLocal, maxAcc)]
    }, [ Infinity, -Infinity])
    const groupValues = groups.reduce((acc, g) => {
      acc[g] = values.map(d => ({
        t: d.t,
        v: d[g]
      }))
      return acc
    }, {})
    return {
      minYear, maxYear,
      minValue, maxValue,
      values,
      groupValues,
      legend,
    }
  }, [dataset, groups])

  return (
    <div className="Flowers flex flex-column" style={{ height: '90%'}}>
      <h2 className="textContainerTitle">{module.title}</h2>
      <div className="flex flex-column" style={{ flexGrow: 1 }}>
        <ul className="nav nav-tabs w-100 flex flex-row-ns items-end">
        {groups.map((d, i) => (
          <li key={i} className="nav-item flex-auto">
            <button className={`w-100 tc pa2 serif nav-link ${activeFlower===i && 'active'}`} key={i} onClick={() => setActiveFlower(i)}>
              {legend[d]}
            </button>
          </li>
        ))}
        </ul>
        <div className="flex flex-row-ns" style={{ flexGrow: 1 }}>
          {groups.map((g, i) => (
            <div key={`flower-${i}`} className="h-100" style={{ width: '50%' }}>
            <Flower
              field={g}
              active={activeFlower===i}
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
  )
}

export default Flowers
