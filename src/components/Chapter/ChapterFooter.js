import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChapterRoutes } from '../../constants'
import {Link} from 'react-router-dom'


const ChapterFooter = ({ chapterIndex }) => {
  const { t } = useTranslation()
  const idx = parseInt(chapterIndex, 10)
  const isLast = idx === ChapterRoutes.length - 1
  const isFirst = idx === 1
  const route = ChapterRoutes[idx]
  const nextRoute = isLast ? null : ChapterRoutes[idx + 1]
  const previousRoute = ChapterRoutes[idx - 1]

  return (
    <div className="flex items-center justify-center" style={{marginTop:'50vh', height: '100vh'}}>
      <div className="tc">
        and that's all for today!
        {isLast && <p>'isLast'</p>}
        {isFirst && <p>'isFirst'</p>}
        <h3>{t(route.label)}</h3>
        { nextRoute && <p> <Link to={nextRoute.to}>{t(nextRoute.label)}</Link></p>}

        or back to
        <p> <Link to={previousRoute.to}>{t(previousRoute.label)}</Link></p>
        <div className="flex items-center justify-center ph4 mv4 mv3-ns">
          <img alt="STATEC" src="/statec-logo-blu.png" height={40} className="mr2" />with
          <img alt="University of Luxembourg" src="/UNI_C2DH_blu.png" height={60} className="ml2" />
        </div>
      </div>
    </div>
  )
}

export default ChapterFooter
