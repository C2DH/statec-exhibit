import React from 'react'
import moment from 'moment'
import TrendHotspot from './TrendHotspot'
import { useStore } from '../../store'

const TrendHotspots = ({
  hotspots = [],
  windowDimensions,
  values=[],
  focusKeys=[],
  scaleX,
  height=100,
  marginLeft=100,
  marginRight=50,
  marginTop=30,
  marginBottom=50,
  displayPoint=false,
}) => {
  const currentYear = useStore(state => state.currentYear)
  // current hotspot is taken from the store.
  // It has been added there by TrendPointers component.
  return (
    <div className="TrendHotspots absolute" style={{
      left: marginLeft,
      right: marginRight,
      top: 0,
      height: height - marginTop - marginBottom,
    }}>
      {hotspots.map((d, i) => {
        let value = values.find(v => String(v.t) === String(d.t))
        let isActive = false
        if (!value) {
          value = {
            x: scaleX(moment(String(d.t), 'YYYY').startOf('year')),
          }
        } else {
          isActive = String(currentYear) === String(d.t)
        }
        return (
          <TrendHotspot x={value.x}
            text={d.title || d.text}
            year={d.t}
            active={isActive}
            height={height}
            marginTop={marginTop}
            marginBottom={marginBottom}
          />
        )
      })}
    </div>
  )
}

export default TrendHotspots
