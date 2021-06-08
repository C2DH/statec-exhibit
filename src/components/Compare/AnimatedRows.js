import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTransition, animated } from 'react-spring'


const AnimatedRows = ({ rows = [], selectedIndex = 0 }) => {
  const { t } = useTranslation();
  let height = 0;
  const transitions = useTransition(
    rows.map((data) => ({ ...data, y: (height += 15), height: 15 })),
    (d) => d.label,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
      // config: { mass: 5, tension: 500, friction: 150 },
    },
  );

  return transitions.map(({ item, props: { y, ...rest }, key }, index) => (
    <animated.div
      key={key}
      className="dt-row"
      style={{
        transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
        ...rest,
      }}
    >
      <div className="dtc ph2" style={{ width: 200 }}>
        {item.label}
      </div>
      {item.values.map(({ v }, j) => (
        <div
          className="dtc ph2 tr"
          key={`${key}-${j}`}
          style={{
            opacity: selectedIndex === j ? 1.0 : 0.35,
            border: `1px solid ${
              selectedIndex === j && index === 0 ? 'black' : 'transparent'
            }`,
          }}
        >
          {t('number', { n: v })}
        </div>
      ))}
    </animated.div>
  ));
}

export default React.memo(AnimatedRows)
