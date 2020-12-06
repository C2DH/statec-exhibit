import React from 'react'
import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';


class TrendAxisBottomGraphics extends React.Component{
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id || this.props.windowDimensions !== nextProps.windowDimensions
  }

  render() {
    //
    // <TrendAxisBottomGraphics id={id}
    //   marginLeft={marginLeft}
    //   marginTop={marginTop}
    //   axisOffsetTop={trendHeight - 10}
    //   scale={scaleX}
    //   numTicks={isMobileWithTablet ? 4 : 8}
    //   axis={axis}
    //   textColor={red}
    // />
    console.info('rendering TrendAxisBottomGraphics', this.props.id)
    const {
      marginLeft,
      marginTop,
      scale,
      numTicks,
      axisOffsetTop,
      textColor,
    } = this.props;
    return (
      <g transform={`translate(${marginLeft}, ${marginTop + 10})`}>
        <AxisBottom
          top={axisOffsetTop}
          left={0}
          scale={scale}
          numTicks={numTicks}
          label="Time"
        >
          {(axis) => {
            const tickLabelSize = 14;
            const tickRotate = 0;
            return (
              <g className="my-custom-bottom-axis">
                {axis.ticks.map((tick, i) => {
                  const tickX = tick.to.x;
                  const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                  return (
                    <Group
                      key={`vx-tick-${tick.value}-${i}`}
                      className={'vx-axis-tick'}
                    >
                      <text
                        transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                        fontSize={tickLabelSize}
                        textAnchor="middle"
                        fill={textColor}
                        style={{ fontFamily: 'Sneaky' }}
                      >
                        {tick.formattedValue}
                      </text>
                    </Group>
                  );
                })}
              </g>
            );
          }}
        </AxisBottom>
      </g>
    )
  }
}

export default TrendAxisBottomGraphics
