import React from 'react'
import { ChapterRoutes } from '../constants'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import ChapterStructure from './Chapter/ChapterStructure'


const TableOfContents = ({ color='white' }) => {
  const { t } = useTranslation()
  const currentChapterStructure = useStore(store => store.currentChapterStructure)
  return (
    <div className="TableOfContents h-100 pa2 pa5-l pa4-m">
      <Link to="/" className="db mb4" style={{color}} replace>{t('ChapterRouteIndex')}</Link>
      {ChapterRoutes.map((route, i) => (
        <React.Fragment key={i}>
        <Link className="no-underline" style={{color}} to={route.to}  replace>
          <div className="tl menu-title underline" >{t('chapterNumber', { n: i + 1 })}</div>
          <h1 className="ma0 pa0 mb4 f3 f2-m f1-l" style={{color}}>{t(route.label)}</h1>
        </Link>
        {route.to === '/' + currentChapterStructure?.chapterId
          ? <ChapterStructure structure={currentChapterStructure} color={color}/>
        :null}
        {route.to}
        </React.Fragment>
      ))}
      <Link className="db " style={{color}} to="/?panel=about" replace>{t('AboutTitle')}</Link>
    </div>
  )
}
export default TableOfContents
