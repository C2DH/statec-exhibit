import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStore } from '../store'
import { useTranslation } from 'react-i18next'
import { useOnScreen } from '../hooks'
import '../styles/components/header.scss'

const Header = () => {
  const { t } = useTranslation()
  const [{ intersectionRatio }, ref] = useOnScreen()
  const backgroundColor = useStore(state => state.backgroundColor)
  const history = useHistory()

  return (
    <>
    <header className={`Header pl2 pr2 pl5-l pr5-l pl4-m pr4-m ${intersectionRatio < 1 ? 'active' : ''}`} style={{
      backgroundColor,
    }}>
      <div className="Header_sideLinkWrapper w-100 flex items-center justify-space-between">
      <div className="Header_sideLink" onClick={() => history.push({ search: '?panel=table-of-contents' })}>
        <span className="db dn-ns">{t('tableOfContentsMobile')}</span>
        <span className="dn db-ns">{t('tableOfContents')}</span>
      </div>
      <div>
        <Link to={'/'}>{t('FramingLuxembourg')}</Link>
      </div>
      <div className="Header_sideLink tr" onClick={() => history.push({ search: '?panel=about' })}>
        {t('AboutTitle')}
      </div>
      </div>
    </header>
    <div ref={ref}></div>
    </>
  )
}

export default Header
