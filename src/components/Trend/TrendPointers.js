import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'


const TrendPointers = ({
  values=[],focusKeys=['v'],
  visibleKeys=[{ key:'v', isVisible: true}],
  scaleX, scaleY,
  marginLeft=0, left=0, marginTop=0, top=0,
  height=100,
  width=100
}) => {
  const { t } = useTranslation()
  const [pointer, setPointer] = useState()
  const updateMousePosition = (ev) => {
    if (!ev) {
      return
    }
    setPointer({
      x: ev.clientX - left - marginLeft,
      y: ev.clientY - top - marginTop,
    })
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
    // eslint-disable-next-line
  }, []);
  if (!pointer) {
    return null
  }
  const currentYear = scaleX.invert(pointer.x - left).getFullYear()
  const value = values.find(d => String(currentYear) === d.t)
  // console.info(value)
  if (!value) {
    return null
  }
  return (
    <div
      className="TrendPointersGraphics absolute" style={{
        height,
        width,
      }}
    >
      <div className="TrendLegend absolute" style={{
        position: 'absolute',
        width: 50,
        top: 10,
        marginLeft: -25,
        textAlign: 'center',
        transform: `translate(${value.x + marginLeft}px, 0px)`,
      }}>
        <div style={{
          position: 'absolute',
          width: 1,
          left: 25,
          top: marginTop,
          bottom: marginTop * 2,
          backgroundColor: 'var(--accent)'
        }}/>
        <span className="pv1 ph2" style={{
          color: 'var(--primary)',
          borderRadius: 2,
          backgroundColor:'var(--secondary)'
        }}>{currentYear}</span>
      </div>

      {visibleKeys.sort((a,b) => {
        return focusKeys.includes(a.key)
          ? -1
          : a.isVisible
            ? 0
            : 1
      }).map(({key, isVisible}) => {
        const isOnFocus = focusKeys.includes(key)
        const radius = isOnFocus ? 12 : 6

        return (
          <div key={key} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: radius,
            height: radius,
            marginLeft: -radius/2,
            marginTop: -radius/2,
            borderRadius: radius,
            border: isOnFocus
              ? '2px solid var(--secondary)'
              : '1px solid var(--secondary)',
            backgroundColor: isOnFocus ? `var(--primary)`: `var(--data-background)`,
            transform: `translate(${value.x + marginLeft}px, ${value.ys[key] + marginTop}px)`
          }}/>
        )
      })}

      <div className="absolute" style={{
        bottom: 0,
        left: marginLeft,
      }}>
      {visibleKeys.map(({key}) => (
        <span key={key} dangerouslySetInnerHTML={{
          __html: t(`datasetGlobalBalanceDetailsLegendValue${key}`, {
            v: value[key]
          })
        }} />
      ))}

      <span dangerouslySetInnerHTML={{
        __html: t('datasetGlobalBalanceDetailsLegend', {
          values: t('datasetGlobalBalanceDetailsLegendValues', value.ys),
          year: currentYear
        })
      }}/>
      </div>
    </div>
  )
}

export default TrendPointers
