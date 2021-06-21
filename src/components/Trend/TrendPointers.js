import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {ArrowRight, Eye} from 'react-feather'
import { useStore } from '../../store'
import { getClosestDatumIdxFromX } from '../../logic/dataset'


const TrendPointers = ({
  themeDatasetId='themeDatasetId',
  values=[],
  focusKeys=[],
  visibleKeys=[],
  scaleX, scaleY,
  marginLeft=0, left=0, marginTop=0, top=0,
  height=100,
  width=100,
  children,
  // paragraph from and to, if any
  from,
  to,
}) => {
  const { t } = useTranslation()
  const {changeCurrentDatum, currentYearExplorerOpen } = useStore(state => state)
  const [pointer, setPointer] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const updateMousePosition = (ev) => {
    if (!ev) {
      return
    }
    setPointer({
      x: ev.clientX - left - marginLeft,
      y: ev.clientY - top - marginTop,
    })
  }

  const focusValuesExtents = useMemo(() => {
    return focusKeys.map((k) => {
      let kMin = Infinity
      let kMax = -Infinity
      let vMin
      let vMax
      for (let i = 0, l=values.length; i < l; i += 1) {
        const d = values[i]
        if (d.t >= from && d.t <= to) {
          if (d[k] < kMin) {
            kMin = d[k]
            vMin = d
          }
          if (d[k] > kMax) {
            kMax = d[k]
            vMax = d
          }
        }
      }
      return { kMin, kMax, vMin, vMax }
    })
  }, [values, from, to, focusKeys])

  const xValues = useMemo(() => values.map(v => v.x), [values])

  const currentYear = pointer ? scaleX.invert(pointer.x).getFullYear() : from

  let value = values.find(d => String(currentYear) === d.t)
  if (pointer && !value) {
    // look for the closer one
    const closestIdx = getClosestDatumIdxFromX({
      x: pointer.x,
      xValues,
    })
    value = values[closestIdx]
  }

  // useEffect(() => {
  //   window.addEventListener("mousemove", updateMousePosition);
  //   return () => window.removeEventListener("mousemove", updateMousePosition);
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (currentYearExplorerOpen && currentYear && value) {
      changeCurrentDatum({
        datum: value,
        year: value.t,
        dataset: themeDatasetId,
        keys: visibleKeys,
        focusKeys
      })
    }
  }, [changeCurrentDatum, focusKeys, visibleKeys, themeDatasetId, value, currentYearExplorerOpen, currentYear])

  if (!pointer && !from) {
    // nothing to visualize...
    return null
  }

  const clickHandler = () => {
    changeCurrentDatum({
      datum: value,
      year: value.t,
      dataset: themeDatasetId,
      keys: visibleKeys,
      focusKeys
    })
  }

  // console.info(value)
  //
  return (
    <div
      className="TrendPointersGraphics absolute"
      style={{
        height,
        width,
      }}
    >
      <div className="absolute" style={{
        top: marginTop,
        height: height-marginTop,
        left: marginLeft,
        width: width-marginLeft,
        zIndex:1000,
      }}
        onClick={clickHandler}
        onMouseMove={updateMousePosition}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      <div className="TrendLegend absolute" style={{
        position: 'absolute',
        width: 50,
        top: 2,
        marginLeft: -25,
        textAlign: 'center',
        opacity: isVisible && value ? 1 : 0,
        transform: value ? `translate(${value.x + marginLeft}px, 0px)` : null,
      }}>
        <div style={{
          position: 'absolute',
          width: 1,
          left: 25,
          top: marginTop + 2,
          bottom: marginTop * 2,
          backgroundColor: 'var(--accent)'
        }}/>
        <span className="pv1 ph2" style={{
          color: 'var(--primary)',
          borderRadius: 2,
          backgroundColor:'var(--secondary)'
        }}>{currentYear}</span>
      </div>

      {value && isVisible ? visibleKeys.map((key) => {
        const isOnFocus = focusKeys.includes(key)
        const radius = isOnFocus ? 12 : 6

        return (
          <div className="TrendPointers_valuePoint" key={key} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: radius,
            height: radius,
            marginLeft: -radius/2,
            marginTop: -radius/2,
            borderRadius: radius,
            // border: isOnFocus
            //   ? '2px solid var(--secondary)'
            //   : '1px solid var(--secondary)',
            backgroundColor: isOnFocus ? `var(--secondary)`: `var(--data-background)`,
            transform: `translate(${value.x + marginLeft}px, ${value.ys[key] + marginTop}px)`
          }}/>
        )
      }) : null}

      <div className="absolute" style={{
        top: height,
        left: marginLeft,
      }}>
        <div className="TrendPointers_focusKeys flex">
          <div>
            <div className="ba pl2 pr2 pb1 pt1 br2 mr2 inline-flex items-center">
              <Eye size={14}/>
              <span className="ml1 mr1">{from}</span>
              <ArrowRight size={14}/>
              <span className="ml1 mr1">{to}</span>
            </div>
          </div>
          {focusKeys.map((key, i) => {
          //   focusValuesExtents[i].kMax in
          // }
            return (
              <div key={key}>
                <h3 className="dib ma0">{t(`dataset${themeDatasetId}LegendValue${key}`, {from, to})}</h3>
                <p className="mv0 " key={key} dangerouslySetInnerHTML={{
                  __html: t(`dataset${themeDatasetId}Extent${key}`, {
                    kMin: focusValuesExtents[i].kMin,
                    kMax: focusValuesExtents[i].kMax,
                    tMin: focusValuesExtents[i].vMin?.t,
                    tMax: focusValuesExtents[i].vMax?.t,
                  })
                }} />
              </div>
          )
        })}

        </div>
        {children}
      </div>
      <div className="TrendPointers_legend_keywrapper absolute top-0 left-0" style={{
        overflow: 'hidden',
        right: -10,
        bottom: 0,
      }}>
      {value && visibleKeys.length > 1
        ? visibleKeys.map((key) => {

          return (
            <div className="TrendPointers_legend_key ml2 absolute flex items-end justify-between w100" key={key} style={{
              transform: `translate(${value.x + marginLeft}px, ${value.ys[key] + marginTop}px)`,
              top: 0,
              marginTop: -10,
            }}>
              <div>{t(`dataset${themeDatasetId}LegendValue${key}`)}</div>
              <div className="tr ml2">{t('number', { n: value[key] })}</div>
            </div>
          )
        })
        : null
      }
      </div>
      <div className="TrendPointers_legend absolute pa3" style={{
        top: 0,
        display: value ? 'block' : 'none',
        opacity: isVisible && value ? 1: 0,
        transform: value
          ? `translate(${value.x + marginLeft}px, ${height - marginTop}px)`
          : `translate(${marginLeft}px, ${height- marginTop}px)`,
      }}>

      {value
        ? focusKeys.map((key) => (
            <div className="TrendPointers_legend_key flex items-end justify-between w100" key={key}>
              <div>{t(`dataset${themeDatasetId}LegendValue${key}`)}</div>
              <div className="tr ml2" style={{
                color: 'var(--white)'
              }}>{t('number', { n: value[key] })}</div>
            </div>
          ))
        : null
      }
      </div>
    </div>
  )
}

export default TrendPointers
