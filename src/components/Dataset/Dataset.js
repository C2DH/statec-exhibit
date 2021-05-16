import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {StartYear, EndYear, StatusFetching, StatusIdle, StatusSuccess } from '../../constants'
import Flower from '../Flower'
import Compare from '../Compare'
import { useGetDataset } from '../../logic/dataset'
import { Loader} from 'react-feather'

const AvailableComponents = Object.freeze({
  'Flowers': Flower,
  'Compare': Compare,
})

const Dataset = ({ data, id='', layout='Flowers', keys=['v'], from=StartYear, to=EndYear, height=100, width=100 }) => {
  const Component = AvailableComponents[layout] || <div>Component not defined</div>
  const { t}  = useTranslation()
  const { groupValues, minValue, maxValue, legend } = useMemo(() => {
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
      return { key: k, kMin, kMax, dMin, dMax, values: kValues, legend:legend[k] }
    })
    const [minValue, maxValue] = groupValues.reduce((acc, d) => {
      if (d.kMin < acc[0]) {
        acc[0] = d.kMin
      }
      if (d.kMax > acc[0]) {
        acc[1] = d.kMax
      }
      return acc
    }, [Infinity, -Infinity])
    return { groupValues, minValue, maxValue }
  }, [data, keys, from, to]);
  return (
    <div>
      {layout === 'Compare'
        ? (
          <Component
            datasetId={id}
            groupValues={groupValues}
            minValue={minValue}
            maxValue={maxValue}
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


const DebugDataset = ({ id, layout='Flowers', keys=['v'], from=StartYear, to=EndYear, height=100, width=100 }) => {
  const { item, error, status } = useGetDataset({ url : `/datasets/${id}.json`, delay: 100})
  console.info('DebugDataset', item, error, status)
  if ([StatusFetching, StatusIdle].includes(status)) {
    return (
      <div className="flex items-center justify-center w-100" style={{marginTop: 100, height}}>
        <div className="loader">
          <Loader color="var(--secondary)"/>
        </div>
      </div>
    )
  } else if (status === StatusSuccess) {
    return <Dataset data={item} id={id} layout={layout} keys={keys} from={from} to={to} height={height} width={width}/>
  }
  return (
    <div className="flex items-center justify-center w-100" style={{marginTop: 100, height}}>
      {JSON.stringify(error)}
    </div>
  )
}
export default DebugDataset
