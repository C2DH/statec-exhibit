import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';
import { AreaClosed, LinePath, Line } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Group } from '@vx/group';
import { isMobileWithTablet } from '../constants';
import { red } from '../constants';
import { useStore } from '../store';
const Trend = ({
  data,
  toggleNote,
  activateNote,
  deactivateNote,
  id,
  activeIndex,
  valueKey,
  timeKey,
  highlightKey,
  height,
  colorA,
  colorB,
  trendName,
  progress,
  negative,
  title,
  source,
}) => {
  const [show, setShow] = useState(false);
  const [pathLength, setPathLength] = useState(1000);
  useEffect(() => {
    let peak = data[0].hasPeak || false;
    let peakData = data.find((d) => d.peak);
    const note = peakData ? peakData.note : null;
    if (peak) {
      //activateNote(note);
    } else {
      //deactivateNote();
    }
  }, [data]);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, [id]);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, [activeIndex]);

  const svgWidth = isMobileWithTablet
    ? window.innerWidth * 0.9
    : window.innerWidth * 0.9;
  const marginLeft = window.innerWidth * 0.05;
  const graphWidth = svgWidth - marginLeft;
  const svgHeight = height;
  const trendHeight = svgHeight;
  const startDate = moment('1840-01-01');
  const endDate = moment('2014-01-01');

  const x = (d) => {
    return moment(d[timeKey]);
  };
  const y = (d) => {
    return d[valueKey];
  };

  const scaleX = scaleTime()
    .domain([startDate, endDate])
    .range([0, graphWidth]);

  const [min, max] = extent(data, (d) => d[valueKey]);

  const scaleY = scaleLinear().domain([min, max]).range([0, trendHeight]);

  const scaleY2 = scaleLinear().domain([max, min]).range([0, trendHeight]);

  const timelineScale = scaleLinear()
    .range([0, graphWidth])
    .domain([0.2, 0.8])
    .clamp(true);

  const parsedData = data.filter((d, i) => {
    if (i % 10 === 0) {
      return d;
    }
  });

  const actualYear = progress
    ? scaleX.invert(timelineScale(progress)).getFullYear()
    : null;

  useStore.setState({ actualYear: actualYear });

  const actualValue = data.find((d) => {
    return d.t === String(actualYear);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {!negative && (
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div
            className="moduleTitle"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {title}
            <div className="dataSource">{source || 'source to add'}</div>
          </div>
          <div className="moduleProgress">
            {progress && <span className="underline mr2">{actualYear}:</span>}
            {progress && actualValue ? actualValue.v : null}
          </div>
        </div>
      )}
      <svg
        className="viz"
        x="0px"
        y="0px"
        width={svgWidth}
        height={negative ? svgHeight : svgHeight + 30}
        style={{
          border: '0px solid rgba(0,0,0,0.2)',
          margin: 'auto',
        }}
      >
        <defs>
          <linearGradient
            id={`${trendName}Gradient`}
            x1="0%"
            y1={negative ? '100%' : '0%'}
            x2="0%"
            y2={negative ? '0%' : '100%'}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={'#86B9D4'} stopOpacity={1} />
            <stop offset="61%" stopColor={'#93DFCF'} stopOpacity={1} />
            <stop offset="100%" stopColor={'#A9ECD9'} stopOpacity={1} />
          </linearGradient>
        </defs>
        <g transform={`translate(${marginLeft}, 0)`}>
          <Animate
            show={show}
            start={() => ({
              j: 0,
              timing: { duration: 300, ease: easeQuadOut },
            })}
            enter={() => ({
              j: [1],
              timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
            })}
            update={() => ({
              j: [1],
              timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
            })}
            leave={() => ({
              j: [0],
              timing: { duration: 0 },
            })}
          >
            {(state) => {
              const { j } = state;
              return (
                <AreaClosed
                  data={data}
                  x={(d) => scaleX(x(d))}
                  y={(d) => scaleY2(y(d))}
                  y0={negative ? 0 : svgHeight}
                  yScale={scaleY2}
                  fill={`url(#${trendName}Gradient)`}
                  fillOpacity={j}
                  strokeWidth={0}
                  curve={curveMonotoneX}
                  // strokeDasharray={5000}
                  // strokeDashoffset={j}
                />
              );
            }}
          </Animate>
        </g>
        <g transform={`translate(${marginLeft}, 0)`}>
          <Animate
            show={show}
            start={() => ({
              j: pathLength,
              o: 0,
            })}
            enter={() => ({
              j: [0],
              o: [1],
              timing: { duration: 1400, delay: 0, ease: easeQuadOut },
            })}
            update={() => ({
              j: [0],
              o: [1],
              timing: { duration: 1400, ease: easeQuadOut },
            })}
            leave={() => ({
              j: [pathLength],
              o: [0],
              timing: { duration: 0 },
            })}
          >
            {(state) => {
              const { j, o } = state;
              return (
                <LinePath
                  data={data}
                  innerRef={(node) => {
                    if (node) {
                      setPathLength(node.getTotalLength());
                    }
                  }}
                  x={(d) => scaleX(x(d))}
                  y={(d) => scaleY2(y(d))}
                  curve={curveMonotoneX}
                  strokeDasharray={pathLength}
                  strokeDashoffset={j}
                  opacity={o}
                />
              );
            }}
          </Animate>
        </g>
        {/* Highlight circles */}
        {negative && (
          <g transform={`translate(${marginLeft}, 0)`}>
            {data.map((d, i) => {
              const date = moment(d[timeKey]);
              const value = d[valueKey];

              if (d.h) {
                return (
                  <g key={i} onClick={() => toggleNote(d.note)}>
                    <circle
                      id={`circle-${i}`}
                      cx={scaleX(date)}
                      cy={trendHeight - scaleY(value)}
                      fill={red}
                      r={8}
                    />
                    {/* <text
                    dx={
                      isMobileWithTablet ? scaleX(date) + 20 : scaleX(date) - 20
                    }
                    dy={trendHeight - scaleY(value) + 2}
                    textAnchor={isMobileWithTablet ? 'start' : 'end'}
                  >
                    {date.format('MMMM YYYY')}
                  </text> */}
                  </g>
                );
              }
            })}
          </g>
        )}
        {min < 9 && (
          <g transform={`translate(${marginLeft}, 0)`}>
            <Line
              from={{ x: timelineScale(0), y: scaleY(0) }}
              to={{ x: timelineScale(100), y: scaleY(0) }}
              stroke={'rgba(0,0,0,.5)'}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
              strokeDasharray={[1, 6]}
            />
            <Line
              from={{ x: timelineScale(0), y: scaleY(-1000) }}
              to={{ x: timelineScale(100), y: scaleY(-1000) }}
              stroke={'rgba(0,0,0,.5)'}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
              strokeDasharray={[1, 6]}
            />
            <Line
              from={{ x: timelineScale(0), y: scaleY(1000) }}
              to={{ x: timelineScale(100), y: scaleY(1000) }}
              stroke={'rgba(0,0,0,.5)'}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
              strokeDasharray={[1, 6]}
            />
            <Line
              from={{ x: timelineScale(0), y: scaleY(2000) }}
              to={{ x: timelineScale(100), y: scaleY(2000) }}
              stroke={'rgba(0,0,0,.5)'}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
              strokeDasharray={[1, 6]}
            />
            <Line
              from={{ x: timelineScale(0), y: scaleY(3000) }}
              to={{ x: timelineScale(100), y: scaleY(3000) }}
              stroke={'rgba(0,0,0,.5)'}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
              strokeDasharray={[1, 6]}
            />
          </g>
        )}
        <g transform={`translate(${marginLeft}, 0)`}>
          {parsedData.map((d, i) => {
            const date = moment(d[timeKey]);
            const value = d[valueKey];

            const startAnimation = trendHeight;

            return (
              <g key={i}>
                <Animate
                  show={show}
                  start={() => ({
                    y2: startAnimation,
                  })}
                  enter={() => ({
                    y2: [0],
                    timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
                  })}
                  update={() => ({
                    y2: [0],
                    timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
                  })}
                  leave={() => ({
                    y2: [0],
                    timing: { duration: 0 },
                  })}
                >
                  {(state) => {
                    const { y2 } = state;
                    return (
                      <line
                        id={`line-${i}`}
                        x1={scaleX(date)}
                        y1={trendHeight}
                        x2={scaleX(date)}
                        y2={y2}
                        stroke={'#E99AA9'}
                        strokeWidth={0.5}
                        strokeDasharray="4 4"
                      />
                    );
                  }}
                </Animate>
              </g>
            );
          })}
        </g>
        {/* PROGRESS BAR*/}
        {progress && (
          <g transform={`translate(${marginLeft}, 0)`}>
            <Line
              from={{ x: timelineScale(progress), y: 0 }}
              to={{ x: timelineScale(progress), y: svgHeight }}
              stroke={'#E99AA9'}
              strokeWidth={4}
              style={{ pointerEvents: 'none' }}
            />
          </g>
        )}
        {/* AXES */}
        {!negative && (
          <g transform={`translate(${marginLeft}, 4)`}>
            <AxisBottom
              top={trendHeight - 10}
              left={0}
              scale={scaleX}
              numTicks={isMobileWithTablet ? 4 : 8}
              label="Time"
            >
              {(axis) => {
                const tickLabelSize = 14;
                const tickRotate = 0;
                const axisCenter =
                  (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
                return (
                  <g className="my-custom-bottom-axis">
                    {axis.ticks.map((tick, i) => {
                      const tickX = tick.to.x;
                      const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                      return (
                        <Group
                          key={`vx-tick-${tick.value}-${i}`}
                          className={'vx-axis-tick'}
                        >
                          <text
                            transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                            fontSize={tickLabelSize}
                            textAnchor="middle"
                            fill={red}
                          >
                            {tick.formattedValue}
                          </text>
                        </Group>
                      );
                    })}
                  </g>
                );
              }}
            </AxisBottom>
          </g>
        )}
        <g transform={`translate(${marginLeft}, 4)`}>
          <AxisLeft
            top={0}
            left={0}
            scale={scaleY2}
            numTicks={negative ? 4 : 2}
            hideAxisLine={true}
            hideTicks={true}
            label=""
            stroke="#1b1a1e"
            tickLabelProps={(value, index) => ({
              fill: 'rgba(0,0,0,.5)',
              textAnchor: 'start',
              fontSize: 11,
              fontFamily: 'Porpora',
              dx: '-4vw',
              dy: '.5vh',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
        </g>
      </svg>
      {negative && (
        <div
          style={{ display: 'flex', alignItems: 'baseline', marginTop: '15px' }}
        >
          <div
            className="moduleTitle"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {title}
            <div className="dataSource">{source || 'source to add'}</div>
          </div>
          <div className="moduleProgress">
            {progress && <span className="underline mr2">{actualYear}:</span>}
            {progress && actualValue ? actualValue.v : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trend;
