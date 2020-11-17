import React from 'react'
import { curveMonotoneX } from '@vx/curve'
import { LinePath } from '@vx/shape'


class TrendAdditionalLines extends React.Component{
  shouldComponentUpdate(nextProps) {
    return  this.props.id !== nextProps.id || this.props.windowDimensions !== nextProps.windowDimensions
  }

  render() {
    const {
      additionalTrends,
      values,
      scaleX,
      scaleY
    } = this.props

    const x = (d) => scaleX(d.time)
    const ys = additionalTrends.map(valueKey => (d) => scaleY(d[valueKey]))
    console.info('redering TrendAdditionalLineGraphics TrendAdditionalLines', additionalTrends)
    return (
      <>
        {additionalTrends.map((valueKey, i) => (
          <LinePath key={i}
            data={values}
            x={x}
            y={ys[i]}
            strokeWidth={1}
            stroke='grey'
            strokeOpacity={.3}
            curve={curveMonotoneX}
          />
        ))}
      </>
    )
  }
}

const simplifyPercentValue = (v, m=100) => `${(Math.round(v*m)/m)}‰`

class TrendAdditionalLinePointers extends React.Component{
  shouldComponentUpdate(nextProps) {
    return  this.props.id !== nextProps.id || this.props.cx !== nextProps.cx
  }
  render() {
    const {
      additionalTrends,
      additionalTrendsColors,
      values,
      scaleX,
      scaleY,
      cx,
      radius=3,
      currentParagraph,
      displayValue=false
    } = this.props
    //
    const value = values.find((d) => d.timeFullYear === cx)
    if (!value) {
      return null
    }
    const x = (d) => scaleX(d.time)
    const ys = additionalTrends.map(valueKey => (d) => scaleY(d[valueKey]))
    console.info('TrendAdditionalLinePointers', currentParagraph, cx)
    return (
      <>
      {additionalTrends.map((valueKey, i) => (
        <g key={`v-${i}`}>
          <LinePath
            data={values.filter(v => v.timeFullYear <= cx )}
            x={x}
            y={ys[i]}
            strokeWidth={1}
            stroke={additionalTrendsColors[i]}
            strokeOpacity={1}
            curve={curveMonotoneX}
          />
          <circle
            cx={scaleX(value.time)}
            cy={ys[i](value)}
            fill={additionalTrendsColors[i]}
            r={radius}
          />
          {displayValue && <text
            x={scaleX(value.time)}
            dx={10}
            dy={5}
            fill={additionalTrendsColors[i]}
            style={{fontSize: 12}}
            y={ys[i](value)}>{simplifyPercentValue(value[valueKey])}</text>}
        </g>
      ))}
      </>
    )
  }
}


const TrendAdditionalLineGraphics = (props) => {
  return (
    <g className="TrendAdditionalLineGraphics" transform={`translate(${props.marginLeft}, ${props.marginTop})`}>
    <TrendAdditionalLines {...props} />
    <TrendAdditionalLinePointers {...props} />
    </g>
  )
}

export default TrendAdditionalLineGraphics
