import React from 'react';

const DEBUG = false;

const Bezier = ({ width, height, c1, c2, selected }) => {
  const startPoint = [0, height];
  const controlPoint1 = [c2, height];
  const controlPoint2 = [c1, 0];
  const controlPoint3 = [width - c1, 0];
  const controlPoint4 = [width - c2, height];
  const middlePoint = [width / 2, 0];
  const endPoint = [width, height];

  return (
    <g>
      {/* <path
            d={`
            M ${startPoint}
            Q ${controlPoint} ${endPoint}
            `}
            fill="red"
            stroke="#0E0461"
            strokeWidth={0.8}
            strokeOpacity={1}
          /> */}
      {DEBUG && (
        <g>
          <circle
            cx={controlPoint1[0]}
            cy={controlPoint1[1]}
            fill="red"
            r={15}
          />

          <circle
            cx={controlPoint2[0]}
            cy={controlPoint2[1]}
            fill="yellow"
            r={15}
          />

          <circle
            cx={controlPoint3[0]}
            cy={controlPoint3[1]}
            fill="green"
            r={15}
          />

          <circle
            cx={controlPoint4[0]}
            cy={controlPoint4[1]}
            fill="black"
            r={15}
          />
        </g>
      )}

      <path
        d={`
      M ${startPoint}
      C ${controlPoint1} ${controlPoint2} ${middlePoint}
      M ${middlePoint}
      C ${controlPoint3} ${controlPoint4} ${endPoint}
      L ${startPoint}
    `}
        fill={`url(#bezierGradient)`}
        stroke={selected ? '#d03a45' : 'none'}
        strokeWidth={2}
      />

      {/* <path
        d={`
      M ${middlePoint}
      C ${controlPoint3} ${controlPoint4} ${endPoint}
    `}
        fill={`url(#bezierGradient)`}
        stroke="none"
        strokeWidth={5}
      /> */}
    </g>
  );
};

export default Bezier;
