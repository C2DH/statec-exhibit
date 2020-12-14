import React from 'react'

class TrendHotspotsGraphics extends React.Component{
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id || this.props.hotspots !== nextProps.hotspots || this.props.windowDimensions !== nextProps.windowDimensions
  }

  render() {
    const {
      marginLeft,
      marginTop,
      hotspots,
      scaleX,
      scaleY,
      radius=5,
      fill,
      stroke,
      strokeWidth=2
    } = this.props;
    return <g transform={`translate(${marginLeft}, ${marginTop})`}>
      {hotspots.map((d, i) => {
        return (
          <circle
            key={i}
            cx={scaleX(d.time)}
            cy={scaleY(d.v)}
            stroke={stroke}
            fill={fill}
            strokeWidth={strokeWidth}
            r={radius}
          />
        );
      })}
      </g>
  }
}

export default TrendHotspotsGraphics
