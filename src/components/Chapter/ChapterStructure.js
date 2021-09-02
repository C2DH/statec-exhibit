import React from 'react'
import { Link } from 'react-router-dom'
import { getParagraphIdFromIndices } from '../../logic/navigation'

const ChapterStructure = ({ color, structure }) => {
  let c = 0
  return (
  <ol>
    {structure.sections.map((section, i) => section.modules.map((d,j) => {
      const paragraphId = getParagraphIdFromIndices(c,0)
      c += 1
      return (
        <li key={paragraphId} style={{color}}>
          <Link to={`/${structure.chapterId}#p${paragraphId}`} className="db mb4" style={{color}}>{d.title}
          </Link></li>
      )
    }))}
  </ol>
  )
}

export default ChapterStructure
