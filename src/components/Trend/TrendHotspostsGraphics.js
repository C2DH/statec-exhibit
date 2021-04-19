import React from 'react';
import { isMobileWithTablet } from '../../constants';

class TrendHotspotsGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.hotspots !== nextProps.hotspots ||
      this.props.windowDimensions !== nextProps.windowDimensions
    );
  }

  render() {
    const {
      marginLeft,
      marginTop,
      hotspots,
      scaleX,
      scaleY,
      radius = 5,
      fill,
      stroke,
      strokeWidth = 2,
      valueKey='v'
    } = this.props;
    return (
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {hotspots.map((d, i) => {
          return (
            <circle
              key={i}
              cx={scaleX(d.time)}
              cy={scaleY(d[valueKey])}
              stroke={stroke}
              fill={fill}
              strokeWidth={isMobileWithTablet ? 1 : strokeWidth}
              r={radius}
            />
          );
        })}
      </g>
    );
  }
}

export default TrendHotspotsGraphics;
