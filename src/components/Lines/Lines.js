import React, { useMemo } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { scaleLinear } from 'd3-scale'
import AnimatedDataPointers from '../AnimatedDataPointers'
import TrendLineGraphics from '../Trend/TrendLineGraphics'
import TrendAxisBottomGraphics from '../Trend/TrendAxisBottomGraphics'
import TrendAxisLeftGraphics from '../Trend/TrendAxisLeftGraphics'
import { StartYear, EndYear } from '../../constants'
import { getClosestDatumIdxFromX } from '../../logic/dataset'


const Lines = ({
  groupValues=[],
  minValue, maxValue,
  datasetId,
  hidePercentage,
  width, height,
  displayPoints=true,
  marginTop=50,
  marginBottom=20,
  marginLeft=20,
  marginRight=20,
  from=StartYear, to=EndYear,
}) => {
  const windowDimensions = [width, height].join(',')
  const [pointer, setPointer] = useSpring(() => ({ pos:[0, 0], config: config.stiff  }))
  const { scaleX, scaleY, scaledGroupValues } = useMemo(() => {
    const scaleX = scaleLinear()
        .domain([parseInt(from), parseInt(to)])
        // - marginLeft*2 to accomodate for the left and right axis
        .range([0, width - marginLeft - marginRight])
    const scaleY = scaleLinear()
      .domain([minValue, maxValue])
      .range([height - marginTop * 2, 0])
    // forEach groupvalues, calculate actual xy values.
    const scaledGroupValues = groupValues.map((g) => {
      const values = g.values.map(d => ({
        ...d,
        x: scaleX(d.t),
        y: scaleY(d[g.key]),
      }))
      return {
        values,
        color: g.color,
        key: g.key,
        xValues: values.map(d => d.x)
      }
    })
    return { scaleX, scaleY, scaledGroupValues }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDimensions, minValue, maxValue, from, to])
  if (!groupValues.length) {
    return null
  }
  const handleMouseMove = (ev) => {
    const rect = ev.currentTarget.getBoundingClientRect()
    setPointer.start({ pos: [ev.clientX - rect.left, ev.clientY - rect.top] })
  }
  return (
    <div className="Lines relative">
    <AnimatedDataPointers
      availableWidth={width}
      offsetTop={marginTop}
      offsetLeft={marginLeft}
      data={scaledGroupValues}
      closestIdx={pointer.pos.interpolate((x,y) => {
        if (!scaledGroupValues[0]) return 0
        const closestIdx = getClosestDatumIdxFromX({
          x: x - marginLeft,
          xValues: scaledGroupValues[0].xValues,
        })
        return closestIdx
        //
        // const bof = scaledGroupValues.map((d, i) => ({
        //   key: groupValues[i].key,
        //   idx: closestIdx,
        //   value: d.values[closestIdx],
        //   color: groupValues[i].color
        // }))
        // return bof
      })}
    />
    <figure
      onMouseMove={handleMouseMove}
      className=" ma0"
    >

      <animated.div className="absolute top-0" style={{
        backgroundColor: 'var(--accent)',
        width: 1,
        height,
        transform: pointer.pos.interpolate((x,y) => `translate(${x}px, 0px)`)
      }} />

      <svg height={height} width={width}>
        {scaledGroupValues.map(({ values },i ) => (
          <TrendLineGraphics
            id={datasetId}
            key={i}
            windowDimensions={windowDimensions}
            marginLeft={marginLeft}
            marginTop={marginTop}
            values={values}
            scaleX={scaleX}
            scaleY={scaleY}
            height={height - marginTop - marginBottom}
            width={width - marginLeft - marginRight}
            isVisible
            strokeWidth={1}
            fill={'transparent'}
            displayPoints={displayPoints}
            strokeColor={groupValues[i].color}
          />
        ))}
        <TrendAxisBottomGraphics
          id={datasetId}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={0}
          axisOffsetTop={0}
          scale={scaleX}
          numTicks={3}
          textColor={'var(--secondary)'}
        />
        <TrendAxisLeftGraphics
          id={datasetId}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={marginTop}
          scale={scaleY}
          numTicks={4}
          width={width - marginLeft - marginRight}
          axisOffsetLeft={width - marginRight}
        />
      </svg>
      <figcaption className="db pl5">
        {groupValues.map((d, i) => (
          <label key={i}>
            <span className="colorpoint dib mr1" style={{
              backgroundColor: d.color
            }}></span>
            {d.legend}&nbsp;
          </label>
        ))}
      </figcaption>
    </figure>
    </div>
  )
}

export default Lines