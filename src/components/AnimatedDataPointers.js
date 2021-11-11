import React from 'react'
import { animated } from 'react-spring'
import { useTranslation } from 'react-i18next'


const AnimatedPointers = ({
  availableWidth=100,
  tooltipSize=100,
  offsetTop=0, offsetLeft=0,
  data=[],
  closestIdx=0,
  color = 'var(--secondary)',
  numericTranslationLabel='number'
}) => {
  const { t } = useTranslation()
  if (!data.length || !data[0]) {
    return null
  }
  return (
    <>
    {data[0].values[closestIdx] ? (
    <label className="AnimatedPointers_t absolute tc top-0 left-0" style={{
      transform: `translate(${data[0].values[closestIdx].x + offsetLeft}px,0px)`,
      marginLeft: -25,
      width: 50,
      zIndex: 1000,
    }}>
      <span className="pa1" style={{
        backgroundColor: color,
        fontSize : 12,
        color: 'var(--primary)',
        borderRadius: 4
      }}>{data[0].values[closestIdx].t}</span>
    </label>
  ): null}
    {data.map((d, i) => {
      if(!d.values[closestIdx]) {
        return null
      }
      const xMax = Math.min(d.values[closestIdx].x + offsetLeft, availableWidth - tooltipSize)
      return (
        <div key={d.key} className="AnimatedPointers absolute top-0 left-0">

          <div className="absolute top-0 left-0" style={{
            transform: `translate(${d.values[closestIdx].x + offsetLeft}px, ${d.values[closestIdx].y + offsetTop}px)`,
            width: 10,
            height: 10,
            borderRadius: 10,
            border: "1px solid var(--secondary)",

            marginLeft:-5,
            marginTop: -5,
            backgroundColor: d.color,
          }}>
          </div>
          <div className="absolute" style={{
            pointerEvents: 'none',
            transform: `translate(${xMax}px, ${d.values[closestIdx].y + offsetTop}px)`,
            maxWidth: tooltipSize,
            marginLeft: 5,
          }}>
          <span className="pa1" style={{
            backgroundColor: d.color,
            fontSize : 12,
            color: 'var(--white)',
            borderRadius: 4,
            border: "1px solid var(--secondary)",
            
          }}>{d.values[closestIdx][d.key] === null ? '(NA)' : t(numericTranslationLabel, { n: d.values[closestIdx][d.key]})}</span>
          </div>
        </div>
      )
    })}
    </>
  )
}

export default animated(AnimatedPointers)
