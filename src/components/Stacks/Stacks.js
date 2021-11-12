import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { animated, useSpring, config } from 'react-spring'
import { stack, area } from 'd3-shape'
import AnimatedDataPointers from '../AnimatedDataPointers'
import DatasetLegend from '../Dataset/DatasetLegend'
import TrendAxisBottomGraphics from '../Trend/TrendAxisBottomGraphics'
import TrendAxisLeftGraphics from '../Trend/TrendAxisLeftGraphics'
import { StartYear, EndYear } from '../../constants'
import { getClosestDatumIdxFromX } from '../../logic/dataset'


const Stacks = ({
  datasetId='',
  values=[],
  groupValues=[],
  minValue,
  maxValue,
  height=0,
  width=0,
  marginTop=50,
  marginBottom=20,
  marginLeft=50,
  marginRight=20,
  from=StartYear, to=EndYear,
  numericTranslationLabel='number'
}) => {
  const windowDimensions = [width, height].join(',')
  const [pointer, setPointer] = useSpring(() => ({ pos:[0, 0], config: config.stiff  }))
  const { scaleX, scaleY, series, scaledGroupValues } = useMemo(() => {
    const scaleX = scaleLinear()
        .domain([parseInt(from), parseInt(to)])
        .range([0, width - marginLeft - marginRight])
    const scaleY = scaleLinear()
      .domain([minValue, maxValue])
      .range([height - marginTop - marginBottom, 0])

    const stackGenerator = stack()
      .keys(groupValues.map(g => g.key));
    const series = stackGenerator(values)
    console.info('series', series, 'values', groupValues)
    // forEach groupvalues, calculate actual xy values.
    const scaledGroupValues = groupValues.map((g, i) => {
      const values = g.values.map((d,j) => ({
        ...d,
        x: scaleX(d.t),
        y: scaleY(series[i][j][1]),
      }))
      return {
        values,
        color: g.color,
        key: g.key,
        xValues: values.map(d => d.x)
      }
    })
    return { scaleX, scaleY, scaledGroupValues, series }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDimensions, values, minValue, maxValue, from, to])
  if (!groupValues.length) {
    return null
  }
  const areaGen = area()
    .x((d) => scaleX(d.data.t))
    .y0((d) => scaleY(d[0]))
    .y1((d) => scaleY(d[1]))

  const handleMouseMove = (ev) => {
    const rect = ev.currentTarget.getBoundingClientRect()
    setPointer.start({ pos: [ev.clientX - rect.left, ev.clientY - rect.top] })
  }

  return (
    <div className="Stacks relative">
    <AnimatedDataPointers
      availableWidth={width}
      offsetTop={marginTop}
      offsetLeft={marginLeft}
      data={scaledGroupValues}
      numericTranslationLabel={numericTranslationLabel}
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
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {series.map((d,i) => (
          <path key={i} d={areaGen(d)} fill={scaledGroupValues[i].color}/>
        ))}
        </g>
        <TrendAxisBottomGraphics
          id={datasetId}
          windowDimensions={windowDimensions}
          marginLeft={marginLeft}
          marginTop={0}
          axisOffsetTop={0}
          scale={scaleX}
          numTicks={3}
          textColor={'var(--secondary)'}
          tickFormat={(v) => v}
        />
        <TrendAxisLeftGraphics
          id={datasetId}
          windowDimensions={windowDimensions}
          marginLeft={0}
          marginTop={marginTop}
          scale={scaleY}
          numTicks={4}
          width={width - marginLeft - marginRight}
          axisOffsetLeft={width - marginRight}
        />
      </svg>
      <DatasetLegend values={groupValues}/>
    </figure>
    </div>
  )
}

export default Stacks
