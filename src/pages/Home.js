import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSpring, a } from 'react-spring'
import { useStore } from '../store'
import { useCurrentWindowDimensions, useImage } from '../hooks'
import { getIsMobileWithTablet } from '../logic/viewport'
import { ChapterRoutes } from '../constants'
import { ArrowUpRight, ArrowDown } from 'react-feather'
import '../styles/pages/home.scss'
import ChapterCover from '../components/Chapter/ChapterCover'
import ChapterQrCode from '../components/Chapter/ChapterQrCode'

const Home = () => {
  const { t } = useTranslation()
  const { height, width } = useCurrentWindowDimensions()
  const [ props, setProps ] = useSpring(() => ({ opacity: 0, height, config: { mass: 1, tension: 50, friction: 10 } }))
  const { isLoading } = useImage('/0.landing.jpg', 50);
  const isMobileWithTablet = getIsMobileWithTablet(width, height)
  const changeBackgroundColor = useStore(state => state.changeBackgroundColor)

  useEffect(() => {
    changeBackgroundColor('var(--primary)')
  }, [changeBackgroundColor])

  useEffect(() => {
    if (!isLoading) {
      setProps({ opacity: 1 })
    }
    // eslint-disable-next-line
  }, [ isLoading ])

  useEffect(() => {
    setProps({ height })
    // eslint-disable-next-line
  }, [ height ])
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
      <div className="absolute w-100 with-vertical-line" style={{zIndex: -1}}>
      <ChapterCover height={isMobileWithTablet ? 600: height} cover={{ id: '0.landing.jpg'}} untitled/>
      </div>
      <a.div className="mw9 center flex flex-column justify-center items-center pa4 ph5-l" style={{
        opacity: props.opacity,
        height: props.height,
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
          Scroll down to explore <ArrowDown />{' '}
        </div>
      </a.div>
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
        <div className="flex items-center justify-center ph4 mv4 mv3-ns">
          <img
            src="/statec-logo-blu.png"
            alt="STATEC"
            height={40}
            className="mr2"
          />
          <img
            src="/UNI_C2DH_blu.png"
            alt="Luxembourg Centre for Contemporary and Digital History - University of Luxembourg"
            height={40}
            className="ml2"
          />
        </div>
      </div>
      <ChapterQrCode isMobileWithTablet={isMobileWithTablet} chapterId="index" />
    </div>

  )
}
export default Home
