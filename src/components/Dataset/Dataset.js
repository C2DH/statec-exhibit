import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {StartYear, EndYear, StatusFetching, StatusIdle, StatusSuccess } from '../../constants'
import Flower from '../Flower'
import Compare from '../Compare'
import Lines from '../Lines'
import { useGetDataset } from '../../logic/dataset'
import { Loader} from 'react-feather'

const AvailableComponents = Object.freeze({
  'Flowers': Flower,
  'Compare': Compare,
  'Lines': Lines
})

const Dataset = ({
  data, id='', layout='Flowers',
  keys=['v'],
  colorKeys={},
  from=StartYear, to=EndYear, height=100, width=100,
  hidePercentage=false,
  displayPoints=true,
  displayDashedLine=false,
}) => {
  console.info('Dataset colorKeys', colorKeys)
  const Component = AvailableComponents[layout] || <div>Component not defined</div>
  const { t}  = useTranslation()
  const { groupValues, minValue, maxValue } = useMemo(() => {
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
    const [minValue, maxValue] = groupValues.reduce((acc, d) => {
      if (d.kMin < acc[0]) {
        acc[0] = d.kMin
      }
      if (d.kMax > acc[1]) {
        acc[1] = d.kMax
      }
      return acc
    }, [Infinity, -Infinity])
    return { groupValues, minValue, maxValue }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, keys, from, to]);
  return (
    <div style={{overflow: 'hidden', width:width}}>
      {['Compare', 'Lines'].includes(layout)
        ? (
          <Component
            datasetId={id}
            groupValues={groupValues}
            minValue={minValue}
            maxValue={maxValue}
            height={height}
            width={width}
            from={from}
            to={to}
            hidePercentage={hidePercentage}
            displayPoints={displayPoints}
            displayDashedLine={displayDashedLine}
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


const DebugDataset = ({
  id, layout='Flowers', keys=['v'],
  colorKeys={},
  from=StartYear, to=EndYear,
  height=100, width=100,
  hidePercentage, displayDashedLine, children
}) => {
  const { item, error, status } = useGetDataset({ url : `/datasets/${id}.json`, delay: 100})
  // console.info('DebugDataset', item, error, status)
  if ([StatusFetching, StatusIdle].includes(status)) {
    return (
      <div className="flex items-center justify-center w-100" style={{marginTop: 100, height}}>
        <div className="loader">
          <Loader color="var(--secondary)"/>
        </div>
      </div>
    )
  } else if (status === StatusSuccess) {
    return (
      <>
      <Dataset data={item} id={id} layout={layout} colorKeys={colorKeys} keys={keys} from={from} to={to} height={height} width={width} hidePercentage={hidePercentage} displayDashedLine={displayDashedLine}/>
      {children}
      </>
    )
  }
  return (
    <div className="flex items-center justify-center w-100" style={{marginTop: 100, height}}>
      {JSON.stringify(error)}
    </div>
  )
}
export default DebugDataset
