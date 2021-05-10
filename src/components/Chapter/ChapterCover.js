import React from 'react'
import { Spring, animated } from 'react-spring'
import { useImage } from '../../hooks'
import { useTranslation } from 'react-i18next'
import {getIsMobileWithTablet} from '../../logic/viewport'
import { Loader } from 'react-feather'
import MediaIndex from '../../media/index.json'

const ChapterCover = ({ cover={}, height=0, title='', chapterIndex=0, resolution='large-h' }) => {
  const { t } = useTranslation()
  const isMobileWithTablet = getIsMobileWithTablet()
  const availableHeight = isMobileWithTablet ? 300 : height
  // get actual media file from index
  const media = MediaIndex.images[cover.id]
  const mediaUrl = media
    ? media.resolutions[resolution].url
    : cover.url;
  const { isLoading } = useImage(mediaUrl, 500)
  if (isLoading) {
    return (
      <div className="ChapterCover flex items-center justify-center" style={{
        height: availableHeight
      }}>
        <div className="loader"><Loader color="var(--secondary)"/></div>
      </div>
    )
  }
  return (
    <div className="ChapterCover" style={{
      height: availableHeight
    }}>
      <Spring
        to={{
          backgroundClipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        from={{
          backgroundClipPath:
            'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        }}
        delay={0}
      >
      {(props) => (
        <animated.div className="ChapterCover_frame"
          style={{
            clipPath: props.backgroundClipPath,
            backgroundImage: `url(${mediaUrl})`,
            opacity: props.opacity,
          }}
        />
      )}
      </Spring>
      <Spring to={{ opacity: 1 }} from={{ opacity: 0 }} >
        {(props) => (
          <div className="ChapterCover_wrapper">
            <animated.div className="ChapterCover_title" style={props}>
              <h2 className="sans mv0">
                {t('chapterNumber', { n: chapterIndex })}
              </h2>
              <h1 className="tc">
                {title}
              </h1>
            </animated.div>
          </div>
        )}
      </Spring>
      <Spring reset to={{ opacity: 1 }} from={{ opacity: 0 }} delay={500}>
        {(props) => (
          <div className="ChapterCover_figcaptionWrapper absolute" style={{ ...props}}>
            <figcaption className="ma3-l ma2-m ma1 w-100-l w-75">
              <b className="bold">Fig.</b> <em>{cover.caption}</em>{availableHeight}
              <br/>
              <div className="db-l dn">
              {t('figcaptionLabel')}&nbsp;
              <a href={cover.sourceUrl} target="_blank" rel="noopener noreferrer">
                {cover.source}
              </a>
              </div>
            </figcaption>
          </div>
        )}
      </Spring>
    </div>
  )
}

export default React.memo(ChapterCover)
