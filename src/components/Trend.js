import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
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
import TrendAdditionalLineGraphics from './TrendAdditionalLineGraphics'
import TrendParagraphsGraphics from './TrendParagraphsGraphics'
import TrendLegend from './TrendLegend'


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
  valueFrom,
  valueTo,
  paragraphs = [],
  hotspots = [],
  additionalTrends = [],
  additionalTrendsColors = []
} = {}) => {
  const [show, setShow] = useState(true);
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
    }, 1500);
  }, [id, activeIndex]);

  console.info('rerendering')

  const svgWidth = isMobileWithTablet
    ? window.innerWidth * 0.9
    : window.innerWidth * 0.9;
  const marginTop = 10;
  const marginLeft = window.innerWidth * 0.05;
  const windowDimensions = [ window.innerWidth, window.innerHeight ].join('-')
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

  const [min, max] = isNaN(valueFrom) || isNaN(valueTo)
    ? extent(data, (d) => d[valueKey])
    : [valueFrom, valueTo]

  const scaleY = scaleLinear().domain([min, max]).range([0, trendHeight]);
  const scaleY2 = scaleLinear().domain([max, min]).range([0, trendHeight]);
  // console.info('TrendAdditionalLineGraphics', additionalTrends)
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

  const values = useMemo(() => data.map((d) => {
    const time = moment(d[timeKey])
    return {
      ...d,
      time,
      timeFullYear: time.year(),
      value: d[valueKey],
    }
  }), [data, timeKey, valueKey]);

  const actualYear = progress
    ? scaleX.invert(progressScale(progress)).getFullYear()
    : null;

  useStore.setState({ actualYear: actualYear });

  const valuesIndexByTime = values.reduce((sum, elt) => {
    sum[String(elt.t)] = elt;
    return sum;
  }, {});
  const actualValue = valuesIndexByTime[String(actualYear)];

  // visualize rectangle related to current narrative paragraph
  const currentParagraphs = useMemo(() => paragraphs.map((p, i) => ({
    idx: i,
    values: values.filter((value) =>
      value[timeKey] >= p.from && value[timeKey] <= p.to
    ),
    fromDate: moment(`${p.from}-01-01`),
    toDate: moment(`${p.to}-01-01`),
    actualYear,
    isVisible: actualYear >= p.from && actualYear <= p.to,
  })), [paragraphs, timeKey, actualYear, values]);

  const currentParagraph = useMemo(() => currentParagraphs.find((p) => p.isVisible), [currentParagraphs])
  const currentHotspots = useMemo(() => hotspots.map((h) => ({
    ...valuesIndexByTime[h.t],
    label: h.label,
    type: h.h,
  })), [hotspots, valuesIndexByTime]);

  const currentHotspot = actualValue
    ? currentHotspots.find(d => actualValue[timeKey] >= d[timeKey] && actualValue[timeKey] <= d[timeKey])
    : null
  console.info('currentHotspot', currentHotspot)
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
            additionalTrendsColors={additionalTrendsColors}
            additionalTrends={additionalTrends}
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

        <TrendLineGraphics
          id={id}
          show={show}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={marginTop}
          values={values}
          scaleX={scaleX}
          scaleY={scaleY2}
          height={svgHeight}
          width={graphWidth}
          fill={`url(#${trendName}Gradient)`}
        />
{/*
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
      */}

        {additionalTrends.length &&
          <TrendAdditionalLineGraphics
            id={id} additionalTrends={additionalTrends} show={show}
            additionalTrendsColors={additionalTrendsColors}
            currentParagraph={currentParagraph}
            values={values}
            windowDimensions={windowDimensions}
            marginLeft={marginLeft}
            marginTop={marginTop}
            scaleX={scaleX}
            scaleY={scaleY2}
            cx={actualYear}
          />
        }
        <TrendVerticalDashedLineGraphics
          id={id}
          show={show}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={marginTop}
          trendHeight={trendHeight}
          scale={scaleX}
          timeKey={'time'}
          values={values.filter((d, i) => i % 10 === 0)}
        />

        <TrendParagraphsGraphics
          id={id}
          paragraphs={currentParagraphs}
          currentParagraph={currentParagraph}
          marginLeft={marginLeft}
          marginTop={marginTop}
          windowDimensions={windowDimensions}
          scaleX={scaleX}
          scaleY={scaleY2}
        />
        <TrendHotspostsGraphics
          id={id}
          hotspots={currentHotspots}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={marginTop}
          fill='transparent'
          stroke={red}
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
          windowDimensions={windowDimensions}
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
          windowDimensions={windowDimensions}
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
            additionalTrendsColors={additionalTrendsColors}
            additionalTrends={additionalTrends}
          />
        </div>
      )}
    </div>
  );
};

export default Trend;
