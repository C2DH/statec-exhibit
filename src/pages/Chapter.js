import React, { useEffect, useMemo, useState } from 'react'
import {useHistory} from 'react-router'
import chapter01 from '../data/themes/theme-01.json'
import chapter02 from '../data/themes/theme-02.json'
import chapter03 from '../data/themes/theme-03.json'
import chapter04 from '../data/themes/theme-04.json'
import { useStore } from '../store'
import { useCurrentWindowDimensions } from '../hooks'
import { isMobile, getIsMobileWithTablet } from '../logic/viewport'
import CurrentYearExplorer from '../components/CurrentYearExplorer'
import ChapterCover from '../components/Chapter/ChapterCover'
import ChapterWideParagraphs from '../components/Chapter/ChapterWideParagraphs'
import ChapterStream from '../components/Chapter/ChapterStream'
import ChapterFooter from '../components/Chapter/ChapterFooter'
import ChapterVisualisations from '../components/Chapter/ChapterVisualisations'
import ChapterQrCode from '../components/Chapter/ChapterQrCode'
import { StartDate, EndDate } from '../constants'

import '../styles/components/chapter.scss'
import { Helmet } from 'react-helmet'

export const AvailableChapters = Object.freeze({
  [chapter01.id]: chapter01,
  [chapter02.id]: chapter02,
  [chapter03.id]: chapter03,
  [chapter04.id]: chapter04
})
const DefaultThemeId = String(chapter01.id)

const Section = ({
  section,
  sectionId,
  height,
  width,
  backgroundColor,
  isMobile,
  chapterId
}) => {
  const [step, setStep] = useState(null)
  const history = useHistory()

  const sectionDataset = useMemo(() => {
    console.info(`Section loading dataset ${section.dataset}.json`)
    return require(`../data/datasets/${section.dataset}.json`)
  }, [section.dataset])

  const stepChangeHandler = (step) => {
    console.info('@stepChangeHandler', step)
    setStep(step)
  }

  const dateExtent = useMemo(() => {
    return Array.isArray(section.datasetExtent)
      ? section.datasetExtent.map(d => new Date(`${d}-01-01`))
      : [StartDate, EndDate]
  }, [section])

  const intervalClickHandler = ({ from, to, paragraphIdx, moduleIdx }) => {

    if (isMobile) {
      history.push({
        search: `?panel=vis&dataset=${section.dataset}&from=${from}&to=${to}&pos=${chapterId},${sectionId},${moduleIdx},${paragraphIdx}`,
        hash: window.location.hash.replace('#', ''),
      })
    } else {
      console.info('@TODO: open / close year indicator.')
    }
  }

  return (
    <div className="Section Chapter_streamWrapper flex">
      <ChapterStream
        numStartAt={section.numStartAt}
        backgroundColor={backgroundColor}
        height={height}
        width={width}
        modules={section.modules}
        onStepChange={stepChangeHandler}
        onIntervalClick={intervalClickHandler}
        className={isMobile ? 'force-full-width': ''}
      />
      {!isMobile ? (
        <div className="Chapter_visualisationWrapper" style={{
          flexGrow: 1,
        }}>
          <ChapterVisualisations
            displayPoints={!!section.displayPoints}
            displayDashedLine={!!section.displayDashedLine}
            numStartAt={section.numStartAt}
            themeDatasetId={sectionDataset.id}
            keys={Object.keys(sectionDataset.legend).filter(k => k !== 't')}
            colorKeys={section.colorKeys}
            legend={sectionDataset.legend}
            data={sectionDataset.values || []}
            width={width}
            height={height}
            modules={section.modules || []}
            step={step}
            dateExtent={dateExtent}
            numericTranslationLabel={section.numericTranslationLabel}
          />
        </div>
      ):null}
    </div>
  )
}

const Chapter = ({ match: { params: { chapterId }}}) => {
  // get the available chapter if vailable; otherwise Chapter 1 ;)
  const chapter = AvailableChapters[String(chapterId)] ?? AvailableChapters[DefaultThemeId];
  const { dataset:chapterDataset } = chapter
  // calcumlate height on Resize after a 250mx throttle
  const isMobileWithTablet = getIsMobileWithTablet()

  const { width, height } = useCurrentWindowDimensions({isMobile})
  // collect all hotspots in the theme (Chapter)
  // result in a list of objects containing year "t" and module index "idx",
  // e.g. { t: 1984, idx:2 }
  const chapterHotspots = useMemo(() => {
    const hotspots = chapter.modules
      .reduce((acc, d, i) => acc.concat((d.moduleHotspots || []).map(h => ({
        ...h,
        idx: i
      }))), [])
    return hotspots
  }, [chapter])

  let counter = 0
  const chapterSections = Array.isArray(chapter.sections)
    ? chapter.sections.map(d => {
      d.numStartAt = +counter
      counter += d.modules.length
      return d
    })
    : [{ dataset: chapter.dataset, modules: chapter.modules, numStartAt:0 }]

  const changeBackgroundColor = useStore(state => state.changeBackgroundColor)
  const changeCurrentChapterStructure = useStore(state => state.changeCurrentChapterStructure)

  useEffect(() => {
    changeBackgroundColor(chapter.backgroundColor)
    changeCurrentChapterStructure(chapterId, chapterSections)
  }, [changeBackgroundColor, changeCurrentChapterStructure, chapter.backgroundColor, chapterId, chapterSections])

  const themeDataset = useMemo(() => {
    if(!chapterDataset) {
      return null
    }
    console.info(`Chapter loading dataset ${chapterDataset}.json`)
    return require(`../data/datasets/${chapterDataset}.json`)
  }, [chapterDataset])

  console.info('Chapter #chapterHotspots n.', chapterHotspots.length, themeDataset)
  console.info('Chapter #chapterSections',chapterSections)
  return (
    <div className="Chapter">
      <Helmet>
        <meta property="og:title" content={chapter.title} />
        <meta property="og:description" content={chapter.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${window.location.protocol}//${window.location.host}${chapter.cover.url}`} />
        <meta property="og:url" content={window.location} />
        <meta name="theme-color" content={chapter.backgroundColor} media="(prefers-color-scheme: light)"/>
        <meta name="theme-color" content={chapter.backgroundColor} media="(prefers-color-scheme: dark)"/>
      </Helmet>
      <CurrentYearExplorer width={width} height={height}/>
      <div className="relative w-100 h-100 with-vertical-line">
      <ChapterCover
        height={height}
        cover={chapter.cover}
        title={chapter.title}
        chapterIndex={chapter.chapterIndex}
      />
      </div>
      <ChapterWideParagraphs
        height={height}
        paragraphs={chapter.introductions || []}
      />
      {chapterSections.map((section, i) => (
        <Section
          key={i}
          sectionId={i}
          chapterId={chapterId}
          section={section}
          height={height}
          width={width}
          isMobile={isMobile}
          backgroundColor={chapter.backgroundColor}
        />
      ))}
      <ChapterWideParagraphs
        height={height}
        paragraphs={chapter.conclusions || []}
      />
      <ChapterFooter isMobileWithTablet={isMobileWithTablet} chapterIndex={chapter.chapterIndex}/>
      {chapter.displayQRcode ? <ChapterQrCode isMobileWithTablet={isMobileWithTablet} chapterId={chapter.id}
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: 75,
          height: 75,
        }}
      />:null}
    </div>
  )
}

export default Chapter
