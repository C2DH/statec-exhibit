import React, { useMemo } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { bisectLeft } from 'd3-array';
import { useTransition, animated } from 'react-spring';
import { isMobileWithTablet } from '../../constants';

const AnimatedRows = React.memo(({ rows = [], selectedIndex = 0 }) => {
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
});

const Compare = ({
  module,
  progress = 0,
  currentDate,
  startDate,
  endDate,
  scaleX,
  displayTitle = false
}) => {
  const { groups = [] } = module;
  const dataset = useMemo(() => {
    return require(`../../data/datasets/${module.dataset}.json`);
  }, [module]);
  const timePoints = useMemo(() => {
    return dataset.values.map((d) => moment(d.t, dataset.timeFormat));
  }, [dataset]);
  const currentTime = moment(currentDate);
  const insertIdx = parseInt(bisectLeft(timePoints, currentTime), 10);
  const closestDatumIdx =
    insertIdx === 0
      ? 0
      : Math.abs(currentTime.diff(timePoints[insertIdx])) >
        Math.abs(currentTime.diff(timePoints[insertIdx - 1]))
      ? insertIdx - 1
      : insertIdx;
  const rows = useMemo(() => {
    return groups.map((g) => {
      return {
        label: dataset.legend[g],
        // get nly values for "g", easier to parse later
        values: dataset.values.map((d) => ({
          t: moment(d.t, dataset.timeFormat),
          v: d[g],
        })),
      };
    });
  }, [dataset, groups]).sort(
    (a, b) => b.values[closestDatumIdx].v - a.values[closestDatumIdx].v,
  );
  // sort rows based on currentYear

  return (
    <>
      {displayTitle && module.title.length
        ? <h2 className="textContainerTitle">{module.title} e</h2>
        : null
      }
      <p>{dataset.title} {dataset.url}</p>
      <div
        className="dt w-100"
        style={{ display: isMobileWithTablet ? 'none' : 'table-row' }}
      >
        <div className="dt-row">
          <div className="dtc ph2 bb">&nbsp;</div>
          {timePoints.map((t, i) => (
            <div
              className="dtc ph2 tr bb"
              key={i}
              style={{
                opacity: closestDatumIdx === i ? 1.0 : 0.35,
              }}
            >
              <b>{t.get('year')}</b>
            </div>
          ))}
        </div>
        <AnimatedRows rows={rows} selectedIndex={closestDatumIdx} />
      </div>
    </>
  );
};

export default Compare;
