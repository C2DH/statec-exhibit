import React, {useState} from 'react'
import { Scrollama, Step } from 'react-scrollama'
import {ArrowRight, Eye} from 'react-feather'


const ChapterStream = ({ modules = [], height, backgroundColor, }) => {
  const [activeStep, setActiveStep]= useState({
    paragraphId: '-1,-1',
    moduleId: '-1',
    direction: 'down'
  })
  const onStepEnter = ({ data, direction }, i) => {
    console.info('ChapterStream @onStepEnter', data, direction)
    setActiveStep({
      paragraphId: data,
      moduleId: i,
      direction,
    })
  }
  const onStepExit = ({ data, direction }, i) => {
    console.info('ChapterStream @onStepExit', { data, direction }, i)
  }
  console.info('Rerendering ChapterStream')

  return (
    <div className="ChapterStream">
    {modules.map((mod, i) => (
      <div className="ChapterStream_module" key={i}>
        <h2 className="pl5-l pl4-m pl3 pt3 mb0 mt0" style={{
          position: 'sticky',
          top: 50,
          background: backgroundColor,
        }}>
          <span className="pb3">{mod.title}</span>
        </h2>
        <Scrollama
          onStepEnter={(e) => onStepEnter(e, i)}
          onStepExit={(e) => onStepExit(e, i)}
          offset={0.5}
          threshold={.5}
        >
          {mod.paragraphs.map((par, j) => {
            const paragraphId = `${i},${j}`
            return (
              <Step data={paragraphId} key={paragraphId}>
                <div id={`m${i}`} className={`ChapterStream_paragraph pa5-l pa4-m pa3 ${activeStep.paragraphId === paragraphId ? 'active' : ''}`}>
                  <p dangerouslySetInnerHTML={{
                    __html: par.text
                  }}/>
                  <div className="ba pl2 pr2 pb1 pt1 br2 inline-flex items-center">
                    <Eye size={14}/>
                    <span className="ml1 mr1">{par.from}</span>
                    <ArrowRight size={14}/>
                    <span className="ml1 mr1">{par.to}</span>
                  </div>
                </div>
              </Step>
            )
          })}
        </Scrollama>
      </div>
    ))}
    </div>
  )
}

export default ChapterStream
