import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChapterRoutesWithIndex } from '../../constants'
import {Link} from 'react-router-dom'


const ChapterFooter = ({ chapterIndex=0, isMobileWithTablet=true }) => {
  const { t } = useTranslation()
  const idx = parseInt(chapterIndex, 10)
  const isLast = idx === ChapterRoutesWithIndex.length - 1
  // const isFirst = idx === 1
  // const route = ChapterRoutesWithIndex[idx]
  const nextRoute = isLast ? null : ChapterRoutesWithIndex[idx + 1]
  const previousRoute = ChapterRoutesWithIndex[idx - 1]

  return (
    <div className="flex items-center justify-center" style={{marginTop:'10vh', height: '100vh'}}>
      <div className="stepChapterWrapper tc">
        { nextRoute && (
          <>
            <h2
              className="chapterNumber sans f2-ns"
              style={{
                fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
              }}
            >
            {t('nextChapter')}
            </h2>
            <h2
              className="chapterTitle"
              style={{
                fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                marginTop: '10px',
                marginBottom: '80px',
              }}
            ><Link to={nextRoute.to}>{t(nextRoute.label)}</Link></h2>
          </>
        )}
        {idx > 1 && (
          <>
            <h2
              className="chapterNumber sans f2-ns"
              style={{
                fontSize: isMobileWithTablet ? '4.5vw' : '2.5vw',
              }}
            >
            {t('previousChapter')}
            </h2>
            <h2
              className="chapterTitle"
              style={{
                fontSize: isMobileWithTablet ? '9vw' : '4.5vw',
                marginTop: '10px',
                marginBottom: '80px',
              }}
            ><Link to={previousRoute.to}>{t(previousRoute.label)}</Link></h2>
          </>
        )}
        <div className="flex items-center justify-center ph4 mv4 mv3-ns">
          <img alt="STATEC" src="/statec-logo-blu.png" height={40} className="mr2" />
          <img alt="University of Luxembourg" src="/UNI_C2DH_blu.png" height={60} className="ml2" />
        </div>
      </div>
    </div>
  )
}

export default ChapterFooter
