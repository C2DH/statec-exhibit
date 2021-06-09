import React, { useMemo } from 'react'
import { StartDate, EndDate } from '../../constants'
import { scaleTime } from 'd3-scale'
import moment from 'moment'
import { getParagraphIdFromIndices } from '../../logic/navigation'

const scaleX = scaleTime()
  .domain([StartDate, EndDate])
  .range([0, 100]);

const ChapterModulesGraphics = ({ numStartAt=0, modules=[], timeFormat='YYYY', step}) => {
  const values = useMemo(() => {
    return modules.reduce((acc, mod, i) => acc.concat(mod.paragraphs.map((par, j) => {
      const from = par.from
        ? moment(par.from, timeFormat).startOf('year')
        : StartDate
      const to = par.to
        ? moment(par.to, timeFormat).startOf('year')
        : EndDate
      return {
        from: par.from,
        to: par.to,
        x: scaleX(from),
        w: scaleX(to) - scaleX(from),
        moduleId: i,
        paragraphId: getParagraphIdFromIndices(i+numStartAt,j)
      }
    })), [])
  }, [modules, timeFormat, numStartAt])

  return (
    <div className="ChapterModulesGraphics">
      <div className="ChapterModulesGraphics_startDate">
        <span>{StartDate.year()}</span>
      </div>
      <div className="ChapterModulesGraphics_endDate">
        <span>{EndDate.year()}</span>
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
