import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSpring, a, config } from 'react-spring'
import { useStore } from '../store'
import { useCurrentWindowDimensions } from '../hooks'
import { getIsMobileWithTablet } from '../logic/viewport'
import { ChapterRoutes } from '../constants'
import { ArrowUpRight, ArrowDown } from 'react-feather'
import '../styles/pages/home.scss'
import Footer from '../components/Footer'
import ChapterCover from '../components/Chapter/ChapterCover'
import ChapterQrCode from '../components/Chapter/ChapterQrCode'
import { isMobile } from '../logic/viewport'

const Home = () => {
  const { t } = useTranslation()
  const { height, width } = useCurrentWindowDimensions({ isMobile })
  const [ props, apiProps ] = useSpring(() => ({
    opacity: 0,
    config: config.slow
  }))
  const isMobileWithTablet = getIsMobileWithTablet(width, height)
  const changeBackgroundColor = useStore(state => state.changeBackgroundColor)

  useEffect(() => {
    changeBackgroundColor('var(--primary)')
    apiProps.start({ opacity: 1 })
    // eslint-disable-next-line
  }, [changeBackgroundColor])

  console.debug('[Home] rendering', height)
  // {t('number', { n: 129822.4325 })}
  return (
    <div className="Home">
      <Helmet>
        <meta property="og:title" content={t('pagesHomeTitleOG')} />
        <meta property="og:description" content={t('pagesHomeDescriptionOG')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${window.location.protocol}//${window.location.host}/0.landing.jpg`} />
        <meta property="og:url" content={window.location} />
      </Helmet>
      <div className="relative w-100 with-vertical-line">
        <ChapterCover
          height={height}
          cover={{ id:'0.landing.jpg', url: '/0.landing.jpg'}}
          untitled
        />
      </div>
      <div className="absolute w-100" style={{ zIndex: 1, top: 0, height}}>
      <a.div className="mw9 center flex flex-column justify-center items-center pa4 ph5-l h-100" style={{
        opacity: props.opacity,
        height,
      }}>
        <h1 className="f2 f1-m tc mv0 serif Home_title">
          <span dangerouslySetInnerHTML={{__html: t('pagesHomeTitle')}} />
        </h1>
        <h2 className="fw1 lh-title tc mt3 Home_subheading">
          <span dangerouslySetInnerHTML={{__html: t('pagesHomeSubheading')}}/>
        </h2>
        <div
          className="fw1 lh-title tc mt5 Home_scrolldown"
        >
          Scroll down to explore <div className="Home_scrolldownIcon">
            <ArrowDown size={15}/>
          </div>
        </div>
      </a.div>
      </div>
      <div className="Home_paragraphsWrapper">
        <div className="center pa4 pt5-ns ph5-l">
          <h2 className="f2-ns f3 fw1 lh-title tc">
            {t('pagesHomeParagraph01')}
            <br />
            <br />
            {t('pagesHomeParagraph02')}
          </h2>
        </div>
      </div>
      <div className="Home_stepChapterWrapper tc">
        <div className="block mb4">
          {ChapterRoutes.map((route, i) => (
            <div key={i}>
              <h2
                className="Home_chapterTitle sans f2-ns"
                style={{
                  fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
                }}
              >
                {t('chapterNumber', { n: i + 1 })}
              </h2>
              <h2
                className="Home_chapterTitle"
                style={{
                  fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                  marginTop: '10px',
                  marginBottom: '80px',
                }}
              >
                <Link to={route.to}>{route.title}&nbsp;</Link>
                <ArrowUpRight />
              </h2>
            </div>
          ))}
        </div>

      </div>
      <Footer color="var(--secondary)" className="Home_Footer flex flex-column items-center mv4 mv3-ns"/>
      <ChapterQrCode isMobileWithTablet={isMobileWithTablet} chapterId="index" />
    </div>

  )
}
export default Home
