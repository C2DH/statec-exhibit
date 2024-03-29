import React from 'react';
import MediaIndex from '../../media/index.json'
import { getIsMobileWithTablet } from '../../logic/viewport'
import { useImage } from '../../hooks';
import MediaImagePicture from './MediaImagePicture'
import '../../styles/components/mediaImage.scss'

const MediaImage = ({
  id, to, alt, caption = '', title = '',
  preview,
  height=100,
  width=100,
  padding = 1,
  resolution = 'medium-h',
  displayTitle = false, onClick,
}) => {
  const isMobileWithTablet = getIsMobileWithTablet(width, height)
  const media = MediaIndex.images[id]
  const mediaUrl = media
    ? media.resolutions[resolution].url
    : 'https://via.placeholder.com/500.png/2b219f/ffc09d?text=...';
  const mediaBase64 = media?.base64
  const { isLoading } = useImage(mediaUrl, 50);
  const backgroundImage = `url(${isLoading ? mediaBase64 : mediaUrl})`
  const mediaCaption = [
    { text: caption || media?.caption, className: 'MediaImage_caption mt2 f6 pl2' },
    { text: media?.provenance, className:'MediaImage_provenance mt2 pl2 f7' },
    { text: media?.license, className:'MediaImage_license mt2 pl2 f7'}
  ].filter(({text}) => typeof text === 'string' && text.length)
    .map(({text, className=''}) => `<div class="${className}">${text}</div>`)
    .join('')

  const clickHandler = () => {
    if (typeof onClick === 'function') {
      onClick()
    }
  }

  let aspectRatioBoxStyle = {
    height: 0,
    width: 'auto',
    paddingTop: media ? `${1/media.aspectRatio * 100}%` : "100%"
  }

  if (media?.isPortrait) {
    const availableHeight = Math.min(height, width / media.aspectRatio)
    aspectRatioBoxStyle = {
      width: availableHeight * media.aspectRatio,
      height: availableHeight
    }
  }

  return (
    <figure
      className='MediaImage'
      style={{
        display: 'flex',
        flexDirection: 'column',
        // height: height / media.aspectRatio,// scale based on aspectRatio,
        width: '100%',
        margin: '0 auto',
      }}
    > {displayTitle && !!title.length && <h2 className="textContainerTitle">{title}</h2>}
      <div className="MediaImage_aspectRatioBox relative" style={aspectRatioBoxStyle}>
        <div className="absolute w-100 h-100 top-0 left-0" onClick={clickHandler}>
          <MediaImagePicture isLoading={isLoading} isPortrait={media?.isPortrait} aspectRatio={media?.aspectRatio} padding={padding} mediaBase64={mediaBase64} backgroundImage={backgroundImage} />
        </div>
      </div>
      <figcaption
        dangerouslySetInnerHTML={{ __html: mediaCaption }}
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
