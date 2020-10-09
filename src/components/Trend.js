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

const TrendLegend = ({ progress, value, date, legend }) => {
  return (
    <div className="moduleProgress">
      {progress && value !== undefined && (
        <div>
          <span className="underline mr2">{value}</span>
          <span>
            {legend?.v} in {date}
          </span>
        </div>
      )}
    </div>
  );
};

const Trend = ({
  id,
  data,
  toggleNote,
  activeIndex,
  valueKey,
  timeKey,
  height,
  trendName,
  progress,
  negative,
  title,
  source,
  legend,
  from,
  to,
  paragraphs = [],
  hotspots = [],
} = {}) => {
  const [show, setShow] = useState(false);
  const [pathLength, setPathLength] = useState(1000);
  // useEffect(() => {
  //   let peak = data[0].hasPeak || false;
  //   let peakData = data.find((d) => d.peak);
  //   const note = peakData ? peakData.note : null;
  //   if (peak) {
  //     //activateNote(note);
  //   } else {
  //     //deactivateNote();
  //   }
  // }, [data]);

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
  const marginTop = 10;
  const marginLeft = window.innerWidth * 0.05;
  const graphWidth = svgWidth - marginLeft;
  const svgHeight = height;
  const trendHeight = svgHeight - marginTop;
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

  // const timelineScale = scaleLinear()
  //   .range([0, graphWidth])
  //   .domain([0.2, 0.8])
  //   .clamp(true);

  const fromDate = moment(`${from}-01-01`);
  const toDate = moment(`${to}-01-01`);
  const progressScale = scaleLinear()
    .range([from ? scaleX(fromDate) : 0, to ? scaleX(toDate) : graphWidth])
    .domain([0.2, 0.8])
    .clamp(true);

  const parsedData = data.filter((d, i) => {
    if (i % 10 === 0) {
      return d;
    }
  });

  const actualYear = progress
    ? scaleX.invert(progressScale(progress)).getFullYear()
    : null;

  useStore.setState({ actualYear: actualYear });

  const valuesIndexByTime = data.reduce((sum, elt) => {
    sum[String(elt.t)] = elt.v;
    return sum;
  }, {});
  const actualValue = valuesIndexByTime[String(actualYear)];
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);

  // visualize rectangle related to current narrative paragraph
  const currentParagraphs = paragraphs.map((p) => ({
    fromDate: moment(`${p.from}-01-01`),
    toDate: moment(`${p.to}-01-01`),
    isVisible: actualYear >= p.from && actualYear <= p.to,
  }));

  const currentHotspots = hotspots.map((h) => ({
    t: moment(`${h.t}-01-01`),
    v: valuesIndexByTime[h.t],
    label: h.label,
    type: h.h,
    isVisible: actualYear >= h.from && actualYear <= h.to,
  }));

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        opacity: negative ? opacityScale(progress) : 1,
      }}
    >
      {!negative && (
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div
            className="moduleTitle"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {title}
            <div className="dataSource">{source || 'source to add'}</div>
          </div>
          <TrendLegend
            progress={progress}
            value={actualValue}
            date={actualYear}
            legend={legend}
          />
        </div>
      )}
      <svg
        className="viz"
        x="0px"
        y="0px"
        width={svgWidth}
        height={negative ? svgHeight + 5 : svgHeight + 30}
        style={{
          border: '0px solid rgba(0,0,0,0.2)',
          margin: 'auto',
        }}
      >
        <defs>
          <linearGradient
            id={`${trendName}Gradient`}
            x1="0%"
            y1={'0%'}
            x2="0%"
            y2={'100%'}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={'#86B9D4'} stopOpacity={1} />
            <stop offset="61%" stopColor={'#93DFCF'} stopOpacity={1} />
            <stop offset="100%" stopColor={'#A9ECD9'} stopOpacity={1} />
          </linearGradient>
        </defs>
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
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
                  y0={svgHeight}
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
          <LinePath
            className="values"
            data={data}
            x={(d) => scaleX(x(d))}
            y={(d) => scaleY2(y(d))}
            strokeWidth={1}
            stroke="black"
            strokeOpacity={0.2}
            curve={curveMonotoneX}
          />
          {/*
            <line
              x1={scaleX(fromDate)}
              x2={scaleX(toDate)}
              y1={negative ? trendHeight : 1} y2={negative ? trendHeight : 1}
              stroke={red} strokeWidth={1}></line>
          */}
          <line
            className="toZero"
            x1={0}
            x2={graphWidth}
            y1={scaleY2(0)}
            y2={scaleY2(0)}
            stroke={'black'}
            strokeWidth={1}
          ></line>
          {currentHotspots.map((d, i) => {
            return (
              <circle
                key={i}
                cx={scaleX(d.t)}
                cy={scaleY2(d.v)}
                fill={red}
                r={4}
              />
            );
          })}
        </g>
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
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
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            {data.map((d, i) => {
              const date = moment(d[timeKey]);
              const value = d[valueKey];

              if (d.h) {
                return (
                  <g key={i}>
                    <circle
                      id={`circle-${i}`}
                      cx={scaleX(date)}
                      cy={trendHeight - scaleY(value)}
                      fill={red}
                      r={5}
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
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
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

          {currentParagraphs.map((p, i) => {
            const filteredData = data.filter((d) => {
              return (
                Number(d.t) >= Number(p.fromDate.year()) &&
                Number(d.t) <= Number(p.toDate.year())
              );
            });
            return (
              <LinePath
                key={`linepath-${i}`}
                data={filteredData}
                innerRef={(node) => {
                  if (node) {
                    setPathLength(node.getTotalLength());
                  }
                }}
                x={(d) => scaleX(x(d))}
                y={(d) => scaleY2(y(d))}
                curve={curveMonotoneX}
                strokeDasharray={pathLength}
                stroke={p.isVisible ? '#D1646C' : '#ccc'}
                strokeWidth={3}
              />
            );
          })}
        </g>
        {/* PROGRESS BAR*/}
        {progress && (
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            <Line
              from={{ x: progressScale(progress), y: negative ? 0 : 30 }}
              to={{
                x: progressScale(progress),
                y: negative ? svgHeight - 30 : svgHeight,
              }}
              stroke={'#D1646C'}
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
            />
          </g>
        )}
        {/* AXES */}
        {!negative && (
          <g transform={`translate(${marginLeft}, ${marginTop + 10})`}>
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
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          <AxisLeft
            top={0}
            left={graphWidth}
            scale={scaleY2}
            numTicks={negative ? 4 : 2}
            hideAxisLine={true}
            hideTicks={false}
            label=""
            stroke="#1b1a1e"
            tickLabelProps={(value, index) => ({
              fill: 'rgba(0,0,0,.5)',
              textAnchor: 'start',
              fontSize: isMobileWithTablet ? 6 : 11,
              fontFamily: 'Porpora',
              dx: '-4vw',
              dy: '.5vh',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
            tickLength={graphWidth}
            tickStroke={'rgba(0,0,0,.5)'}
            tickClassName={'tickTrend'}
          />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: negative ? '37px' : 'auto',
          top: negative ? 'auto' : '44px',
        }}
      >
        <div
          style={{
            transform: `translateX(${progressScale(progress) + marginLeft}px)`,
            width: '100px',
            marginLeft: '-50px',
            textAlign: 'center',
          }}
        >
          <span style={{ background: red, color: 'white', padding: '2px 4px' }}>
            {actualYear}
          </span>
        </div>
      </div>
      {negative && (
        <div
          style={{ display: 'flex', alignItems: 'baseline', marginTop: '0' }}
        >
          <div
            className="moduleTitle"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {title}
            <div className="dataSource">{source || 'source to add'}</div>
          </div>
          <TrendLegend
            progress={progress}
            value={actualValue}
            date={actualYear}
            legend={legend}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Trend);
