import React from 'react'
import MediaImage from '../MediaImage'
import {useHistory } from 'react-router-dom'

const ChapterParagraphCover = ({cover, height=0}) => {
  const history = useHistory()
  return (
    <div className="ChapterParagraphCover" onClick={() => history.push({
      search: `?panel=viewer&id=${cover.id}`,
      hash: window.location.hash
    })}>
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
