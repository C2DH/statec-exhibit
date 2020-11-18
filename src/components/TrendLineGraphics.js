import React from 'react';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';
import { curveMonotoneX } from '@vx/curve';
import { AreaClosed, LinePath } from '@vx/shape';

class TrendLineGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.show !== nextProps.show ||
      this.props.windowDimensions !== nextProps.windowDimensions
    );
  }

  render() {
    const {
      show,
      marginLeft,
      marginTop,
      values,
      scaleX,
      scaleY,
      height,
      width,
      fill,
    } = this.props;
    console.info('rendering TrendLineGraphics', this.props.id, fill);

    const x = (d) => scaleX(d.time);
    const y = (d) => scaleY(d.value);
    return (
      <g
        className="TrendLineGraphics"
        transform={`translate(${marginLeft}, ${marginTop})`}
      >
        <Animate
          show={show}
          start={() => ({
            j: 0,
            timing: { duration: 300, ease: easeQuadOut },
          })}
          enter={() => ({
            j: [1],
            timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
          })}
          update={() => ({
            j: [1],
            timing: { duration: 1000, ease: easeQuadOut, delay: 500 },
          })}
          leave={() => ({
            j: [0],
            timing: { duration: 0 },
          })}
        >
          {(state) => {
            const { j } = state;
            return (
              <AreaClosed
                data={values}
                x={x}
                y={y}
                y0={height}
                yScale={scaleY}
                fill={fill}
                fillOpacity={j}
                strokeWidth={0}
                curve={curveMonotoneX}
                // strokeDasharray={5000}
                // strokeDashoffset={j}
              />
            );
          }}
        </Animate>
        <LinePath
          className="values"
          data={values}
          x={x}
          y={y}
          strokeWidth={1}
          stroke="#86b9d4"
          strokeOpacity={1}
          curve={curveMonotoneX}
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
