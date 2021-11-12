import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {ArrowRight, Eye} from 'react-feather'
import { useStore } from '../../store'
import { getClosestDatumIdxFromX } from '../../logic/dataset'
import TrendTooltip from './TrendTooltip'

const TrendPointers = ({
  themeDatasetId='themeDatasetId',
  hotspots=[],
  values=[],
  focusKeys=[],
  visibleKeys=[],
  colorKeys={},
  scaleX, scaleY,
  marginLeft=0, left=0, marginTop=0, top=0,
  height=100,
  width=100,
  children,
  // paragraph from and to, if any
  from,
  to,
  numericTranslationLabel,
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
  // get hotspot at value
  const hotspot = value ? hotspots.find(d => String(value.t) === String(d.t)) : null

  useEffect(() => {
    if (currentYear && value) {
      changeCurrentDatum({
        datum: value,
        hotspot: hotspot,
        year: value.t,
        dataset: themeDatasetId,
        keys: visibleKeys,
        focusKeys
      })
    }
  }, [changeCurrentDatum, focusKeys, visibleKeys, themeDatasetId, value, currentYearExplorerOpen, currentYear, hotspot])

  if (!pointer && !from) {
    // nothing to visualize...
    return null
  }

  const clickHandler = () => {
    changeCurrentDatum({
      currentYearExplorerOpen: true,
      datum: value,
      hotspot: hotspot,
      year: value?.t,
      dataset: themeDatasetId,
      keys: visibleKeys,
      focusKeys
    })
  }

  const mouseLeaveHandler = () => {
      // changeCurrentDatum({
      //   datum: null,
      //   year: null,
      //   dataset: null,
      //   keys: [],
      //   focusKeys: [],
      // })
     setIsVisible(false)
  }

  // console.info(value)
  //
  return (
    <div className="TrendPointers absolute"
      style={{
        height,
        width,
      }}
    >
      <div className="absolute" style={{
        top: 0 ,//marginTop,
        height: height-marginTop,
        left: marginLeft,
        width: width-marginLeft,
        zIndex:1000,
      }}
        onClick={clickHandler}
        onMouseMove={updateMousePosition}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={mouseLeaveHandler}
      />
      {value ? (
        <div className="TrendLegend absolute" style={{
        position: 'absolute',
        width: 50,
        top: 2,
        marginLeft: -25,
        textAlign: 'center',
        opacity: isVisible && value ? 1 : 0,
        transform: value ? `translate(${value.x + marginLeft}px, 0px)` : null,
      }}>

        <span className="pv1 ph2" style={{
          color: 'var(--primary)',
          borderRadius: 2,
          backgroundColor:'var(--secondary)'
        }}>{value.t}</span>
      </div>
    ): null}
      {value && isVisible ? visibleKeys.map((key) => {
        const isOnFocus = focusKeys.includes(key)
        const radius = isOnFocus ? 12 : 6
        const backgroundColor = isOnFocus
          ? colorKeys[key]
            ? colorKeys[key]
            : 'var(--secondary)'
          : `var(--data-background)`

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
            backgroundColor,
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
              <div key={key} className="ml3">
                <h3 className="dib ma0 bb mb2" style={{
                  color: colorKeys[key],
                  borderColor: colorKeys[key],
                  borderWidth: 2
                }}>{t(`dataset${themeDatasetId}LegendValue${key}`, {from, to})}</h3>
                {focusValuesExtents[i].vMin !== Math.Infinity
                ? (<p className="mv0" key={key} dangerouslySetInnerHTML={{
                    __html: t(`dataset${themeDatasetId}Extent${key}`, {
                      kMin: focusValuesExtents[i].kMin,
                      kMax: focusValuesExtents[i].kMax,
                      tMin: focusValuesExtents[i].vMin?.t,
                      tMax: focusValuesExtents[i].vMax?.t,
                    })
                }} />):null}
              </div>
          )
        })}

        </div>
        {children}
      </div>
      <TrendTooltip
        className="TrendPointers_legend absolute pa3"
        datasetId={themeDatasetId}
        marginLeft={marginLeft}
        marginTop={marginTop}
        availableWidth={width}
        availableHeight={height}
        isVisible={isVisible}
        value={value}
        keys={focusKeys}
        numericTranslationLabel={numericTranslationLabel}
        // dict of {key:color}
        colors={colorKeys}
      />
    </div>
  )
}

export default TrendPointers
