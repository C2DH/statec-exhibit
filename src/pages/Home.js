import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSpring, a } from 'react-spring'
import { useStore } from '../store'
import { useCurrentWindowDimensions, useImage } from '../hooks'
import { getIsMobileWithTablet } from '../logic/viewport'
import { ChapterRoutes } from '../constants'
import { ArrowUpRight } from 'react-feather'
import '../styles/pages/home.scss'


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
      <a.div className="mw9 center pa4 ph5-l" style={{
        opacity: props.opacity,
        minHeight: props.height,
      }}>
        <h1 className="f2 f1-m tc mv0">
          <span
            style={{
              color: 'var(--secondary)',
              fontSize: isMobileWithTablet ? '16vw' : '8vw',
            }}
          >
            {height}, {width}
            {t('pagesHomeTitle')}
          </span>
        </h1>
        <h2 className="fw1 lh-title tc mt3" style={{
          fontSize: isMobileWithTablet ? '4vw' : '2vw'
        }}>
          <span>{t('pagesHomeSubheading')}</span>
        </h2>
        <div
          className="fw1 lh-title tc mt5"
          style={{
            color: 'var(--secondary)',
            fontSize: isMobileWithTablet ? '1vw' : '1.5vw',
          }}
        >
          Scroll down to explore ↓{' '}
        </div>
      </a.div>
      <div className="Home_paragraphsWrapper">
        <div className="mw9 center pa4 pt5-ns ph5-l">
          <h2 className="f2-ns f3 fw1 lh-title tc">
            {t('pagesHomeParagraph01')}
            <br />
            <br />
            {t('pagesHomeParagraph02')}
          </h2>
        </div>
      </div>
      <div className="Home_stepChapterWrapper">
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
                <Link to={route.to}>{t(route.label)}&nbsp;</Link>
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
    </div>

  )
}
export default Home
