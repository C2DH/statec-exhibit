import React from 'react'
import { curveMonotoneX } from '@vx/curve'
import { LinePath } from '@vx/shape'


class TrendAdditionalLineGraphics extends React.Component{
  shouldComponentUpdate(nextProps) {
    return  this.props.id !== nextProps.id
  }

  render() {
    const {
      additionalTrends,
      marginLeft,
      marginTop,
      values,
      scaleX,
      scaleY
    } = this.props

    const x = (d) => scaleX(d.time)
    const ys = additionalTrends.map(valueKey => (d) => scaleY(d[valueKey]))
    console.info('redering TrendAdditionalLineGraphics', additionalTrends)
    return (
      <g className="TrendAdditionalLineGraphics" transform={`translate(${marginLeft}, ${marginTop + 10})`}>
        {additionalTrends.map((valueKey, i) => (
          <LinePath key={i}
            data={values}
            x={x}
            y={ys[i]}
            strokeWidth={1}
            stroke="#86b9d4"
            strokeOpacity={1}
            curve={curveMonotoneX}
          />
        ))}
      </g>
    )
  }
}

export default TrendAdditionalLineGraphics
