import React, {useState} from 'react'
import { Scrollama, Step } from 'react-scrollama'
import ChapterParagraph from './ChapterParagraph'
import ChapterParagraphFigure from './ChapterParagraphFigure'
import Dataset from '../Dataset'
import { getParagraphIdFromIndices } from '../../logic/navigation'
import { useBoundingClientRect } from '../../hooks'

const Echo = () => {
  console.error('Missing function handler')
}

const ChapterStream = ({ numStartAt, modules = [], height, backgroundColor, onStepChange=Echo, className}) => {
  const [{ width }, ref] = useBoundingClientRect()
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

  return (
    <div className={`ChapterStream ${className}`} ref={ref}>
    {modules.map((mod, i) => (
      <div className="ChapterStream_module" key={i}>
        <h2 className="pt1 pt3-m pa3 pa5-l pr0-l pt4-l pb0 pb0-l mv0" style={{
          position: 'sticky',
          zIndex:100,
          top: 50,
          background: backgroundColor,
        }}>
          <span className="pb4-l pb3-m pb2 bb">{mod.title}</span>
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
                  <ChapterParagraph
                    paragraph={par} height={height}
                    withFigures={par.figures?.length}
                    subheading={j===0 && mod.subheading ? mod.subheading : null}
                  />
                  {par.figures
                    ? par.figures.map((figure, i) => (
                      <ChapterParagraphFigure
                        key={i}
                        width={width - 64}
                        height={height/2}
                        figure={figure}
                      />
                    ))
                    : null
                  }
                  {par.dataset
                    ? (
                      <Dataset
                        id={par.dataset}
                        height={height/3}
                        width={width}
                        keys={par.datasetKeys}
                        colorKeys={par.datasetColorKeys}
                        displayPoints={par.datasetDisplayPoints}
                        displayDashedLine={par.datasetDisplayDashedLine}
                        hidePercentage={par.datasetHidePercentage}
                        numericTranslationLabel={par.datasetNumericTranslationLabel}
                        layout={par.datasetLayout}
                        from={Array.isArray(par.datasetExtent) ? par.datasetExtent[0] : par.from}
                        to={Array.isArray(par.datasetExtent) ? par.datasetExtent[1]: par.to}
                        range={par.datasetRange}
                      >
                        <label className="db pl5-l pl3 pv3 f6 i" dangerouslySetInnerHTML={{__html: par.datasetLegend }} />
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
