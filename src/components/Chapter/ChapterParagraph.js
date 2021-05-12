import React from 'react'
import {ArrowRight, Eye} from 'react-feather'

const ChapterParagraph = ({ paragraph, height=0, withFigures=false }) => (
  <div className={`ChapterParagraph pa5 pr0-l ${withFigures ? 'pb3': ''}`}>
    <p dangerouslySetInnerHTML={{
      __html: paragraph.text
    }}/>
    <div className="ChapterStream_paragraphFocus ba pl2 pr2 pb1 pt1 br2 inline-flex items-center">
      <Eye size={14}/>
      <span className="ml1 mr1">{paragraph.from}</span>
      <ArrowRight size={14}/>
      <span className="ml1 mr1">{paragraph.to}</span>
    </div>
  </div>
)

export default React.memo(ChapterParagraph)
