import React from 'react'
import { ChapterRoutes } from '../constants'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TableOfContents = ({ color='white' }) => {
  const { t } = useTranslation()
  return (
    <div className="TableOfContents h-100 pa2 pa5-l pa4-m">
      <Link to="/" className="db mb4" style={{color}} replace>{t('Home')}</Link>
      {ChapterRoutes.map((route, i) => (
        <Link className="no-underline" style={{color}} to={route.to} key={i} replace>
          <div className="tl menu-title underline" >{t('chapterNumber', { n: i + 1 })}</div>
          <h1 className="ma0 pa0 mb4 f3 f2-m f1-l" style={{color}}>{t(route.label)}</h1>
        </Link>
      ))}
      <Link className="db " style={{color}} to="/?panel=about" replace>{t('AboutTitle')}</Link>
    </div>
  )
}
export default TableOfContents
