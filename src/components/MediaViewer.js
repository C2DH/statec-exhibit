import React, { useEffect, useState } from 'react'
import MediaIndex from '../media/index.json'
import { useURLSearchParams } from '../hooks'
import MediaViewerZoomableFigure from './MediaViewerZoomableFigure'
import '../styles/components/mediaViewer.scss'
import {useBoundingClientRect} from '../hooks'

const MediaViewer = ({ isMobile=true, color, width, height }) => {
  const qs = useURLSearchParams()
  const [ media, setMedia ] = useState(null)
  const [{ height:mediaFigureHeight, width:mediaFigureWidth}, ref] = useBoundingClientRect({ isMobile })

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
      className="MediaViewer ma0 pa0 w-100 h-100 flex flex-column"
      style={{ color }}
    >
      <div ref={ref} style={{
        flexGrow: 1,
      }}>
        {media ? (
          <MediaViewerZoomableFigure
            resolutions='large-h'
            media={media}
            src={media?.resolutions['large-h'].url}
            height={mediaFigureHeight}
            width={mediaFigureWidth}
            color={color}
          />
        ): null}
      </div>
      <figcaption className="mh0 pb3" style={{ flexShrink: '1', maxHeight: height * .25, overflow: 'scroll' }}>
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
