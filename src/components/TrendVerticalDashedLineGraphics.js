import React from 'react'
import { Animate } from 'react-move'
import { easeQuadOut } from 'd3-ease'


class TrendVerticalDashedLineGraphics extends React.Component{
  shouldComponentUpdate(nextProps) {
    return  this.props.id !== nextProps.id || this.props.show !== nextProps.show
  }

  render() {
    const {
      show,
      marginLeft,
      marginTop,
      values,
      trendHeight,
      scale,
      timeKey,
    } = this.props

    console.info('rendering TrendVerticalDashedLineGraphics', this.props.id)

    return (
      <g className="TrendVerticalDashedLineGraphics" transform={`translate(${marginLeft}, ${marginTop})`}>
      {values.map((d, i) => {
        // const date = moment(d[timeKey]);
        // const value = d[valueKey];
        const startAnimation = trendHeight;

        return (
          <g key={i}>
            <Animate
              show={show}
              start={() => ({
                y2: startAnimation,
              })}
              enter={() => ({
                y2: [0],
                timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
              })}
              update={() => ({
                y2: [0],
                timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
              })}
              leave={() => ({
                y2: [0],
                timing: { duration: 0 },
              })}
            >
              {(state) => {
                const { y2 } = state;
                return (
                  <line
                    id={`line-${i}`}
                    x1={scale(d[timeKey])}
                    y1={trendHeight}
                    x2={scale(d[timeKey])}
                    y2={y2}
                    stroke={'rgba(0,0,0,0.3)'}
                    strokeWidth={0.5}
                    strokeDasharray="4 4"
                  />
                );
              }}
            </Animate>
          </g>
        )
      })}
      </g>
    )
  }
}

export default TrendVerticalDashedLineGraphics
