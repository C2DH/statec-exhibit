import React from 'react'
import { AxisLeft } from '@vx/axis'


class TrendAxisLeftGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.windowDimensions !== nextProps.windowDimensions
  }

  render() {
    const {
      marginLeft,
      marginTop,
      scale,
      numTicks,
      axisOffsetLeft,
      width,
    } = this.props

    return (<g transform={`translate(${marginLeft}, ${marginTop})`}>
        <AxisLeft
          top={0}
          left={axisOffsetLeft}
          scale={scale}
          numTicks={numTicks}
          hideAxisLine={true}
          hideTicks={false}
          label=""
          stroke="#1b1a1e"
          tickLabelProps={(value, index) => ({
            fill: 'rgba(0,0,0,.5)',
            textAnchor: 'end',
            fontSize: 12,
            dx: '-1vw',
            dy: '.5vh',
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
          tickLength={width}
          tickStroke={'rgba(0,0,0,.3)'}
          tickClassName={'tickTrend'}
        />
    </g>)
  }
}

export default TrendAxisLeftGraphics
