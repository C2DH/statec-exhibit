import React, { useEffect, useState } from 'react'
import { scaleTime } from 'd3-scale'
import { useTranslation } from 'react-i18next'
import { useOnScreen } from '../../hooks'
import { StartDate, EndDate } from '../../constants'

const scaleX = scaleTime()
  .domain([StartDate, EndDate])
  .range([0, 100]);

const ChapterHotspotsGraphics = ({ chapterNumberOfModules = 0, chapterHotspots, moduleHotspots, width, height, active }) => {
  const { t } = useTranslation()
  const [{ intersectionRatio, boundingClientRect }, ref] = useOnScreen({
    // see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API # rttreshold
    threshold:  [0, 0.01, 0.125, 0.5, 0.875, 1],
    // is not in viw anymore once it is stick
    rootMargin: '-100px 0px 0px 0px'
  })
  const [isUp, setIsUp] = useState(false)
  useEffect(() => {
    console.info('ChapterHotspotsGraphics changing counding clientrect', boundingClientRect)
    if (boundingClientRect) {
      setIsUp(boundingClientRect.top < 100)
    }
  }, [boundingClientRect])
  const totalHotspots = chapterHotspots
  // console.info('rendering ChapterHotspotsGraphics', moduleHotspots, active)
  const lineHeight = '20px'
  return <div ref={ref} className={`ChapterHotspotsGraphics ${isUp ? 'active': ''}`} style={{
    width: width * .90,
    height: 100,
    top: 0,
    marginLeft: width * .05,
    borderBottom: '1px dashed var(--secondary)',
  }}>
    <div className="ChapterHotspotsGraphics_startDate" style={{
      lineHeight, height: 25,
      // opacity: intersectionRatio === 1 || intersectionRatio < 0.125 ? 0.1 : 1,
      top: 75,
    }}>
      <span>{StartDate.year()}</span>
    </div>
    <div className="ChapterHotspotsGraphics_endDate" style={{
      lineHeight, height: 25,
      top: 75,
      // opacity: intersectionRatio === 1 || intersectionRatio < 0.125 ? 0 : 1
    }}>
      <span>{EndDate.year()}</span>
    </div>
    <div className="tc ChapterHotspotsGraphics_legend" style={{color: 'var(--secondary)'}} dangerouslySetInnerHTML={{
      __html: t('chapterHotspotsGraphicsLegend', {
        totalHotspots,
        chapterNumberOfModules,
      })
    }} />
    {chapterHotspots.map((d, i) => {
      const x = scaleX(new Date(`${d[0]}-01-01`))
      const size = 5 + (3.14 * d[1])
      return (<div key={i} className="ChapterHotspotsGraphics_hotspot" style={{
        position: 'absolute',
        left: `${x}%`,
        width: size,
        height: size,
        top: 100,
        marginLeft: -size/2,
        marginTop: -size/2,
        borderRadius: size,
        transform: 'scale(2)',
        transitionDelay: `${Math.random()}s`
        // transform: `translateY(${
        //   intersectionRatio < 0.125
        //     ? height
        //     : intersectionRatio > 0.875
        //       ?  -height
        //       : 0
        // }px)`,
        // transitionDelay: `${Math.random()}s`
      }}></div>)
    })}
  </div>
}

export default React.memo(ChapterHotspotsGraphics)
