import React from 'react'
import {StartYear, EndYear, StatusFetching, StatusIdle, StatusSuccess } from '../../constants'
import { useGetDataset } from '../../logic/dataset'
import { Loader} from 'react-feather'
import DownloadDataButton from '../DownloadDataButton'
import BaseDataset from './BaseDataset'


const Dataset = ({
  id, layout='Flowers', keys=['v'],
  colorKeys={},
  from=StartYear, to=EndYear,
  height=100, width=100,
  // null or Array
  range=null,
  numericTranslationLabel='number',
  displayPoints=true,
  hidePercentage, displayDashedLine, children
}) => {
  const { item, error, status } = useGetDataset({ url : `/datasets/${id}.json`, delay: 100})
  // console.info('Dataset', item, error, status)
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
      <BaseDataset
        data={item}
        id={id}
        layout={layout}
        colorKeys={colorKeys}
        keys={keys}
        from={from}
        to={to}
        height={height} width={width}
        hidePercentage={hidePercentage}
        displayDashedLine={displayDashedLine}
        displayPoints={displayPoints}
        numericTranslationLabel={numericTranslationLabel}
        range={range}
      />
      {children}
      <div className="pa3 pl5-l">
      <DownloadDataButton label="" values={item.values} legend={item.legend} />
      </div>
      </>
    )
  }
  return (
    <div className="flex items-center justify-center w-100" style={{marginTop: 100, height}}>
      {JSON.stringify(error)}
    </div>
  )
}

export default React.memo(Dataset, (prevProps, nextProps) => {
  return prevProps.memoId === nextProps.memoId
})
