import React from 'react';
import { Group } from '@vx/group';
import { LinePath, Line } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GlyphDiamond } from '@vx/glyph';
import { extent, max } from 'd3-array';
import { Grid } from '@vx/grid';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Scrollama, Step } from 'react-scrollama';

function genLines(num) {
  return new Array(num).fill(1).map(() => {
    return genDateValue(25);
  });
}

const series = genLines(1);
const series2 = genLines(1);
const data = series.reduce((rec, d) => {
  return rec.concat(d);
}, []);

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

// accessors
const x = (d) => d.date;
const y = (d) => d.value;

const primary = '#8921e0';
const secondary = '#00f2ff';
const contrast = '#ffffff';

const Timeline = ({ progress }) => {
  const width = window.innerWidth * 0.7;
  const height = width / 2;

  const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

  const xMax = width - margin.left;
  const yMax = height - (margin.top + margin.bottom);

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });

  const scroller = 0;

  const timelineScale = scaleLinear({
    range: [0, xMax],
    domain: [0, 0.5],
    clamp: true,
  });

  console.log(timelineScale(progress));

  return (
    <div
      className="w-100 flex justify-center items-center"
      style={{ height: '100vh' }}
    >
      <svg width={width} height={height}>
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={xScale}
          yScale={yScale}
          stroke="rgba(0,0,0,0.3)"
          width={xMax}
          height={yMax}
          numTicksRows={numTicksForHeight(height)}
          numTicksColumns={numTicksForWidth(width)}
        />

        <Group left={margin.left}>
          <AxisLeft
            top={margin.top}
            left={0}
            scale={yScale}
            hideZero
            numTicks={numTicksForHeight(height)}
            label="Axis Left Label"
            labelProps={{
              fill: 'rgba(0,0,0,0.3)',
              textAnchor: 'middle',
              fontSize: 12,
              fontFamily: 'Arial',
            }}
            stroke="#1b1a1e"
            tickStroke="rgba(0,0,0,0.3)"
            tickLabelProps={(value, index) => ({
              fill: 'rgba(0,0,0,0.3)',
              textAnchor: 'end',
              fontSize: 10,
              fontFamily: 'Arial',
              dx: '-0.25em',
              dy: '0.25em',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
          <AxisBottom
            top={height - margin.bottom}
            left={0}
            scale={xScale}
            numTicks={numTicksForWidth(width)}
            label="Time"
          >
            {(axis) => {
              const tickLabelSize = 10;
              const tickRotate = 45;
              const tickColor = 'rgba(0,0,0,0.3)';
              const axisCenter =
                (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
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
                        <Line
                          from={tick.from}
                          to={tick.to}
                          stroke={tickColor}
                        />
                        <text
                          transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                          fontSize={tickLabelSize}
                          textAnchor="middle"
                          fill={tickColor}
                        >
                          {tick.formattedValue}
                        </text>
                      </Group>
                    );
                  })}
                  <text
                    textAnchor="middle"
                    transform={`translate(${axisCenter}, 50)`}
                    fontSize="8"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            }}
          </AxisBottom>
        </Group>

        {xMax > 8 &&
          series.map((d, i) => {
            return (
              <Group key={`lines-${i}`} top={margin.top} left={margin.left}>
                <LinePath
                  data={d}
                  x={(d) => xScale(x(d))}
                  y={(d) => yScale(y(d))}
                  stroke={'#0B2FB2'}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />
              </Group>
            );
          })}

        {xMax > 8 &&
          series2.map((d, i) => {
            return (
              <Group key={`lines-${i}`} top={margin.top} left={margin.left}>
                <LinePath
                  data={d}
                  x={(d) => xScale(x(d))}
                  y={(d) => yScale(y(d))}
                  stroke={'#EF948F'}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />
              </Group>
            );
          })}

        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const cx = xScale(d.date);
            const cy = yScale(d.value);
            return (
              <g key={`line-point-${i}`} transform={`translate(${cx}, ${cy})`}>
                <GlyphDiamond
                  left={0}
                  top={0}
                  size={4}
                  fill={secondary}
                  stroke={primary}
                  strokeWidth={4}
                />
                <GlyphDiamond left={0} top={0} size={4} fill={contrast} />
              </g>
            );
          })}

          <g>
            <Line
              from={{ x: timelineScale(progress), y: 0 }}
              to={{ x: timelineScale(progress), y: yMax }}
              stroke="rgba(92, 119, 235, 1.000)"
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
              strokeDasharray="2,2"
            />
            <circle
              cx={timelineScale(progress)}
              cy={0}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
            />
            <circle
              cx={timelineScale(progress)}
              cy={0}
              r={4}
              fill="rgba(92, 119, 235, 1.000)"
              stroke="white"
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
            />
          </g>
        </Group>
      </svg>
    </div>
  );
};

export default Timeline;
