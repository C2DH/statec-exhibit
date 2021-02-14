import React from 'react';
import MediaIndex from '../media/index.json';
import { Link } from 'react-router-dom';
import { isMobileWithTablet } from '../constants';
import { useImage } from '../hooks';


const MediaImage = ({ id, to, alt, caption, title = '', preview, height = '40vh', padding, resolution = 'medium-h' }) => {
  const media = MediaIndex.images[id]
  const mediaUrl = media
    ? media.resolutions[resolution].url
    : '';
  const mediaBase64 = media?.base64
  const { isLoading } = useImage(mediaUrl, 50);
  const backgroundImage = `url(${isLoading ? mediaBase64 : mediaUrl})`

  console.info('MediaImage rendered', id, backgroundImage, mediaUrl)

  return (
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobileWithTablet ? '35vh' : height,
        width: '100%',
        margin: '0 auto',
      }}
    >
      {!!title.length && <h2 className="textContainerTitle">{title}</h2>}
      <div style={{ height: padding, backgroundColor: 'black' }}></div>
      <div
        style={{
          backgroundImage,
          backgroundColor: 'black',
          transition: '0.16s opacity ease-in',
          opacity: `${isLoading ? 0.2 : 1}`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexGrow: 1,
          overflow: 'hidden',
          borderLeft: `${padding}px solid`,
          borderRight: `${padding}px solid`,
          position: 'relative',
        }}
      >
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
      <div style={{ height: padding, backgroundColor: 'black' }}></div>
      <figcaption
        dangerouslySetInnerHTML={{ __html: caption }}
        style={{
          padding,
          flexShrink: '1',
          fontSize: isMobileWithTablet ? '12px' : '15px',
        }}
      />
    </figure>
  )
}

export default MediaImage;
