import React, { useMemo, Suspense, lazy } from 'react'
import moment from 'moment'
import { scaleLinear, scaleTime } from 'd3-scale'
import { StartYear, EndYear } from '../../constants'
import NarrativeContainer from '../Narrative/NarrativeContainer'


const CompareModule = lazy(() => import('../Module/Compare'))
const TextModule = lazy(() => import('../Module/Text'))
const TextOnlyModule = lazy(() => import('../Module/TextOnly'))
const AvailableModules = {
  compare: CompareModule,
  text: TextModule,
  textOnly: TextOnlyModule
}

const GraphicContainer = ({ module, progress }) => {
  const opacityScale = scaleLinear()
    .domain([0, 0.2, 0.8, 0.95])
    .range([0, 1, 1, 0]);
  let ComponentModule = AvailableModules[module?.layout]
  if (!ComponentModule) {
    ComponentModule = () => (<p>not yet available</p>)
  }
  const { from, to, title, subheading, paragraphs = [] } = module;
  // calculate extent and return scaleX to be used by the components
  const { startDate, endDate, scaleX } = useMemo(() => {
    const startDate = moment(from || StartYear, 'YYYY')
    const endDate = moment(to || EndYear, 'YYYY')
    const scaleX = scaleTime()
      .domain([startDate, endDate])
      .range([0.2, 0.8])
      .clamp(true);
    return { startDate, endDate, scaleX }
  }, [from, to])
  // get current date based on scaleX and progress
  const { currentDate, currentYear } = useMemo(() => {
    const currentDate = scaleX.invert(progress)
    const currentYear = currentDate.getFullYear()
    return { currentDate, currentYear }
  }, [progress, scaleX])

  return (
    <div className="scrollSection fixed" style={{
      opacity: opacityScale(progress),
      display: 'flex',
      flexDirection: 'row',
      bottom: 0,
      top: '50vh'
    }}>
      <div className={paragraphs.length ? 'w-50': 'w-100'}>
        <Suspense fallback={''}>
          <ComponentModule {...{
            startDate, endDate, title, subheading, scaleX, module, progress, currentDate, currentYear, paragraphs
          }}/>
        </Suspense>
      </div>
      {paragraphs.length && (
        <div className="w-50">
          <NarrativeContainer
            currentYear={currentYear}
            paragraphs={paragraphs}
          />
          </div>
      )}
    </div>
  )
}

export default GraphicContainer
