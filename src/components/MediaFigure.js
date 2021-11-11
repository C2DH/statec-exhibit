import React from 'react'
import { useImage } from '../hooks'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MediaZoomableFigure = ({
  src
}) => (
  <TransformWrapper>
    <TransformComponent>
      <img className="shadow" src={src} alt="test" />
    </TransformComponent>
  </TransformWrapper>
)
const MediaFigure = ({
  media,
  resolution = 'large-h',
  className='', style={},
  padding=0
}) => {
  const mediaUrl = media.resolutions[resolution].url
  const { isLoading } = useImage(mediaUrl, 200);

  return (
    <div className={`MediaFigure relative ${className}`} style={style}>
      <div className="absolute w-100 h-100 top-0 left-0">
        <div className="MediaImagePicture_placeholder" style={{
          opacity: isLoading ? .5: 0,
          backgroundSize: 'contain',
          backgroundPosition: 'left',
          overflow: 'hidden',
          backgroundImage: `url(${media.base64})`,
        }}/>

        <div className="MediaImagePicture_picture" style={{
          opacity: isLoading ? 0: 1,
        }}>
          <MediaZoomableFigure src={mediaUrl}/>
        </div>
      </div>
    </div>
  )
}

export default MediaFigure
