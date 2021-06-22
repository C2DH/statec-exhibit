import React from 'react'
import { useStore } from '../../store'
import {useTranslation} from 'react-i18next'

const FlowerPointerGraphics = ({ data=[], field='v', radius=10}) => {
  const { t } = useTranslation()
  const currentYear = useStore(state => state.currentYear)
  const idx = data.findIndex(d => String(currentYear) === d.t)
  // console.info('rendering FlowerPointerGraphics', currentYear, data, idx)

  if (idx === -1) {
    return null;
  }
  const angleD = (Math.PI * 2) / data.length
  const theta = (data.length - idx) * angleD + Math.PI
  const deg = theta * (180 / Math.PI)

  return (
    <g className="FlowerPointerGraphics"
      transform={`translate(${Math.sin(theta) * radius}, ${
        Math.cos(theta) * radius
      }) `}
      key={`petal-${idx}`}
    >
    <text
      style={{
        display: 'block',
        textAnchor: 'middle',
        transform: `rotate(${-deg})`,
        dominantBaseline: 'central',
        color: '#2b219f',
        fontSize: '14px',
      }}
      textAnchor="end"
      dx={Math.sin(theta) * radius * 0.5}
      dy={Math.cos(theta) * radius * 0.5}
    >
      {t('number', { n: data[idx][field] })}
    </text>
    </g>
)
}

export default React.memo(FlowerPointerGraphics)
