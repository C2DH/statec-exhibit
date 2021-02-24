import React from 'react'
import ChapterCover from './ChapterCover'
import ChapterFooter from './ChapterFooter'
import ChapterScrollama from './ChapterScrollama'
import ChapterHeader from './ChapterHeader'
import ChapterConclusions from './ChapterConclusions'


const Chapter = ({ theme, color, chapterIndex, showCover = true, showTitle = true }) => {
  return (
    <div className="w-100">
      <ChapterCover
        cover={theme.cover}
        title={theme.title}
        chapterIndex={chapterIndex}
      />
      <ChapterHeader chapterIndex={chapterIndex} />
      <ChapterScrollama theme={theme} />
      {
        Array.isArray(theme.conclusions)
        ? <ChapterConclusions themeId={theme.id} conclusions={theme.conclusions} />
        : null
      }
      <ChapterFooter chapterIndex={chapterIndex} />
    </div>
  )
}

export default Chapter;
