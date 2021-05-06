import React from 'react'

const Trend = ({ height = 100, width=100 }) => {

  return (
    <div className="Trend">
      {height} x {width}
    </div>
  )
}

export default Trend
