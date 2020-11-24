import React from 'react'
import { Spring, animated } from 'react-spring/renderprops';
import { isMobileWithTablet } from '../../constants';


const ChapterCoverGraphics = ({
  backgroundColor,
  theme,
  chapterIndex
}) => {
  return <div className="chapterCover">
    <div
      className="chapterFrameWrapper"
      style={{
        backgroundColor,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        position: 'absolute',
      }}
    >
      <Spring
        to={{
          backgroundClipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        from={{
          backgroundClipPath:
            'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        }}

      >
        {(props) => (
          <animated.div
            className="chapterFrame"
            style={{
              // transition: 'clip-path .5s ease-in-out',
              clipPath: props.backgroundClipPath,
            }}
          >
            <div
              className="bg"
              style={{
                // willChange: 'transform',
                backgroundImage: `url(${theme.cover.url})`,
              }}
            />
          </animated.div>
        )}
      </Spring>
      <div className="chapterCoverWrapper withCover">
        <div className="section-small">
          <h2
            className="sans mv0"
            style={{
              fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
            }}
          >{`Chapter ${chapterIndex}`}</h2>
          <h1
            className="tc"
            style={{
              fontSize: '8vw',
              marginTop: '10px',
              marginBottom: '80px',
            }}
          >
            {theme.title}
          </h1>
        </div>
      </div>
    </div>
  </div>
}

export default ChapterCoverGraphics
