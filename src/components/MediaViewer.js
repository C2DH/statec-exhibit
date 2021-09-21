import React, { useEffect, useState } from 'react'
import MediaIndex from '../media/index.json'
import { useURLSearchParams } from '../hooks'
import MediaFigure from './MediaFigure'
import '../styles/components/mediaViewer.scss'


const MediaViewer = ({ color, width, height }) => {
  const qs = useURLSearchParams()
  const [ media, setMedia ] = useState(null)

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
    <figure className="MediaViewer ma0 h-100 w-100 flex flex-column" style={{color}}>
      <MediaFigure media={media} className="mh5 mt5" style={{ flexGrow: 1, overflow: 'hidden'}} />
      <figcaption className="mh5 mb4" style={{ flexShrink: '1' }}>
        {media.caption
          ? <h2 style={{color}} dangerouslySetInnerHTML={{__html:media.caption }}></h2>
          : null
        }
        {media.provenance
          ?  <p style={{color}} dangerouslySetInnerHTML={{__html:media.provenance }}></p>
          : null
        }
      </figcaption>
    </figure>
  )
}

export default MediaViewer
