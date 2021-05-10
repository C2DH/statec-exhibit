import React from 'react'
import {animated} from 'react-spring'

const TrendLegend = ({ pointer, scaleX , left, top, marginLeft, marginTop}) => {
  console.info('rendering TrendLegend', pointer)

  const getYear = (p) => p.x.to((n) => {
    return scaleX.invert(n - left - marginLeft).getFullYear()
  })


  return (
    <animated.div className="TrendLegend absolute" style={{
      position: 'absolute',
      width: 50,
      top: 10,
      marginLeft: -25,
      textAlign: 'center',
      transform: pointer.x.interpolate((x) => `translate(${x - left}px, 0px)`),
    }}>
      <animated.span className="pv1 ph2" style={{
        color: 'var(--primary)',
        borderRadius: 2,
        backgroundColor:'var(--secondary)'
      }}>
        {getYear(pointer)}
      </animated.span>
    </animated.div>
  )
}

export default TrendLegend
