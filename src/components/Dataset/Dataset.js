import React, {useMemo} from 'react'
import { extent } from 'd3-array'
import {StartYear, EndYear} from '../../constants'
import Flower from '../Flower'

const Dataset = ({ id, layout='Flowers', keys=['v'], from=StartYear, to=EndYear, height=100, width=100 }) => {
  const Component = Flower
  const { groupValues, minValue, maxValue, legend } = useMemo(() => {
    let { values, legend } = require(`../../data/datasets/${id}.json`);
    values = values.filter((d) => {
      return d.t >= from && d.t <= to;
    });
    const [minYear, maxYear] = extent(values, (d) => d.t);
    const [minValue, maxValue] = values.reduce(
      ([minAcc, maxAcc], d) => {
        const [minLocal, maxLocal] = extent(keys.map((g) => d[g]));
        return [Math.min(minLocal, minAcc), Math.max(maxLocal, maxAcc)];
      },
      [Infinity, -Infinity],
    );
    const groupValues = keys.reduce((acc, g) => {
      acc[g] = values.map((d) => ({
        t: d.t,
        v: d[g],
      }));
      return acc;
    }, {});
    return {
      minYear,
      maxYear,
      minValue,
      maxValue,
      values,
      groupValues,
      legend,
    };
  }, [id, keys, from, to]);
  return (
    <div className="flex flex-rows" style={{marginTop: 100, height: height-100,}}>{id}
      {keys.map((g, i) => (
          <div key={`${layout}-${i}`} style={{
            alignItems: 'stretch',
            width: '50%'
          }}>
            <Component
              field={g}
              data={groupValues[g]}
              minValue={minValue}
              maxValue={maxValue}
              currentYear={null}
            />
          </div>
        ))}
    </div>
  )
}
const DebugDataset = ({ id, layout='Flowers', keys=['v'], from=StartYear, to=EndYear, height=100, width=100 }) => {
  return (<div>{id}</div>)
}
export default DebugDataset
