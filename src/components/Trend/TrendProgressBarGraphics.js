import React from 'react';
import { Line } from '@vx/shape';
import { isMobileWithTablet } from '../../constants';

const TrendProgressBarGraphics = ({
  marginLeft,
  marginTop,
  height,
  scale,
  progress,
}) => {
  return (
    <g transform={`translate(${marginLeft}, ${marginTop})`}>
      <Line
        from={{ x: scale(progress), y: 0 }}
        to={{ x: scale(progress), y: height }}
        stroke="var(--primary)"
        strokeWidth={isMobileWithTablet ? 1 : 2}
        style={{ pointerEvents: 'none' }}
      />
    </g>
  );
};

export default TrendProgressBarGraphics;
