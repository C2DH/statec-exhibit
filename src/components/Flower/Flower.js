import React, {useMemo, useState, useEffect} from 'react'
// import { useTranslation } from 'react-i18next'
import { extent } from 'd3-array'
import { scalePow } from 'd3-scale'
import Bezier from './Bezier'
import FlowerHoverGraphics from './FlowerHoverGraphics'
import FlowerSelectedDatum from './FlowerSelectedDatum'
import '../../styles/components/flower.scss'
import { useStore } from '../../store'

const Flower = ({
  colors = ['#FFCCB6', '#f8b294', '#F77DA6'],
  width=200,
  height=200,
  data = [],
  minValue,
  maxValue,
  field = 'v',
  active = false,
  fill = '#EDEDED',
  stroke = 'black',
  nMinPetals = 8,
  children
}) => {
  const currentYear = useStore(state => state.currentYear)
  // const { t } = useTranslation();
  const [colorA, colorB, colorC] = colors
  const dimension = Math.min(width, height)
  const radius = dimension / 4
  const circumference = 2 * Math.PI * radius
  const nOfPetals = data.length
  const petalWidth =
    nOfPetals > nMinPetals
      ? parseInt(circumference / (nOfPetals - 1))
      : parseInt(circumference / nMinPetals)
  const angleD = (Math.PI * 2) / nOfPetals

  const {
    minYear,
    maxYear,
    scaleYUnclamped,
    scaleYUnclampedNegative,
  } = useMemo(() => {
    const [minYear, maxYear] = extent(data, (d) => d.t);
    const scaleYUnclamped = scalePow()
      .exponent(.5)
      .domain([Math.max(0, minValue), Math.max(minValue * -1, maxValue)])
      .clamp(false)
      .range([2, radius]); //petalMaxWidth < 50 ? 50 : petalMaxWidth * 1.2]);
    const scaleYUnclampedNegative = scalePow()
      .exponent(.5)
      .domain([maxValue * -1, 0])
      .clamp(false)
      .range([-radius / 2, -2]);
    return { minYear, maxYear, scaleYUnclamped, scaleYUnclampedNegative };
  }, [data, minValue, maxValue, radius]); // , petalMaxWidth ])
  const maxAngle = angleD + Math.PI;

  const [datum, setDatum] = useState()
  const onDatumChangeHandler = (ev) => {
    setDatum(ev.datum)
  }


  useEffect(() => {
    if (currentYear === null) {
      setDatum(null)
    } else {
      const idx = data.findIndex(d => String(currentYear) === String(d.t))
      if (idx > -1) {
        setDatum(data[idx])
      }
    }
  }, [currentYear, data])

  return (
    <>
    <div
      className="Flower_legend tc sans relative"
      style={{
        fontSize: '12px',
        lineHeight: '14px',
        marginTop: 'var(--spacer-1)',
        color: 'var(--gray-500)',
        width,
      }}
    >

      {children}
    </div>
    <div
      className="Flower h-100 w-100 flex flex-column relative"
      style={{
        flexGrow: 1,
      }}
    >
      <FlowerSelectedDatum className="absolute top-0 left-0 bottom-0"
        datum={datum}
        onChange={onDatumChangeHandler}
        data={data} field={field} style={{ width }}
      />


      <div style={{ flexGrow: 1 }}>
        <div style={{ width, height, overflow: 'hidden' }}>
          <svg width={width} height={height}>
            <defs>
              <linearGradient
                id={`bezierGradient`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={colorA} stopOpacity={1} />
                <stop offset="48%" stopColor={colorB} stopOpacity={1} />
                <stop offset="100%" stopColor={colorC} stopOpacity={1} />
              </linearGradient>
            </defs>

            <g transform={`translate(${width / 2},${height - radius * 2})`}>
              <text
                y={-radius * 1.6 - 5}
                textAnchor="start"
                style={{ fontSize: '12px' }}
                x={0}
              >
                {minYear} &rarr;
              </text>
              <line
                x1={0}
                y1={-radius}
                x2={0}
                y2={-radius * 1.6}
                stroke="black"
                strokeDasharray="2 1"
              ></line>
              <g
                transform={`translate(${Math.sin(maxAngle) * radius * 1.6}, ${
                  Math.cos(maxAngle) * radius * 1.6
                })`}
              >
                <text
                  textAnchor="end"
                  y={-5}
                  x={-5}
                  style={{ fontSize: '12px' }}
                >
                  {maxYear}
                </text>
              </g>
              <line
                x1={Math.sin(maxAngle) * radius}
                y1={Math.cos(maxAngle) * radius}
                x2={Math.sin(maxAngle) * radius * 1.6}
                y2={Math.cos(maxAngle) * radius * 1.6}
                stroke="black"
                strokeDasharray="2 1"
              />
              <circle
                cx={0}
                cy={0}
                r={radius}
                stroke={stroke}
                fill="transparent"
              />
              {data.map((d, i) => {
                const theta = (data.length - i) * angleD + Math.PI;
                const deg = theta * (180 / Math.PI);
                const selected = datum && datum.t === d.t;
                const curveHeight =
                  d[field] > 0 ? scaleYUnclamped(d[field]) : scaleYUnclampedNegative(d[field]);

                return (
                  <g
                    transform={`translate(${Math.sin(theta) * radius}, ${
                      Math.cos(theta) * radius
                    }) `}
                    key={`petal-${i}`}
                  >
                    {d[field] !== 0 && (
                      <g
                        transform={`translate(-${petalWidth / 2},${
                          curveHeight * -1
                        }) rotate(${-deg + 180}, ${
                          petalWidth / 2
                        }, ${curveHeight})`}
                      >
                        <Bezier
                          fill={d[field] > 0 ? `url(#bezierGradient)` : '#e84367'}
                          height={curveHeight}
                          width={petalWidth}
                          c1={petalWidth * 0.2}
                          c2={petalWidth * 0.1}
                          selected={selected}
                        />
                      </g>
                    )}

                  </g>
                );
              })}
              <FlowerHoverGraphics data={data} radius={radius} field={field} minYear={minYear} maxYear={maxYear} onChange={onDatumChangeHandler}/>
              {/*<FlowerPointerGraphics data={data} radius={radius} field={field} />*/}
            </g>
          </svg>
        </div>
      </div>
    </div>
    </>
  );
};
export default Flower
