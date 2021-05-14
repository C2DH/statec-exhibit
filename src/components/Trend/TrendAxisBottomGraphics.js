import React from 'react';
import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';

class TrendAxisBottomGraphics extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id || this.props.windowDimensions !== nextProps.windowDimensions;
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
    const {
      marginLeft,
      marginTop,
      scale,
      numTicks,
      axisOffsetTop,
      textColor,
      lineHeight = 15,
      fontSize = 12,
      tickHeight = 5,
    } = this.props;
    return (
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <AxisBottom
          top={axisOffsetTop}
          left={0}
          scale={scale}
          numTicks={numTicks}
          label="Time"
        >
          {(axis) => {
            const tickRotate = 0;
            return (
              <g className="my-custom-bottom-axis">
                {axis.ticks.map((tick, i) => {
                  const tickX = tick.to.x;
                  return (
                    <Group
                      key={`vx-tick-${tick.value}-${i}`}
                      className={'vx-axis-tick'}
                    >
                      <line
                        x1={tickX}
                        y1={0}
                        x2={tickX}
                        y2={tickHeight}
                        stroke="var(--secondary)"
                      />
                      <line
                        x1={tickX}
                        y1={lineHeight + tickHeight * 2}
                        x2={tickX}
                        y2={lineHeight + tickHeight * 3}
                        stroke="var(--secondary)"
                      />

                      <text
                        transform={`translate(${tickX}, ${
                          lineHeight + 5
                        }) rotate(${tickRotate})`}
                        fontSize={fontSize}
                        textAnchor="middle"
                        fill={textColor}
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
    );
  }
}

export default TrendAxisBottomGraphics;
