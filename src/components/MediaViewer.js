import React, { useEffect, useState } from 'react'
import MediaIndex from '../media/index.json'
import { useURLSearchParams } from '../hooks'
import MediaViewerZoomableFigure from './MediaViewerZoomableFigure'
import '../styles/components/mediaViewer.scss'
import {useBoundingClientRect} from '../hooks'

const MediaViewer = ({ isMobile, color, width, height }) => {
  const qs = useURLSearchParams()
  const [ media, setMedia ] = useState(null)
  const [{ width:mediaFigureWidth}, ref] = useBoundingClientRect()

  useEffect(() => {
    const id = qs.get('id')
    if (MediaIndex.images[id]) {
      setMedia(MediaIndex.images[id])
    } else {
      console.warn('MediaViewer media id not found')
    }
  }, [qs])
  if (!media) {
    return null
  }
  return (
    <figure
      className="MediaViewer ma0 pa0 pb5 w-100"
      style={{ color }}
    >
      <div ref={ref} style={{
        height: height * .80
      }}>
        {media ? (
          <MediaViewerZoomableFigure
            resolutions='large-h'
            media={media}
            src={media?.resolutions['large-h'].url}
            height={height * .80}
            width={mediaFigureWidth}
            color={color}
          />
        ): null}
      </div>
      <figcaption className="mh0 pb3">
        {media.caption
          ? <h2 className="mb1" style={{color, marginTop: 0}} dangerouslySetInnerHTML={{__html:media.caption }}></h2>
          : null
        }
        {media.provenance
          ?  <p className="ma0" style={{color}} dangerouslySetInnerHTML={{__html:media.provenance }}></p>
          : null
        }
      </figcaption>
    </figure>
  )
}

export default MediaViewer
