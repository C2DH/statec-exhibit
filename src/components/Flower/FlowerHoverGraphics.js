import React, { useState } from 'react'
import { scaleLinear } from 'd3-scale'
import { to, animated, useSpring, config } from 'react-spring'


const FlowerHoverGraphics = ({ data, radius, field, minYear, maxYear, onChange }) => {
  const [pos, setPos] = useState({ x:0, y:0, theta:0, datum: -1})
  const [pointer, api] = useSpring(() => ({ x: 20, y: 20, theta: 0, config: config.stiff}))

  // in degrees, each datum
  const dTheta = 360 / (data.length || 1)

  const scaleTheta = scaleLinear().domain([0, 360]).range([0, data.length])

  const mouseMoveHandler = (ev) => {
    const rect = ev.target.getBoundingClientRect()
    const x = ev.clientX - rect.left - radius*2 //x position within the element.
    const y = ev.clientY - rect.top - radius*2 //y position within the element.
    const radians = Math.atan2(y, x) + Math.PI / 2 // correction
    const absRadians = radians < 0 ? radians + Math.PI * 2 : radians
    const theta = absRadians * 180 / Math.PI
    const datumIdx = Math.round(scaleTheta(theta))
    const datum = data[datumIdx] ? data[datumIdx] : data[0]
    api.start({ x, y, theta })
    if(datum.t !== pos.datum.t) {
      // console.info('mouseMoveHandler', theta, minYear, maxYear, Math.floor(scaleTheta(theta)) )
      setPos({ datum })
      if (typeof onChange === 'function') {
        onChange({ datum })
      }
    }
  }
  return (
    <g onMouseMove={mouseMoveHandler}>
      <circle r={radius*2} fill='transparent' />
      <g style={{pointerEvents: 'none'}} >
        {/*/<animated.line
          x1={0} y1={0}
          x2={radius }
          y2={0}
          stroke='black'
          transform={pointer.theta.interpolate((theta) => `rotate(${theta - 90})`)}
        />*/}
        <animated.text
          style={{
            display: 'block',
            textAnchor: 'middle',
            dominantBaseline: 'central',
            color: '#2b219f',
            fontSize: '14px',
          }}
          textAnchor="end"
          dx={pointer.x}
          y={pointer.y}
          dy={-40}
        >
          {pos.datum[field]}
        </animated.text>
        <animated.text
          style={{
            display: 'block',
            textAnchor: 'middle',
            dominantBaseline: 'central',
            color: '#2b219f',
            fontSize: '14px',
          }}
          textAnchor="end"
          dx={pointer.x}
          y={pointer.y}
          dy={-20}
        >
          {pos.datum.t}
        </animated.text>
      </g>

    </g>
  )
}

export default React.memo(FlowerHoverGraphics)
