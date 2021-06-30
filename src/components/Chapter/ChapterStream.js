import React, {useState} from 'react'
import { Scrollama, Step } from 'react-scrollama'
import ChapterParagraph from './ChapterParagraph'
import ChapterParagraphCover from './ChapterParagraphCover'
import Dataset from '../Dataset'
import { getParagraphIdFromIndices } from '../../logic/navigation'

const Echo = () => {
  console.error('Missing function handler')
}

const ChapterStream = ({ numStartAt, modules = [], height, backgroundColor, onStepChange=Echo}) => {
  const [activeStep, setActiveStep]= useState({
    paragraphId: '0,0',
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
    window.history.pushState({}, null, `#p${data}`)
  }
  const onStepExit = ({ data, direction }, i) => {
    // console.info('ChapterStream @onStepExit', { data, direction }, i)
    if (data === '1,1,1' && direction === 'up') {
      const step = {
        paragraphId: '0,0,0',
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
            const paragraphId = getParagraphIdFromIndices(i+numStartAt,j)
            return (
              <Step data={paragraphId} key={paragraphId}>
                <div className={`ChapterStream_paragraph ${activeStep.paragraphId === paragraphId ? 'active' : ''}`}>
                  <div className="anchor" id={`p${paragraphId}`}></div>
                  <ChapterParagraph paragraph={par} height={height} withFigures={par.figures?.length}/>
                  {par.figures
                    ? par.figures.map((figure, i) => (
                      <div className="pb5 pl5 pr0" key={i}>
                        <ChapterParagraphCover cover={figure} height={height/2} />
                      </div>
                    ))
                    : null
                  }
                  {par.dataset
                    ? (
                      <Dataset
                        id={par.dataset}
                        height={height/3}
                        width={200}
                        keys={par.datasetKeys}
                        hidePercentage={par.datasetHidePercentage}
                        layout={par.datasetLayout}
                        from={par.from}
                        to={par.to}
                      >
                        <label className="db pl5 pv3 i">
                          {par.datasetLegend}
                        </label>
                      </Dataset>
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
