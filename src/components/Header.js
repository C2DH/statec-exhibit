import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { useTranslation } from 'react-i18next'
import { useOnScreen } from '../hooks'
import '../styles/components/header.scss'

const Header = () => {
  const { t } = useTranslation()
  const [{ intersectionRatio }, ref] = useOnScreen()
  const backgroundColor = useStore(state => state.backgroundColor)

  return (
    <>
    <header className={`Header pl2 pr2 pl5-l pr5-l pl4-m pr4-m ${intersectionRatio < 1 ? 'active' : ''}`} style={{
      backgroundColor,
    }}>
      <div className="Header_sideLinkWrapper w-100 flex items-center justify-space-between">
      <div className="Header_sideLink db dn-ns">
        {t('tableOfContentsMobile')}
      </div>
      <div className="Header_sideLink dn db-ns">
        {t('tableOfContents')}
      </div>
      <div>
        <Link to={'/'}>{t('FramingLuxembourg')}</Link>
      </div>
      <div className="Header_sideLink tr">
        {t('AboutTitle')}
      </div>
      </div>
    </header>
    <div ref={ref}></div>
    </>
  )
}

export default Header
