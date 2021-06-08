import React from 'react';
import { curveMonotoneX } from '@vx/curve';
import { AreaClosed, LinePath } from '@vx/shape';

class TrendLineGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.isVisible !== nextProps.isVisible ||
      this.props.windowDimensions !== nextProps.windowDimensions
    );
  }

  render() {
    const {
      marginLeft,
      marginTop,
      values,
      height,
      width,
      fill,
      scaleY,
      xProp='x',
      yProp='y',
      isVisible=true,
      strokeWidth=1,
      strokeColor='black',
    } = this.props;
    const x = (d) => d[xProp]
    const y = (d) => d[yProp]
    return (
      <g
        className="TrendLineGraphics"
        transform={`translate(${marginLeft}, ${marginTop})`}
      >
        <AreaClosed
          data={values}
          x={x}
          y={y}
          y0={height}
          yScale={scaleY}
          fill={fill}
          strokeWidth={0}
          curve={curveMonotoneX}
          // strokeDasharray={5000}
          // strokeDashoffset={j}
        />
        <LinePath
          className="values"
          data={values}
          x={x}
          y={y}
          strokeWidth={strokeWidth}
          stroke={isVisible? strokeColor: 'var(--data-background)'}
          strokeOpacity={2}
          curve={curveMonotoneX}
           strokeLinecap="round"
        />
        {/*
        <line
          x1={scaleX(fromDate)}
          x2={scaleX(toDate)}
          y1={negative ? trendHeight : 1} y2={negative ? trendHeight : 1}
          stroke={red} strokeWidth={1}></line>
      */}
        <line
          className="toZero"
          x1={0}
          x2={width}
          y1={scaleY(0)}
          y2={scaleY(0)}
          stroke={'rgba(0,0,0,0.5'}
          strokeWidth={1}
        ></line>
      </g>
    );
  }
}

export default TrendLineGraphics;
