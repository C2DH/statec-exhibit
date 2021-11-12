import React from 'react'
import { useTranslation } from 'react-i18next'


const TrendTooltip = ({
  datasetId='',
  marginLeft=0,
  marginTop=0,
  availableWidth=0,
  availableHeight=0,
  isVisible=false,
  value=null,
  className='',
  numericTranslationLabel='number',
  keys=[],
  // dict of {key:color}
  colors={}
}) => {
  const { t } = useTranslation()
  if(!value) {
    return null
  }
  return (
    <div className={`TrendTooltip ${className}`} style={{
      top: 0,
      display: value ? 'block' : 'none',
      opacity: isVisible && value ? 1: 0,
      transform: `translate(${Math.min(value.x + marginLeft, availableWidth - 125)}px, ${availableHeight - marginTop}px)`
    }}>
    {keys.map((key) => (
      <div className="TrendPointers_legend_key w100" key={key}>
        <div className="flex items-end justify-between w100">
          <div>
            {colors[key]
              ? (<span className="TrendPointers_legend_key_circle" style={{
                backgroundColor: colors[key]
              }}></span>)
              : null
            }
            {t(`dataset${datasetId}LegendValue${key}`)}
          </div>
          <div className="tr ml2" style={{
            color: 'var(--white)'
          }}>{t(numericTranslationLabel, { n: value[key] })}</div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default TrendTooltip
