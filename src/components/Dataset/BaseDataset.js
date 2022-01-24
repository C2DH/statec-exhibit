import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import Flower from '../Flower'
import Compare from '../Compare'
import Lines from '../Lines'
import Stacks from '../Stacks'
import { StartYear, EndYear } from '../../constants'

const AvailableComponents = Object.freeze({
  'Flowers': Flower,
  'Compare': Compare,
  'Lines': Lines,
  'Stacks': Stacks
})

const BaseDataset = ({
  data, id='', layout='Flowers',
  keys=['v'],
  colorKeys={},
  from=StartYear,
  to=EndYear,
  height=100,
  width=100,
  range=null,
  hidePercentage=false,
  displayPoints=true,
  displayDashedLine=false,
  numericTranslationLabel='number'
}) => {
  const Component = AvailableComponents[layout] || <div>Component not defined</div>
  const { t}  = useTranslation()
  const { groupValues, minValue, maxValue, numValues } = useMemo(() => {
    const { values, legend } = data
    // filter values based on "from" and "to"
    const groupValues = keys.map((k) => {
      let kMin = Infinity
      let kMax = -Infinity
      let dMin
      let dMax
      const kValues = []
      for (let i = 0, l=values.length; i < l; i += 1) {
        const d = values[i]
        if (d.t >= from && d.t <= to) {
          if (d[k] < kMin) {
            kMin = d[k]
            dMin = d
          }
          if (d[k] > kMax) {
            kMax = d[k]
            dMax = d
          }
          kValues.push(d)
        }
      }
      return {
        key: k, kMin, kMax, dMin, dMax,
        values: kValues,
        legend:legend[k],
        color: colorKeys[k] || 'var(--secondary)'
      }
    })
    const numValues = groupValues.reduce((acc, d) => {
      return d.values.length > acc ? d.values.length : acc
    }, 0)
    const [minValue, maxValue] = groupValues.reduce((acc, d) => {
      if (d.kMin < acc[0]) {
        acc[0] = d.kMin
      }
      if (d.kMax > acc[1]) {
        acc[1] = d.kMax
      }
      return acc
    }, [Infinity, -Infinity])
    return { groupValues, minValue, maxValue, numValues }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, keys, from, to]);
  console.debug('[BaseDataset] \n - colorKeys: ', colorKeys, '\n - from:', from, '\n - to:', to, '\n - numValues', numValues)

  return (
    <div style={{overflow: 'hidden', width:width}}>
      {['Compare', 'Lines', 'Stacks'].includes(layout)
        ? (
          <Component
            datasetId={[id,from,to].join(',')}
            groupValues={groupValues}
            values={data.values}
            minValue={range ? range[0] : minValue}
            maxValue={range ? range[1] : maxValue}
            height={height}
            width={width}
            from={from}
            to={to}
            hidePercentage={hidePercentage}
            displayPoints={numValues > 100 ? false : displayPoints}
            displayDashedLine={displayDashedLine}
            numericTranslationLabel={numericTranslationLabel}
          />
        )
        : null
      }
      {layout === 'Flowers' ? groupValues.map((g, i) => (
          <div key={`${layout}-${i}`}>
            <Component
              field={g.key}
              data={g.values}
              minValue={minValue}
              maxValue={maxValue}
              width={400}
              height={height}
            >{t(`dataset${id}LegendValue${g.key}`)}</Component>
          </div>
        ))
        : null
      }

    </div>
  )
}

export default BaseDataset
