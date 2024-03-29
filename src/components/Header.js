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

  const openPanel = (name='table-of-contents') => {
    history.push({
      search: `?panel=${name}`,
      hash: window.location.hash.replace('#', ''),
    })
  }

  // CHANGE favicon and title BASED ON CURRENT CHAPTER
  useEffect(() => {
    try {
      const headLink = document.getElementsByTagName('link')[0]
      if (headLink && headLink.getAttribute('rel') === 'icon') {
        const route = ChapterRoutesWithIndex.find(d => d.to === pathname)
        if (route.title) {
          document.title = `${route.title} - Framing Luxembourg`
        } else {
          document.title = `Framing Luxembourg`
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
    <header className={`Header ph5-l ph3 ${intersectionRatio < 1 ? 'active' : ''}`} style={{
      backgroundColor,
    }}>
      <div className="Header_sideLinkWrapper w-100 flex items-center justify-space-between">
      <div className="Header_sideLink" onClick={() => openPanel('table-of-contents')}>
        <span className="db dn-ns">{t('tableOfContentsMobile')}</span>
        <span className="dn db-ns">{t('tableOfContents')}</span>
      </div>
      <div className="Header_centerLink">
        <Link to={'/'}>{t('FramingLuxembourg')}</Link>
        {currentChapter
          ? <span>&nbsp;/&nbsp;{currentChapter.title}</span>
          : null
        }
      </div>
      <div className="Header_sideLink tr" onClick={() => openPanel('about')}>
        {t('AboutTitle')}
      </div>
      </div>
    </header>
    <div ref={ref}></div>
    </>
  )
}

export default Header
