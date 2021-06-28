import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStore } from '../store'
import { useTranslation } from 'react-i18next'
import { useOnScreen } from '../hooks'
import '../styles/components/header.scss'
import { ChapterRoutes, ChapterRoutesWithIndex } from '../constants'


const Header = () => {
  const { t } = useTranslation()
  const [{ intersectionRatio }, ref] = useOnScreen()
  const backgroundColor = useStore(state => state.backgroundColor)
  const history = useHistory()
  const pathname = history.location.pathname
  const currentChapter = ChapterRoutes.find(d => d.to === pathname)
  // CHANGE favicon and title BASED ON CURRENT CHAPTER
  useEffect(() => {
    try {
      const headLink = document.getElementsByTagName('link')[0]
      if (headLink && headLink.getAttribute('rel') === 'icon') {
        const route = ChapterRoutesWithIndex.find(d => d.to === pathname)
        if (route.title) {
          document.title = `${route.title} - Framing Luxembourg`
        }
        if (route.favicon) {
          headLink.href = route.favicon
        }
      }
    } catch(e) {
      console.warn('Cannot change HEAD elements...', e)
    }
  }, [pathname])


  return (
    <>
    <header className={`Header pl2 pr2 pl5-l pr5-l pl4-m pr4-m ${intersectionRatio < 1 ? 'active' : ''}`} style={{
      backgroundColor,
    }}>
      <div className="Header_sideLinkWrapper w-100 flex items-center justify-space-between">
      <div className="Header_sideLink" onClick={() => history.push({
        search: '?panel=table-of-contents',
        hash: window.location.hash.replace('#', ''),
      })}>
        <span className="db dn-ns">{t('tableOfContentsMobile')}</span>
        <span className="dn db-ns">{t('tableOfContents')}</span>
      </div>
      <div>
        <Link to={'/'}>{t('FramingLuxembourg')}</Link>
        {currentChapter
          ? <span>&nbsp;/&nbsp;{t(currentChapter.label)}</span>
          : null
        }
      </div>
      <div className="Header_sideLink tr" onClick={() => history.push({
        search: '?panel=about',
        hash: window.location.hash.replace('#', '')
      })}>
        {t('AboutTitle')}
      </div>
      </div>
    </header>
    <div ref={ref}></div>
    </>
  )
}

export default Header
