import React, {useState} from 'react'
import { Scrollama, Step } from 'react-scrollama'
import ChapterParagraph from './ChapterParagraph'
import ChapterParagraphCover from './ChapterParagraphCover'

const Echo = () => {
  console.error('Missing function handler')
}

const ChapterStream = ({ modules = [], height, backgroundColor, onStepChange=Echo}) => {
  const [activeStep, setActiveStep]= useState({
    paragraphId: '-1,-1',
    moduleId: '-1',
    direction: 'down'
  })
  const onStepEnter = ({ data, direction }, i) => {
    // console.info('ChapterStream @onStepEnter', data, direction)
    const step = {
      paragraphId: data,
      moduleId: i,
      direction,
    }
    setActiveStep(step)
    onStepChange(step)
  }
  const onStepExit = ({ data, direction }, i) => {
    // console.info('ChapterStream @onStepExit', { data, direction }, i)
    if (data === '0,0' && direction === 'up') {
      const step = {
        paragraphId: '-1,-1',
        moduleId: '-1',
        direction: 'down'
      }
      setActiveStep(step)
      onStepChange(step)
    }
  }
  console.info('Rerendering ChapterStream')

  return (
    <div className="ChapterStream">
    {modules.map((mod, i) => (
      <div className="ChapterStream_module" key={i}>
        <h2 className="pa5 pr0-l pt4 pb0 mv0 " style={{
          position: 'sticky',
          zIndex:100,
          top: 50,
          background: backgroundColor,
        }}>
          <span className="pb4 bb">{mod.title}</span>
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
                <div id={`m${i}`} className={`ChapterStream_paragraph ${activeStep.paragraphId === paragraphId ? 'active' : ''}`}>
                  <ChapterParagraph paragraph={par} height={height}/>
                  {par.cover
                    ? (
                      <div className="pa5 pr0">
                        <ChapterParagraphCover cover={par.cover} height={height/2} />
                      </div>
                    )
                    : null
                  }
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