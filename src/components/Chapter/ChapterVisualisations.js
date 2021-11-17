import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ChapterModulesGraphics from './ChapterModulesGraphics'
import Trend from '../Trend'
import Points from '../Points'

const AvailablesComponents = {
  Points: Points,
  Trend: Trend
}

const ChapterVisualisations = ({
  themeDatasetId='themeDatasetId',
  component='Trend',
  displayPoints=false,
  displayDashedLine=false,
  keys=['v'], legend, data=[], modules=[], height=100, width=100, step,
  numStartAt=0,
  marginLeft=100,
  numericTranslationLabel='number',
}) => {
  const ref = useRef();
  const { t } = useTranslation()
  const [size, setSize] = useState({ left: 0, width: 0, height: 0 });
  const paragraphs = useMemo(() => {
    return modules.reduce((acc, mod, i) => acc.concat(mod.paragraphs.map((par, j) => {
      return {
        ...par,
        moduleId: i,
        paragraphId: `${i+1+numStartAt}.${j+1}`
      }
    })), [])
  }, [modules, numStartAt])

  const paragraph = step
    ? paragraphs.find(d => step.paragraphId === d.paragraphId)
    : null
  let hotspots = []
  if (paragraph) {
    hotspots = paragraph.hotspots ?? []
  }
  if (modules && step) {
    hotspots = hotspots.concat(modules[step.moduleId].hotspots ?? [])
  }
  // reload bounding box whenever height or width changes
  useEffect(() => {
    if (ref && ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect()
      setSize({
        width: boundingClientRect.width,
        height: boundingClientRect.height,
        left: boundingClientRect.left,
        top: boundingClientRect.top,
      })
    }
  }, [height, width])
  const Component = AvailablesComponents[component]
    ? AvailablesComponents[component]
    : Trend

  return (
    <div className="ChapterVisualisations pr5" style={{
      position: 'sticky',
      display: 'flex',
      flexDirection: 'column',
      top: 50,
      // backgroundColor: 'var(--secondary)',
      height: height - 100,
    }}>
      <div style={{marginLeft: marginLeft / 2}}>
        <ChapterModulesGraphics modules={modules} numStartAt={numStartAt} step={step}/>
      </div>
      <div ref={ref} style={{
        flexGrow: 1,
        // border: '1px dashed var(--secondary)',
        position: 'relative'
      }}>
        <div className="absolute" style={{
          height: size.height,
          width: size.width
        }}>
          <div className="absolute right-0 top-0" style={{
            height: size.height,
            width: 50,
          }}>
            <div  className="absolute" style={{
              top: '50%',
              left: '100%',
              transform: 'translateX(-50%) translateY(-50%) rotate(90deg)'
            }}>
              <div  className="absolute tc" style={{ width: size.height, marginLeft: -size.height/2}}>
            { t(`dataset${themeDatasetId}`) }
            </div>
            </div>
          </div>
          <Component
            displayPoints={displayPoints}
            displayDashedLine={displayDashedLine}
            numericTranslationLabel={numericTranslationLabel}
            themeDatasetId={themeDatasetId}
            from={paragraph?.from}
            to={paragraph?.to}
            paragraphId={paragraph?.paragraphId}
            hotspots={hotspots}
            data={data}
            availableKeys={paragraph?.availableKeys ? paragraph.availableKeys: keys}
            focusKeys={paragraph?.focusKeys ? paragraph.focusKeys : paragraph?.visibleKeys }
            colorKeys={paragraph?.colorKeys}
            visibleKeys={paragraph?.visibleKeys ? paragraph.visibleKeys : paragraph?.availableKeys || keys}
            legend={legend}
            height={size.height}
            width={size.width}
            left={size.left}
            top={size.top}
          />
        </div>
      </div>
      <div className="flex mh5">
        {/* visibleKeys.map(({key, isVisible},i) => {
          return (
            <div className="ma2 relative" key={i}>
              {key}
              <input
                type="checkbox"
                checked={isVisible} onChange={() => toggleKeyVisibility(key, !isVisible)}/>
            </div>
          )
        }) */}
        &nbsp;
      </div>
    </div>
  )
}

export default ChapterVisualisations
