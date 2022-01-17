import React, { useMemo } from 'react'
import { StartDate, EndDate } from '../../constants'
import { scaleTime } from 'd3-scale'
import moment from 'moment'
import { getParagraphIdFromIndices } from '../../logic/navigation'



const ChapterModulesGraphics = ({ dateExtent=[StartDate, EndDate], numStartAt=0, modules=[], timeFormat='YYYY', step}) => {
  const scaleX = scaleTime()
    .domain([dateExtent[0], dateExtent[1]])
    .range([0, 100]);

  const values = useMemo(() => {
    return modules.reduce((acc, mod, i) => acc.concat(mod.paragraphs.map((par, j) => {
      const from = par.from
        ? moment(par.from, timeFormat).startOf('year')
        : dateExtent[0]
      const to = par.to
        ? moment(par.to, timeFormat).startOf('year')
        : dateExtent[1]
      return {
        from: par.from,
        to: par.to,
        x: scaleX(from),
        w: scaleX(to) - scaleX(from),
        moduleId: i,
        paragraphId: getParagraphIdFromIndices(i+numStartAt,j)
      }
    })), [])
  }, [modules, timeFormat, dateExtent, scaleX, numStartAt])

  return (
    <div className="ChapterModulesGraphics">
      <div className="ChapterModulesGraphics_startDate">
        <span>{ dateExtent[0] instanceof Date ?  dateExtent[0].getFullYear():  dateExtent[0].year()}</span>
      </div>
      <div className="ChapterModulesGraphics_endDate">
        <span>{dateExtent[1] instanceof Date ?  dateExtent[1].getFullYear():  dateExtent[1].year()}</span>
      </div>
      <div className="ChapterModulesGraphics_rail" style={{height: Math.max(50,modules.length * 10 + 20)}}>

      {values.map((value) => (
        <a href={`#p${value.paragraphId}`} key={value.paragraphId}
          className={`ChapterModulesGraphics_value ${value.paragraphId === step?.paragraphId ? 'active' : ''}`}
          style={{
            left: `${value.x}%`,
            width: `${value.w}%`,
            top: value.moduleId * 10 + 20,
            height: 5,
          }}
        >
          <div className="ChapterModulesGraphics_value_startDate">
            {value.from}
          </div>
          <div className="ChapterModulesGraphics_value_endDate">
            {value.to}
          </div>
        </a>
      ))}
      </div>
    </div>
  )
}

export default ChapterModulesGraphics
