import React, { useMemo } from 'react'
import Trend from '../Trend'
import { isMobileWithTablet } from '../../constants'

const TrendHeaderHeight = 50

const ChapterScrollamaTrends = ({ theme = {}, progress, data}) => {
  const { dataset } = theme
  const { datasetHeading } = theme.modules[data]
  const themeDataset = useMemo(() => {
    return require(`../../data/datasets/${dataset}.json`)
  }, [dataset])
  const moduleDataset = useMemo(() => {
    return require(`../../data/datasets/${datasetHeading}.json`);
  }, [datasetHeading])
  // console.info(themeDataset)
  return (
    <div className="ChapterScrollamaTrends w-100" style={{
      position: 'sticky',
      height: isMobileWithTablet ? window.innerHeight / 4 : window.innerHeight / 2,
      top: 0,
      paddingTop: 'var(--spacer-10)'
    }}>
      <div className="absolute w-100 h-100">
        {!isMobileWithTablet && <Trend
          title={themeDataset.title}
          legend={themeDataset.legend}
          data={themeDataset.values}
          progress={progress}
          height={ window.innerHeight * 0.15 - TrendHeaderHeight }
          valueKey="v"
          timeKey="t"
          trendName={'populationTrend'}
          negative={false}
          from={theme.modules[data].from}
          to={theme.modules[data].to}
          valueFrom={theme.modules[data].datasetValueFrom}
          valueTo={theme.modules[data].datasetValueTo}
          additionalTrends={
            theme.modules[data].datasetAdditionalTrends
          }
          additionalTrendsColors={
            theme.modules[data].datasetAdditionalTrendsColors
          }
          showZero={false}
        />}
        <Trend
          id={moduleDataset.id}
          title={moduleDataset.title}
          data={moduleDataset.values}
          legend={moduleDataset.legend}
          height={
            isMobileWithTablet
              ? window.innerHeight * 0.3 - TrendHeaderHeight
              : window.innerHeight * 0.20 - TrendHeaderHeight
          }
          valueKey="v"
          timeKey="t"
          highlightKey="h"
          trendName={theme.id}
          progress={progress}
          negative={true}
          from={theme.modules[data].from}
          to={theme.modules[data].to}
          valueFrom={theme.modules[data].datasetHeadingValueFrom}
          valueTo={theme.modules[data].datasetHeadingValueTo}
          hotspots={theme.modules[data].moduleHotspots}
          paragraphs={theme.modules[data].paragraphs}
          additionalTrends={
            theme.modules[data].datasetHeadingAdditionalTrends
          }
          additionalTrendsColors={
            theme.modules[data].datasetHeadingAdditionalTrendsColors
          }
          marginTop = {0}
        />
      </div>
    </div>
  )
}

export default ChapterScrollamaTrends
