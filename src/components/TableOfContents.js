import React from 'react'
import { ChapterRoutes } from '../constants'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TableOfContents = () => {
  const { t } = useTranslation()
  return (
    <div className="TableOfContents">
      <Link to="/">{t('Home')}</Link>
      {ChapterRoutes.map((route, i) => (
        <Link to={route.to} key={i}>
          <div className=" tl menu-title">{t('chapterNumber', { n: i + 1 })}</div>
          <span>{t(route.label)}</span>
        </Link>
      ))}
      <Link to="/?panel=about">{t('AboutTitle')}</Link>
    </div>
  )
}
export default TableOfContents
