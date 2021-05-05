import React from 'react'
import MediaImage from '../MediaImage'

const ChapterParagraphCover = ({cover, height=0}) => {

  return (
    <div className="ChapterParagraphCover">
      <MediaImage
        height={height}
        id={cover.id}
        alt={cover.alt}
        caption={cover.caption}
        to={`/doc/${cover.id}`}
      />
    </div>
  )
}
export default ChapterParagraphCover
