import React from 'react'
import {ArrowRight, Eye} from 'react-feather'

const ChapterParagraph = ({
  paragraph,
  paragraphId='',
  height=0,
  withFigures=false,
  subheading,
  onIntervalClick,
}) => {

  return (
    <div className={`ChapterParagraph ${paragraph.className || ''}`}>
    {subheading
      ? <h3 className="pl3 pr3 pl5-l mt4 pr0-l mb0 bl i" dangerouslySetInnerHTML={{
          __html: subheading
        }} />
      : null
    }
    <div className={`pa3 pt4-l pa5-l pr0-l ${withFigures ? 'pb3-l': ''}`}>
      <p dangerouslySetInnerHTML={{
        __html: paragraph.text
      }}/>
      <div className="ChapterStream_paragraphFocus ba pl2 pr2 pb1 pt1 br2 inline-flex items-center"
        onClick={() => onIntervalClick({
          from: paragraph.from,
          to: paragraph.to,
          paragraphId,
          datasetRange: paragraph.datasetRange
        })}
      >
        <Eye size={14}/>
        <span className="ml1 mr1">{paragraph.from}</span>
        <ArrowRight size={14}/>
        <span className="ml1 mr1">{paragraph.to}</span>
      </div>
    </div>
    </div>
  )
}

export default React.memo(ChapterParagraph, (prevProps, nextProps) => {
  return prevProps.memoId === nextProps.memoId
})
