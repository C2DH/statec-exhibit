import React from 'react'
import { Bookmark } from 'react-feather'

const TrendHotspot = ({ x, year, text='', active, height=0, marginTop=0, marginBottom=0 }) => {
  return (
    <div className={`TrendHotspot relative ${active ? 'active' : ''}`}>
      <div className="TrendHotspot_line" style={{
        left: x,
        top: marginTop,
        height: height - marginTop - marginBottom,
      }}></div>
      <div className="TrendHotspot_point" style={{
        left: x,
        top: marginTop,
      }}>
        <Bookmark style={{position:'absolute', top:3, left:3}} size={10} color='var(--primary)'/>
      </div>
      <label style={{
        left: x
      }}>{text}</label>
    </div>
  )
}

export default React.memo(TrendHotspot)
