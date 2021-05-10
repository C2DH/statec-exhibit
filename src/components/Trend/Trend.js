import React, { useMemo, useEffect } from 'react'
import moment from 'moment'
import { extent } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale'
import { StartDate, EndDate } from '../../constants'
import TrendAxisBottomGraphics from './TrendAxisBottomGraphics'
import TrendAxisLeftGraphics from './TrendAxisLeftGraphics'
import TrendLineGraphics from './TrendLineGraphics'
// import TrendLegend from './TrendLegend'
import TrendPointers from './TrendPointers'

// import { useMousePosition } from '../../hooks'
import {animated, useSpring, config} from 'react-spring'

const Trend = ({
  paragraphId='-1,-1',
  legend={},
  data=[],
  from, to,
  focusKeys=[],
  visibleKeys=[],
  timeKey='t',
  keys=['v'],
  left=0,
  top=0,
  height = 100,
  width=100,
  marginLeft=50,
  marginTop=50
}) => {
  const [pointer, setPointer] = useSpring(() => ({ x:0, y:0, xValue:0, config: config.stiff  }))
  const svgHeight = Math.max(200, height/2)
  const svgWidth = Math.max(0, width)
  const windowDimensions = [svgWidth, svgHeight].join(',')
  const scaleX = scaleTime()
      .domain([StartDate, EndDate])
      // - marginLeft*2 to accomodate for the left and right axis
      .range([0, svgWidth - marginLeft * 2])
  const [xMin, xMax] = useMemo(()  => {
    // use the keys to flatten down the values in order to computate max and min
    const flattenedData = data.reduce((acc, d) => acc.concat(keys.map(k => d[k])), [])
    return extent(flattenedData)
  }, [keys, data])

  const scaleY = scaleLinear()
    .domain([xMin, xMax])
    .range([svgHeight - marginTop * 2, 0])

  // values is an array of dicts [{x:, ys:{'v': ... }}]
  const values = useMemo(() => data.map(d => {
    const x = scaleX(moment(d.t, 'YYYY').startOf('year'));
    const ys = keys.reduce((acc, k) => {
      acc[k] = scaleY(d[k])
      return acc
    }, {})
    return {
      ...d,
      x,
      ys
    }
  }), [data, scaleX, scaleY, keys])

  const updateMousePosition = (ev) => {
    if (!ev) {
      return
    }
    setPointer({
      x: ev.clientX,
      y: ev.clientY,
    })
  }

  // const AnimatedTrendLegend = animated(TrendLegend)

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
    // eslint-disable-next-line
  }, []);
  // one tick every 50 pixels
  const numTicks = Math.round(svgWidth / 80)
  return (
    <div className="Trend" >
      <animated.div style={{
        position: 'absolute',
        backgroundColor: 'var(--accent)',
        height: svgHeight-marginTop,
        width: 1,
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transform: pointer.x.interpolate((x) => `translate(${x - left}px, 0px)`)
      }} />
      <TrendPointers
        height={svgHeight}
        width={svgWidth}
        windowDimensions={windowDimensions}
        visibleKeys={visibleKeys}
        focusKeys={focusKeys}
        marginLeft={marginLeft}
        scaleX={scaleX}
        scaleY={scaleX}
        marginTop={marginTop}
        left={left}
        top={top}
        values={values}
      />
      <svg
        className="Trend_svg"
        x="0px"
        y="0px"
        width={svgWidth}
        height={svgHeight}
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
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={0}
          axisOffsetTop={20}
          scale={scaleX}
          numTicks={numTicks}
          textColor={'var(--secondary)'}
        />
        <TrendAxisLeftGraphics
          windowDimensions={windowDimensions}
          marginLeft={0}
          marginTop={marginTop}
          scale={scaleY}
          numTicks={4}
          width={svgWidth - marginLeft * 2}
          axisOffsetLeft={svgWidth - marginLeft}
        />
        {visibleKeys.map(({ key, isVisible }) => {
          const isOnFocus = focusKeys.includes(key)
          return (
            <TrendLineGraphics
              key={key}
              windowDimensions={windowDimensions}
              marginLeft={marginLeft}
              marginTop={marginTop}
              values={values.map(v => ({
                x: v.x,
                y: v.ys[key]
              }))}
              scaleX={scaleX}
              scaleY={scaleY}
              height={svgHeight - marginTop*2}
              width={svgWidth}
              isVisible={isOnFocus}
              strokeWidth={1}
              fill={'transparent'}
              strokeColor={isOnFocus ? 'var(--secondary)': `var(--datakey-${key}`}
            />
          )
        })}

        {from && to
          ? visibleKeys.filter(d => focusKeys.includes(d.key)).map(({key, isVisible }) => {
            const isOnFocus = focusKeys.includes(key)
            return (
            <TrendLineGraphics
              id={paragraphId}
              key={key}
              windowDimensions={windowDimensions}
              marginLeft={marginLeft}
              marginTop={marginTop}
              values={values.filter(d => d.t >= from && d.t <= to).map(v => ({
                x: v.x,
                y: v.ys[key]
              }))}
              scaleX={scaleX}
              scaleY={scaleY}
              height={svgHeight - marginTop*2}
              width={svgWidth}
              isVisible={isVisible || isOnFocus}
              strokeWidth={4}
              fill={'transparent'}
              strokeColor={isOnFocus ? 'var(--secondary)': `var(--datakey-${key}`}
            />
          )}): null
        }
      </svg>
    </div>
  )
}

export default Trend
