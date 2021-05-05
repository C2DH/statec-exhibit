import React, { useEffect, useMemo } from 'react'
import chapter01 from '../data/themes/theme-01.json'
import chapter02 from '../data/themes/theme-02.json'
import { useStore } from '../store'
import { useCurrentWindowDimensions } from '../hooks'
import '../styles/components/chapter.scss'
import ChapterCover from '../components/Chapter/ChapterCover'
import ChapterWideParagraphs from '../components/Chapter/ChapterWideParagraphs'
import ChapterStream from '../components/Chapter/ChapterStream'

const AvailableChapters = Object.freeze({
  [chapter01.id]: chapter01,
  [chapter02.id]: chapter02,
})
const DefaultThemeId = String(chapter01.id)


const Chapter = ({ match: { params: { chapterId }}}) => {
  // get the available chapter if vailable; otherwise Chapter 1 ;)
  const chapter = AvailableChapters[String(chapterId)] ?? AvailableChapters[DefaultThemeId];
  // calcumlate height on Resize after a 250mx throttle
  const { height } = useCurrentWindowDimensions()
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
  const changeBackgroundColor = useStore(state => state.changeBackgroundColor)
  useEffect(() => {
    changeBackgroundColor(chapter.backgroundColor)
  }, [chapter, changeBackgroundColor])

  console.info('Chapter #chapterHotspots n.', chapterHotspots.length)
  return (
    <div className="Chapter">
      <ChapterCover
        height={height}
        cover={chapter.cover}
        title={chapter.title}
        chapterIndex={chapter.chapterIndex}
      />
      <ChapterWideParagraphs
        height={height}
        paragraphs={chapter.introductions || []}
      />
      <ChapterStream
        backgroundColor={chapter.backgroundColor}
        height={height}
        modules={chapter.modules}
      />
    </div>
  )
}

export default Chapter
