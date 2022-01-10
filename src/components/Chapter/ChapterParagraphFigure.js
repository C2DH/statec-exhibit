import React from 'react'
import MediaImage from '../MediaImage'
import { useHistory } from 'react-router'


const ChapterParagraphFigure = ({ figure, height, width}) => {
  const history = useHistory()
  return (
    <div className="pb5 pl5-l pr0-l pl3-m  ph3 ">
      <MediaImage
        height={height}
        width={width}
        id={figure.id}
        alt={figure.alt}
        caption={figure.caption}
        onClick={() => history.push({
          search: `?panel=viewer&id=${figure.id}`,
          hash: window.location.hash
        })}
      />
    </div>
  )
}

export default ChapterParagraphFigure
