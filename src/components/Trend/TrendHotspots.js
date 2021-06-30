import React from 'react'
import moment from 'moment'

const TrendHotspots = ({
  hotspots = [],
  windowDimensions,
  values=[],
  focusKeys=[],
  scaleX,
  height=100,
  marginLeft=100,
  marginRight=50,
  marginTop=50,
  displayPoint=false,
}) => {
  return (
    <div className="TrendHotspots absolute" style={{
      left: marginLeft,
      right: marginRight,
      top: 0,
      height,
    }}>
      {hotspots.map((d, i) => {
        let value = values.find(v => String(v.t) === String(d.t))
        if (!value) {
          value = {
            x: scaleX(moment(String(d.t), 'YYYY').startOf('year'))
          }
        }
        return (
          <React.Fragment key={i}>
            <div className="TrendHotspots_line" style={{
              left: value.x,
              height,
            }}></div>
            {displayPoint && focusKeys.length === 1
              ? (
                <div className="TrendHotspots_point" style={{
                  left: value.x,
                  top: value.ys[focusKeys[0]],
                }}/>
              )
              :null
            }

          </React.Fragment>
        )
      })}
    </div>
  )
}

export default TrendHotspots
