import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next'
import moment from 'moment';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { isMobileWithTablet } from '../../constants';
import { red, StartDate, EndDate } from '../../constants';
import { useStore } from '../../store';
import TrendHotspostsGraphics from './TrendHotspostsGraphics';
import TrendAxisBottomGraphics from './TrendAxisBottomGraphics';
import TrendAxisLeftGraphics from './TrendAxisLeftGraphics';
import TrendLineGraphics from './TrendLineGraphics';
import TrendVerticalDashedLineGraphics from './TrendVerticalDashedLineGraphics';
import TrendAdditionalLineGraphics from './TrendAdditionalLineGraphics';
import TrendParagraphsGraphics from './TrendParagraphsGraphics';
import TrendProgressBarGraphics from './TrendProgressBarGraphics';
import TrendLegend from './TrendLegend';
import DownloadDataButton from '../DownloadDataButton';


const TrendHeader = ({ title, direction, progress, date, value, values, legend, additionalTrendsLegend, additionalTrendsColors, additionalTrends }) => {
  const { t } = useTranslation()
  return (
    <div className="TrendHeader flex mv2" style={{ alignItems: 'baseline' }}>
      {direction
        ? <div>‒</div>
        : <div>‒</div>
      }
      <div style={{ flexGrow: 1, minHeight: 30 }} className="moduleTitle">
        <TrendLegend
          title={title}
          progress={progress}
          value={value}
          date={date}
          legend={legend}
          t={t}
          additionalTrendsLegend={additionalTrendsLegend}
          additionalTrendsColors={additionalTrendsColors}
          additionalTrends={additionalTrends}
        />
      </div>
      <DownloadDataButton values={values} label={title} legend={legend} style={{ flexShrink: 1 }} />
    </div>
  )
}

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
  additionalTrendsColors = [],
  additionalTrendsLegend,
  marginTop = 10
} = {}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 1500);
  }, [id, activeIndex]);

  const svgWidth = isMobileWithTablet
    ? window.innerWidth * 0.9
    : window.innerWidth * 0.9;
  const marginLeft = window.innerWidth * 0.05;
  const windowDimensions = [window.innerWidth, window.innerHeight].join('-');
  const graphWidth = svgWidth - marginLeft;
  const svgHeight = height;
  const trendHeight = svgHeight - marginTop;

  const scaleX = scaleTime()
    .domain([StartDate, EndDate])
    .range([0, graphWidth]);

  const [min, max] =
    isNaN(valueFrom) || isNaN(valueTo)
      ? extent(data, (d) => d[valueKey])
      : [valueFrom, valueTo];

  const scaleY2 = scaleLinear().domain([max, min]).range([0, trendHeight]);
  // const timelineScale = scaleLinear()
  //   .range([0, graphWidth])
  //   .domain([0.2, 0.8])
  //   .clamp(true);

  const fromDate = moment(from, 'YYYY').startOf('year');
  const toDate = moment(to,  'YYYY').endOf('year');
  const progressScale = scaleLinear()
    .range([from ? scaleX(fromDate) : 0, to ? scaleX(toDate) : graphWidth])
    .domain([0.2, 0.8])
    .clamp(true);

  const values = useMemo(
    () =>
      data.map((d) => {
        const time = moment(d[timeKey]);
        return {
          ...d,
          time,
          timeFullYear: time.year(),
          value: d[valueKey],
        };
      }),
    [data, timeKey, valueKey],
  );

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
  const currentParagraphs = useMemo(
    () =>
      paragraphs.map((p, i) => ({
        idx: i,
        values: values.filter(
          (value) => value[timeKey] >= p.from && value[timeKey] <= p.to,
        ),
        fromDate: moment(`${p.from}-01-01`),
        toDate: moment(`${p.to}-01-01`),
        actualYear,
        isVisible: actualYear >= p.from && actualYear <= p.to,
      })),
    [paragraphs, timeKey, actualYear, values],
  );

  const currentParagraph = useMemo(
    () => currentParagraphs.find((p) => p.isVisible),
    [currentParagraphs],
  );
  const currentHotspots = useMemo(
    () =>
      hotspots.map((h) => ({
        ...valuesIndexByTime[h.t],
        label: h.label,
        type: h.h,
      })),
    [hotspots, valuesIndexByTime],
  );

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
        <TrendHeader
          direction={negative}
          title={title}
          progress={progress}
          value={actualValue}
          date={actualYear}
          legend={legend}
          values={values}
          additionalTrendsLegend={additionalTrendsLegend}
          additionalTrendsColors={additionalTrendsColors}
          additionalTrends={additionalTrends}
        />
      )}
      <svg
        className="viz"
        x="0px"
        y="0px"
        width={svgWidth}
        height={svgHeight}
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
        {additionalTrends.length && (
          <TrendAdditionalLineGraphics
            id={id}
            additionalTrends={additionalTrends}
            show={show}
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
        )}
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
          fill="transparent"
          stroke={red}
          scaleX={scaleX}
          scaleY={scaleY2}
        />
        {/* PROGRESS BAR*/}
        {progress && (
          <TrendProgressBarGraphics
            marginLeft={marginLeft} scale={progressScale}
            marginTop={marginTop}
            height={svgHeight}
            progress={progress}
          />
        )}
        {/* h AXES */}
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
      {!negative && (
        <svg className="viz" x="0px" y="0px"
          width={svgWidth}
          height={30}
          style={{
            border: '0px solid rgba(0,0,0,0.2)',
            margin: '2px auto',
          }}
        >
          <TrendAxisBottomGraphics
            id={id}
            windowDimensions={windowDimensions}
            marginLeft={marginLeft}
            marginTop={0}
            axisOffsetTop={0}
            scale={scaleX}
            numTicks={isMobileWithTablet ? 4 : 8}
            textColor={red}
          />
        </svg>
      )}

      {!negative && (<div
        style={{
          position: 'absolute',
          bottom: negative ? 37 : 'auto',
          top: negative ? 'auto' : 37,
          left: '5%'
        }}
      >
        <div
          style={{
            transform: `translateX(${progressScale(progress) + marginLeft}px)`,
            width: '100px',
            marginLeft: '-50px',
            textAlign: 'center'
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
      </div>)}
      {negative && (
        <TrendHeader
          direction={negative}
          title={title}
          progress={progress}
          value={actualValue}
          date={actualYear}
          legend={legend}
          values={values}
          additionalTrendsLegend={additionalTrendsLegend}
          additionalTrendsColors={additionalTrendsColors}
          additionalTrends={additionalTrends}
        />
      )}
    </div>
  );
};

export default Trend;
