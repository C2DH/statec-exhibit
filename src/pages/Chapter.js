import React, { useEffect, useMemo, useState } from 'react'
import chapter01 from '../data/themes/theme-01.json'
import chapter02 from '../data/themes/theme-02.json'
import { useStore } from '../store'
import { useCurrentWindowDimensions } from '../hooks'
import { getIsMobileWithTablet } from '../logic/viewport'
import CurrentYearExplorer from '../components/CurrentYearExplorer'
import ChapterCover from '../components/Chapter/ChapterCover'
import ChapterWideParagraphs from '../components/Chapter/ChapterWideParagraphs'
import ChapterStream from '../components/Chapter/ChapterStream'
import ChapterFooter from '../components/Chapter/ChapterFooter'
import ChapterVisualisations from '../components/Chapter/ChapterVisualisations'
import '../styles/components/chapter.scss'

const AvailableChapters = Object.freeze({
  [chapter01.id]: chapter01,
  [chapter02.id]: chapter02,
})
const DefaultThemeId = String(chapter01.id)

const Section = ({ section, height, width, backgroundColor}) => {
  const [step, setStep] = useState(null)

  const sectionDataset = useMemo(() => {
    console.info(`Section loading dataset ${section.dataset}.json`)
    return require(`../data/datasets/${section.dataset}.json`)
  }, [section.dataset])

  const stepChangeHandler = (step) => {
    console.info('@stepChangeHandler', step)
    setStep(step)
  }

  return (
    <div className="Section Chapter_streamWrapper flex">
      <ChapterStream
        numStartAt={section.numStartAt}
        backgroundColor={backgroundColor}
        height={height}
        modules={section.modules}
        onStepChange={stepChangeHandler}
      />
      <div style={{
        flexGrow: 1,
      }}>
        <ChapterVisualisations
          displayPoints={!!section.displayPoints}
          numStartAt={section.numStartAt}
          themeDatasetId={sectionDataset.id}
          keys={Object.keys(sectionDataset.legend).filter(k => k !== 't')}
          legend={sectionDataset.legend}
          data={sectionDataset.values || []}
          width={width}
          height={height}
          modules={section.modules || []}
          step={step}
        />
      </div>
    </div>
  )
}

const Chapter = ({ match: { params: { chapterId }}}) => {
  // get the available chapter if vailable; otherwise Chapter 1 ;)
  const chapter = AvailableChapters[String(chapterId)] ?? AvailableChapters[DefaultThemeId];
  // calcumlate height on Resize after a 250mx throttle
  const { width, height } = useCurrentWindowDimensions()
  const isMobileWithTablet = getIsMobileWithTablet()
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

  useEffect(() => {
    changeBackgroundColor(chapter.backgroundColor)
  }, [chapter, changeBackgroundColor])

  const themeDataset = useMemo(() => {
    console.info(`Chapter loading dataset ${chapter.dataset}.json`)
    return require(`../data/datasets/${chapter.dataset}.json`)
  }, [chapter])

  console.info('Chapter #chapterHotspots n.', chapterHotspots.length, themeDataset)
  return (
    <div className="Chapter">
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
          section={section}
          height={height}
          width={width}
          backgroundColor={chapter.backgroundColor}
        />
      ))}
      <ChapterWideParagraphs
        height={height}
        paragraphs={chapter.conclusions || []}
      />
      <ChapterFooter isMobileWithTablet={isMobileWithTablet} chapterIndex={chapter.chapterIndex}/>
    </div>
  )
}

export default Chapter
