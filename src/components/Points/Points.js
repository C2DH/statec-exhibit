import React, { useMemo } from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import moment from 'moment'
import { extent } from 'd3-array'
import { StartDate, EndDate } from '../../constants'
import TrendPointers from '../Trend/TrendPointers'
import DownloadDataButton from '../DownloadDataButton'

const useExtent = ({ data=[], availableKeys=['v'] }) => useMemo(()  => {
  // use the keys to flatten down the values in order to computate max and min
  const flattenedData = data.reduce((acc, d) => acc.concat(availableKeys.map(k => d[k])), [])
  return extent(flattenedData)
}, [availableKeys, data])

const useValues = ({data, scaleX, scaleY, availableKeys}) => useMemo(() => data.map(d => {
  const x = scaleX(moment(d.t, 'YYYY').startOf('year'));
  const ys = availableKeys.reduce((acc, k) => {
    acc[k] = scaleY(d[k])
    return acc
  }, {})
  return {
    ...d,
    x,
    ys
  }
}), [data, scaleX, scaleY, availableKeys])

const Points = ({
  themeDatasetId='themeDatasetId',
  paragraphId='-1,-1',
  legend={},
  data=[],
  from, to,
  // availableKeys: to computate the extent
  availableKeys=['v'],
  // visibleKeys: to draw the lines
  visibleKeys=['v'],
  // focusKeys: to draw the lines, bigger
  focusKeys=['v'],
  timeKey='t',
  hotspots=[],
  left=0,
  top=0,
  height = 100,
  width=100,
  marginLeft=100,
  marginRight=50,
  marginTop=50
}) => {
  const svgHeight = height - 100
  const svgWidth = Math.max(0, width)
  const windowDimensions = [svgWidth, svgHeight].join(',')
  const [xMin, xMax] = useExtent({data, availableKeys})
  const scaleX = scaleTime()
      .domain([StartDate, EndDate])
      // - marginLeft*2 to accomodate for the left and right axis
      .range([0, svgWidth - marginLeft - marginRight])
  const scaleY = scaleLinear()
    .domain([xMin, xMax])
    .range([svgHeight - marginTop * 2, 0])

  // values is an array of dicts [{x:, ys:{'v': ... }}]
  const values = useValues({ data, scaleX, scaleY, availableKeys })
  const numTicks = Math.round(svgWidth / 80)

  return (
    <div className="Points">
    <TrendPointers
      themeDatasetId={themeDatasetId}
      from={from}
      to={to}
      height={svgHeight}
      width={svgWidth}
      windowDimensions={windowDimensions}
      visibleKeys={visibleKeys}
      focusKeys={focusKeys}
      marginLeft={marginLeft}
      scaleX={scaleX}
      scaleY={scaleX}
      marginTop={marginTop}
      left={left}
      top={top}
      values={values}
    >
      <DownloadDataButton label="test" values={data} legend={legend} />
    </TrendPointers>
    </div>
  )
}

export default Points
