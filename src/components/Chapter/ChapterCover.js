import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useTranslation } from 'react-i18next'
import { isMobileWithTablet } from '../../constants'


const ChapterCover = ({ cover, title='', chapterIndex=0 }) => {
  const { t } = useTranslation()
  return (
    <div className="chapterCover">
      <div className="chapterFrameWrapper absolute w-100" style={{
        height: window.innerHeight, zIndex: 1
      }}>
      {isMobileWithTablet ? (
        <Spring reset
          to={{
            backgroundClipPath:
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
          from={{
            backgroundClipPath:
              'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
          }}
          delay={1000}
        >
          {(props) => (
            <animated.div className="chapterBg"
              style={{
                clipPath: props.backgroundClipPath,
                backgroundImage: `url(${cover.url})`,
                opacity: props.opacity,
              }}
            />
          )}
        </Spring>
      ) : (
        <Spring reset
          to={{
            backgroundClipPath:
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
          from={{
            backgroundClipPath:
              'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
          }}
          delay={1000}
        >
          {(props) => (
            <animated.div
              className="chapterFrame"
              style={{
                clipPath: props.backgroundClipPath,
              }}
            >
              <img alt="cover" src={cover.url} />
            </animated.div>
          )}
        </Spring>
      )}
      <Spring reset to={{ opacity: 1 }} from={{ opacity: 0 }} delay={200}>
        {(props) => (
          <div className="chapterCoverWrapper withCover">
            <animated.div className="section-small" style={props}>
              <h2 className="sans mv0" style={{
                fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
              }}>
                {t('chapterNumber', { n: chapterIndex })}
              </h2>
              <h1 className="tc" style={{
                  fontSize: isMobileWithTablet ? '16vw' : '8vw',
                  marginTop: '10px',
                  marginBottom: '80px',
              }}>
                {title}
              </h1>
            </animated.div>
          </div>
        )}
      </Spring>
      </div>
    </div>
  )
}

export default ChapterCover
