import React, { useRef, useEffect } from 'react'
import { useImage } from '../hooks'
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { ZoomIn, ZoomOut } from 'react-feather'

// const MediaZoomableFigure = ({
//   src,
//   initialScale=1,
//   color
// }) => (
//   <TransformWrapper initialScale={initialScale} minScale={initialScale} maxScale={10} centerOnInit>
//      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//        <React.Fragment>
//           <div className="tools absolute" style={{zIndex:1, top: 12, right:12}}>
//              <button className="bw0" style={{backgroundColor: color, borderRadius: 2, height:32, width: 32}} onClick={() => zoomIn()}>
//               <ZoomIn color="var(--secondary)"/></button>
//              <button style={{backgroundColor: color, borderRadius: 2, height:32, width: 32}} className="bw0" onClick={() => zoomOut()}>
//               <ZoomOut color="var(--secondary)"/></button>
//              <button className="bw0" onClick={() => resetTransform()}>x</button>
//            </div>
//         <TransformComponent>
//           <img src={src} alt="test" />
//         </TransformComponent>
//       </React.Fragment>
//     )}
//   </TransformWrapper>
// )
const MediaViewerFigure = ({
  color,
  media,
  resolution = 'large-h',
  className='', style={},
  padding=0,
  height=0,
  width=0
}) => {
  const figureRef = useRef()
  const mediaUrl = media
    ? media.resolutions[resolution].url
    : ''
  const { isLoading } = useImage(mediaUrl, 500)
  // put image full width
  const imageHeight = width / media.aspectRatio

  useEffect(() => {
    if (figureRef.current) {
      figureRef.current.scrollTo(0, 0)
    }
  }, [mediaUrl])
  // fit height/width
  // const initialScale = 0.4
  return (
    <div
      ref={figureRef}
      className={`MediaViewerFigure absolute h-100 w-100 ${className}`}
      style={{
        height,
        width,
        overflow: 'scroll',
        backgroundColor: '#120d55'
      }}
    >
      <div className="MediaImagePicture_placeholder absolute" style={{
        opacity: 1,
        height: imageHeight,
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        backgroundImage: `url(${media.base64})`,
      }}/>

      <div className="MediaImagePicture_picture" style={{
        opacity: isLoading ? 0: 1,
        height: imageHeight,
        backgroundSize: 'contain',
        backgroundImage: `url(${mediaUrl})`,
      }}>

      </div>
    </div>
  )
}

export default MediaViewerFigure
