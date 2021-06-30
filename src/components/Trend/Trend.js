import React, { useMemo } from 'react'
import moment from 'moment'
import { extent } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale'
import { StartDate, EndDate } from '../../constants'
import TrendAxisBottomGraphics from './TrendAxisBottomGraphics'
import TrendAxisLeftGraphics from './TrendAxisLeftGraphics'
import TrendLineGraphics from './TrendLineGraphics'
// import TrendLegend from './TrendLegend'
import TrendPointers from './TrendPointers'
import TrendHotspots from './TrendHotspots'
import '../../styles/components/trend.scss'
import DownloadDataButton from '../DownloadDataButton'
// import { useMousePosition } from '../../hooks'
import {animated, useSpring, config} from 'react-spring'

const Trend = ({
  themeDatasetId='themeDatasetId',
  paragraphId='-1,-1',
  legend={},
  data=[],
  from, to,
  // availableKeys: to computate the extent
  availableKeys=['v'],
  // visibleKeys: to draw the lines
  visibleKeys=['v'],
  // focusKeys: to draw the lines, bigger
  focusKeys=['v'],
  // colorKeys: if present, color lines in visibleKeys accordingly
  // as a dict {"v": "black"}
  colorKeys={},
  timeKey='t',
  hotspots=[],
  left=0,
  top=0,
  height = 100,
  width=100,
  marginLeft=100,
  marginRight=50,
  marginTop=50,
  displayPoints=false,
}) => {
  const [pointer, setPointer] = useSpring(() => ({ x:0, y:0, xValue:0, config: config.stiff  }))
  const svgHeight = height - 100
  const svgWidth = Math.max(0, width)
  const windowDimensions = [svgWidth, svgHeight].join(',')
  const scaleX = scaleTime()
      .domain([StartDate, EndDate])
      // - marginLeft*2 to accomodate for the left and right axis
      .range([0, svgWidth - marginLeft - marginRight])
  const [xMin, xMax] = useMemo(()  => {
    // use the keys to flatten down the values in order to computate max and min
    const flattenedData = data.reduce((acc, d) => acc.concat(availableKeys.map(k => d[k])), [])
    return extent(flattenedData)
  }, [availableKeys, data])

  const scaleY = scaleLinear()
    .domain([xMin, xMax])
    .range([svgHeight - marginTop * 2, 0])

  // values is an array of dicts [{x:, ys:{'v': ... }}]
  const values = useMemo(() => data.map(d => {
    const x = scaleX(moment(d.t, 'YYYY').startOf('year'));
    const ys = availableKeys.reduce((acc, k) => {
      acc[k] = d[k] !== null ? scaleY(d[k]) : null
      return acc
    }, {})
    return {
      ...d,
      x,
      ys
    }
  }), [data, scaleX, scaleY, availableKeys])

  const updateMousePosition = (ev) => {
    if (!ev) {
      return
    }
    setPointer({
      x: ev.clientX,
      y: ev.clientY,
    })
  }
  const numTicks = Math.round(svgWidth / 80)
  return (
    <div className="Trend" onMouseMove={updateMousePosition}>
      <animated.div style={{
        position: 'absolute',
        backgroundColor: 'var(--accent)',
        height: svgHeight-marginTop,
        width: 1,
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transform: pointer.x.interpolate((x) => `translate(${Math.max(x - left, marginLeft)}px, 0px)`)
      }} />
      <TrendHotspots
        hotspots={hotspots}
        height={svgHeight}
        values={values}
        windowDimensions={windowDimensions}
        marginLeft={marginLeft}
        marginRight={marginRight}
        focusKeys={focusKeys}
      />
      <TrendPointers
        themeDatasetId={themeDatasetId}
        from={from}
        to={to}
        height={svgHeight}
        width={svgWidth}
        windowDimensions={windowDimensions}
        visibleKeys={visibleKeys}
        focusKeys={focusKeys}
        colorKeys={colorKeys}
        marginLeft={marginLeft}
        scaleX={scaleX}
        scaleY={scaleX}
        marginTop={marginTop}
        left={left}
        top={top}
        values={values}
      >
        <DownloadDataButton label="test" values={data} legend={legend} />
      </TrendPointers>
      <svg
        className="Trend_svg"
        x="0px"
        y="0px"
        width={Math.max(1,svgWidth)}
        height={Math.max(1, svgHeight)}
        style={{
          // border: '1px solid rgba(0,0,0,0.2)',
          margin: 'auto',
        }}
      >
        <defs>
          <linearGradient
            id="trendGradient"
            x1="0%"
            y1={'0%'}
            x2="0%"
            y2={'100%'}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={'#86B9D4'} stopOpacity={1} />
            <stop offset="61%" stopColor={'#93DFCF'} stopOpacity={1} />
            <stop offset="100%" stopColor={'#A9ECD9'} stopOpacity={0} />
          </linearGradient>
        </defs>

        <TrendAxisBottomGraphics
          id={themeDatasetId}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={0}
          axisOffsetTop={0}
          scale={scaleX}
          numTicks={numTicks}
          textColor={'var(--secondary)'}
        />
        <TrendAxisLeftGraphics
          id={[themeDatasetId].concat(availableKeys).join('-')}
          windowDimensions={windowDimensions}
          marginLeft={0}
          marginTop={marginTop}
          scale={scaleY}
          numTicks={4}
          width={svgWidth - marginLeft - marginRight}
          axisOffsetLeft={svgWidth - marginRight}
        />
        {visibleKeys.map((key) => {
          const isFocusKey = focusKeys.includes(key)
          const strokeColor = isFocusKey
            ? colorKeys[key]
              ? colorKeys[key]
              : 'var(--secondary)'
            : 'var(--data-background)'
          return (
            <TrendLineGraphics
              id={paragraphId}
              key={key}
              windowDimensions={windowDimensions}
              marginLeft={marginLeft}
              marginTop={marginTop}
              values={values.filter(v => v.ys[key] !== null).map(v => ({
                x: v.x,
                y: v.ys[key]
              }))}
              scaleX={scaleX}
              scaleY={scaleY}
              height={svgHeight - marginTop*2}
              width={svgWidth}
              isVisible
              strokeWidth={1}
              fill={'transparent'}
              displayPoints={displayPoints}
              strokeColor={strokeColor}
            />
          )
        })}

        {from && to
          ? focusKeys.map((key) => {
            const strokeColor = colorKeys[key]
                ? colorKeys[key]
                : 'var(--secondary)'
            return (
            <TrendLineGraphics
              id={paragraphId}
              key={key}
              windowDimensions={windowDimensions}
              marginLeft={marginLeft}
              marginTop={marginTop}
              values={values.filter(d => d.t >= from && d.t <= to && d.ys[key] !== null).map(v => ({
                x: v.x,
                y: v.ys[key]
              }))}
              scaleX={scaleX}
              scaleY={scaleY}
              height={svgHeight - marginTop*2}
              width={svgWidth - marginLeft - marginRight}
              isVisible
              strokeWidth={3}
              displayPoints={displayPoints}
              fill={'transparent'}
              strokeColor={strokeColor}
            />
          )}): null
        }
      </svg>
    </div>
  )
}

export default Trend
