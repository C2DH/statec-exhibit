import React from 'react'
import { useCurrentWindowDimensions, useURLSearchParams } from '../../hooks'
import { useGetDataset } from '../../logic/dataset'
import {StatusSuccess,StatusError, StartYear, EndYear} from '../../constants'
import  {AvailableChapters} from '../../pages/Chapter'
import VisualisationViewerWrapper from './VisualisationViewerWrapper'



const VisualisationViewer = ({ color='white' }) => {
  const { width, height } = useCurrentWindowDimensions({ isMobile: true })
  const qs = useURLSearchParams()
  const datasetId = qs.get('dataset')
  const from = qs.get('from') || StartYear
  const to = qs.get('to') || EndYear
  const numericTranslationLabel = qs.get('numericTranslationLabel')
  // get idx from position parameter
  const [ chapterId, sectionId, moduleIdx, paragraphIdx ] = (qs.get('pos') || 'a-country-of-migration,0,0,0').split(',')
  // get chapter
  const chapter = AvailableChapters[chapterId]
  const sectionModule = Array.isArray(chapter.sections)
    ? chapter.sections[sectionId].modules[moduleIdx]
    : chapter.modules[moduleIdx]
  const paragraph = sectionModule.paragraphs[paragraphIdx]
  // const keys = (qs.get('to') || 'v').split(',')
  console.debug('[VisualisationViewer] paragraph', paragraph)

  const { item:data, error, status } = useGetDataset({
    url : datasetId ? `/datasets/${datasetId}.json` : null,
    delay: 600,
  })
  if (!datasetId) {
    return null
  }
  const keys = Object.keys(data ? data.legend : {}).filter(k => k !== 't')
  const colorKeys = Array.isArray(chapter.sections)
    ? chapter.sections[sectionId].colorKeys
    : chapter.colorKeys

  return (
    <div style={{color}}>
      {status === StatusSuccess && (
        <VisualisationViewerWrapper
          chapter={chapter}
          sectionModule={sectionModule}
          paragraph={paragraph}
          color={color}
          datasetId = {datasetId}
          data = {data}
          keys = {keys}
          colorKeys={colorKeys}
          from = {from}
          to = {to}
          height = {height}
          width = {width}
          numericTranslationLabel={numericTranslationLabel}
        />
      )}
      {status === StatusError ? (
        <div style={{height: height-150}} className="flex flex-column items-start">
          <h1 className="mt0">Nous sommes désolés mais une erreur s'est produite.</h1>
          <p className="ts">Dataset: <b>{datasetId}</b> {[ chapterId, sectionId, moduleIdx, paragraphIdx ].join(',')}</p>
          <div className="bg-white-50 ma0 pa2 w-100 ba"><pre className="word-wrap ws-normal ma0">{error.message}</pre></div>
        </div>
      ): null}
    </div>
  )
}
// {status}/{StatusError}
// {status === StatusError ? (
//   <div style={{height: height-150}} className="flex flex-column items-start">
//     <h1 className="mt0">Nous sommes désolés mais une erreur s'est produite.</h1>
//     <p className="ts">Dataset: <b>{datasetId}</b> {[ chapterId, sectionId, moduleIdx, paragraphIdx ].join(',')}</p>
//     <div className="bg-white-50 ma0 pa2 w-100 ba"><pre className="word-wrap ws-normal ma0">{error.message}</pre></div>
//   </div>
// ): null}

export default VisualisationViewer
