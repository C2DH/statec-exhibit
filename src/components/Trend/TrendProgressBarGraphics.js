import React from 'react'
import { Line } from '@vx/shape'


const TrendProgressBarGraphics = ({
  marginLeft,
  marginTop,
  height,
  scale,
  progress,
}) => {
  return <g transform={`translate(${marginLeft}, ${marginTop})`}>
      <Line
        from={{ x: scale(progress), y: 0 }}
        to={{ x: scale(progress), y: height }}
        stroke="var(--primary)"
        strokeWidth={2}
        style={{ pointerEvents: 'none' }}
      />
    </g>
}

export default TrendProgressBarGraphics
