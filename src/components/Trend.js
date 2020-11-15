import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';
import { LinePath, Line } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { isMobileWithTablet } from '../constants';
import { red } from '../constants';
import { useStore } from '../store';
import TrendHotspostsGraphics from './TrendHotspostsGraphics'
import TrendAxisBottomGraphics from './TrendAxisBottomGraphics'
import TrendAxisLeftGraphics from './TrendAxisLeftGraphics'
import TrendLineGraphics from './TrendLineGraphics'
import TrendVerticalDashedLineGraphics from './TrendVerticalDashedLineGraphics'

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

  const values = useMemo(() => data.map(d => ({
    ...d,
    time: moment(d[timeKey]),
    value: d[valueKey],
  })), [data, timeKey, valueKey]);

  const actualYear = progress
    ? scaleX.invert(progressScale(progress)).getFullYear()
    : null;

  useStore.setState({ actualYear: actualYear });

  const valuesIndexByTime = data.reduce((sum, elt) => {
    sum[String(elt.t)] = elt.v;
    return sum;
  }, {});
  const actualValue = valuesIndexByTime[String(actualYear)];

  // visualize rectangle related to current narrative paragraph
  const currentParagraphs = useMemo(() => paragraphs.map((p) => ({
    fromDate: moment(`${p.from}-01-01`),
    toDate: moment(`${p.to}-01-01`),
    isVisible: actualYear >= p.from && actualYear <= p.to,
  })), [paragraphs, actualYear]);

  const currentHotspots =  useMemo(() => hotspots.map((h) => ({
    t: moment(`${h.t}-01-01`),
    v: valuesIndexByTime[h.t],
    label: h.label,
    type: h.h,
    isVisible: actualYear >= h.from && actualYear <= h.to,
  })), [hotspots, actualYear, valuesIndexByTime]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        opacity: negative ? 1 : 1,
      }}
    >
      {!negative && (
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div
            className="moduleTitle"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            &darr;&nbsp;{title}
          </div>
          <TrendLegend
            progress={progress}
            value={actualValue}
            date={actualYear}
            legend={legend}
          />
          <div className="dataSource" style={{ marginLeft: '15px' }}>
            {source || 'source to add'}
          </div>
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

        <TrendLineGraphics
          id={id}
          show={show}
          marginLeft={marginLeft}
          marginTop={marginTop}
          values={values}
          scaleX={scaleX}
          scaleY={scaleY2}
          height={svgHeight}
          width={graphWidth}
          fill={`url(#${trendName}Gradient)`}
        />

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

        <TrendVerticalDashedLineGraphics
          id={id}
          show={show}
          marginLeft={marginLeft}
          marginTop={marginTop}
          trendHeight={trendHeight}
          scale={scaleX}
          timeKey={'time'}
          values={values.filter((d, i) => i % 10 === 0)}
        />

        <g className="TrendParagraphsHighlightGraphics" transform={`translate(${marginLeft}, ${marginTop})`}>
          {currentParagraphs.map((p, i) => {
            const filteredData = values.filter((d) => {
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
                stroke={p.isVisible ? '#D1646C' : '#80b5d0'}
                strokeWidth={2}
              />
            );
          })}
        </g>
        <TrendHotspostsGraphics
          id={id}
          hotspots={currentHotspots}
          marginLeft={marginLeft}
          marginTop={marginTop}
          scaleX={scaleX}
          scaleY={scaleY2} />
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
        {!negative && <TrendAxisBottomGraphics
          id={id}
          marginLeft={marginLeft}
          marginTop={marginTop}
          axisOffsetTop={trendHeight - 10}
          scale={scaleX}
          numTicks={isMobileWithTablet ? 4 : 8}
          textColor={red}
        />
        }
        <TrendAxisLeftGraphics
          id={id}
          marginLeft={marginLeft}
          marginTop={marginTop}
          scale={scaleY2}
          numTicks={negative ? 4 : 2}
          width={graphWidth}
          axisOffsetLeft={graphWidth}
          fontSize={isMobileWithTablet ? 6 : 11}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: negative ? '37px' : 'auto',
          top: negative ? 'auto' : '54px',
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
          {actualYear && (
            <span
              style={{
                background: red,
                color: 'white',
                padding: '2px 4px',
                fontFamily: 'SneakyTimes, serif',
              }}
            >
              {actualYear}
            </span>
          )}
        </div>
      </div>
      {negative && (
        <div
          style={{ display: 'flex', alignItems: 'baseline', marginTop: '0' }}
        >
          <div
            className="moduleTitle"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            &uarr;&nbsp;{title}
          </div>
          <TrendLegend
            progress={progress}
            value={actualValue}
            date={actualYear}
            legend={legend}
          />
          <div className="dataSource" style={{ marginLeft: '15px' }}>
            {source || 'source to add'}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Trend);
