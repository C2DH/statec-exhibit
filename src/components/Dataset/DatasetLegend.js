import React from 'react'

// values array of { color, legend }
const DatasetLegend = ({ values=[] }) => (
  <figcaption className="db pl5-l pl3">
    {values.map((d, i) => (
      <label className="dib" key={i}>
        <span className="colorpoint dib mr1" style={{
          backgroundColor: d.color
        }}></span>&nbsp;{d.legend}&nbsp;
      </label>
    ))}
  </figcaption>
)

export default DatasetLegend
