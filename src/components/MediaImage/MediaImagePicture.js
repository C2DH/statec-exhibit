import React from 'react'
import { Link } from 'react-router-dom'

const MediaImagePicture = ({ to, isLoading=true, mediaBase64, padding, backgroundImage }) => {
  return (
    <div className="MediaImagePicture" style={{
      borderWidth: padding
    }}>
      <div className="MediaImagePicture_placeholder" style={{
        backgroundImage: `url(${mediaBase64})`,
      }}/>
      <div className="MediaImagePicture_picture" style={{
        opacity: isLoading ? 0: 1,
        backgroundImage,
      }}/>
      {to && (
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
      )}
    </div>
  )
}

export default MediaImagePicture
