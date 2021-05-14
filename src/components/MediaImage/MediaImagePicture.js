import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring, config } from 'react-spring'
import { Maximize2 } from 'react-feather'

const constrainToBoundingBox = ({x, y, bbox}) => {
  let px = x - bbox.x
  let py = y - bbox.y

  if (px < 20) {
    px = 20
  } else if (px > bbox.width - 20) {
    px = bbox.width - 20
  }
  if (py < 20) {
    py = 20
  } else if (py > bbox.height - 20) {
    py = bbox.height - 20
  }
  return { x: px, y: py }
}

const MediaImagePicture = ({ to, isLoading=true, mediaBase64, padding, backgroundImage,
  aspectRatio,
  isPortrait=false
}) => {
  const [{x, y}, api] = useSpring(() => ({ x: 20, y: 20, config: config.stiff}))
  const handleMouseMove = (ev) => {
    api.start(constrainToBoundingBox({
      bbox: ev.target.getBoundingClientRect(),
      x: ev.clientX,
      y: ev.clientY
    }))
  }
  const handleMouseLeave = (ev) => {
    const bbox = ev.target.getBoundingClientRect()
    api.start(constrainToBoundingBox({
      bbox,
      x: 0,
      y: 0,
    }))
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="MediaImagePicture h-100"
      style={{
        borderWidth: padding
      }}
    >
      <animated.div className="MediaImagePicture_pointer absolute" style={{
        x,
        y,
      }}>
        <Maximize2 size={20}/>
      </animated.div>
      <div className="MediaImagePicture_placeholder" style={{
        opacity: isLoading ? 0: 1,
        backgroundImage: `url(${mediaBase64})`,
      }}/>
      <div className="MediaImagePicture_picture" style={{
        opacity: isLoading ? 0: 1,
        backgroundImage,
      }}/>
      {/*/ to && (
        <Link
          to={to}
          className="absolute tc"
          style={{
            bottom: 0,
            right: 0,
            backgroundColor: 'var(--accent)',
            height: 30,
            width: 30,
            lineHeight: '30px',
          }}
        >
          ◹{' '}
        </Link>
      )/*/}
    </div>
  )
}

export default MediaImagePicture
