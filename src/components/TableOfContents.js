import React from 'react'
import { ChapterRoutes } from '../constants'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TableOfContents = ({ color='white' }) => {
  const { t } = useTranslation()
  return (
    <div className="TableOfContents pb5">
      <Link to="/" className="db " style={{color}} replace>{t('ChapterRouteIndex')}</Link>
      {ChapterRoutes.map((route, i) => (
        <section className="mt4" key={i}>
        <Link className="no-underline" style={{color}} to={route.to}  replace>
          <div className="tl menu-title underline" >{t('chapterNumber', { n: i + 1 })}</div>
          <h1 className="ma0 pa0 mb0 f3 f2-m f1-l" style={{color}}>{route.title}</h1>
        </Link>
        {Array.isArray(route.sections)
          ? <ol className="mv0">
            {route.sections.map((section, i) => (
              <li key={i} className="dib" style={{color}}>
                <Link to={`${route.to}#p${i+1}.1`} style={{color}}>
                  {i+1}. {section}
                </Link>&nbsp;&nbsp;&nbsp;
              </li>
            ))}
          </ol>
        :null}
        </section>
      ))}
      <Link className="db mt4" style={{color}} to="/?panel=about" replace>{t('AboutTitle')}</Link>
    </div>
  )
}
export default TableOfContents
