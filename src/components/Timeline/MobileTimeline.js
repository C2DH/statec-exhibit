import React from 'react'
import { StartDate, EndDate } from '../../constants'


const MobileTimeline = ({
  themeDatasetId='themeDatasetId',
  paragraphId='-1,-1',
  legend={},
  data=[],
  dateExtent=[StartDate, EndDate],
  from, to,
  height = 100,
  width=100,
  ...rest
}) => {
  return (
    <div className="MobileTimeline bt bb mr2" style={{height, overflow: 'scroll'}}>
      {data.map((d,i) => (
        <section key={i} className="ba pa2 mv2">
        <b>{d.t}</b>
        <h2 className="bb pb2 mb2" style={{
          color: 'inherit',
          marginTop: 0,
        }}>{d.title}</h2>
        <p>{d.subheading}</p>
        {typeof d.description === 'string' && (
          <p className="f7">{d.description}</p>
        )}
        </section>
      ))}
    </div>
  )
}

export default MobileTimeline
