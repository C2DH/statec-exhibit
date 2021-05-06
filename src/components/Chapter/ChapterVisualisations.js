import React, { useRef, useEffect, useState } from 'react'
import Trend from '../Trend'
import ChapterModulesGraphics from './ChapterModulesGraphics'

const ChapterVisualisations = ({ modules=[], height=100, width=100, step }) => {
  const ref = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });
  // reload bounding box whenever height or width changes
  useEffect(() => {
    if (ref && ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect()
      setSize({
        width: boundingClientRect.width,
        height: boundingClientRect.height,
      })
      console.info('ChapterVisualisations updated size:', boundingClientRect)
    }
  }, [height, width])

  return (
    <div className="ChapterVisualisations mr5" style={{
      position: 'sticky',
      display: 'flex',
      flexDirection: 'column',
      top: 50,
      // backgroundColor: 'var(--secondary)',
      height: height - 60,
    }}>
      <ChapterModulesGraphics modules={modules} step={step}/>
      <div ref={ref} style={{
        flexGrow: 1,
        // border: '1px dashed var(--secondary)',
        position: 'relative'
      }}>
        <div className="absolute" style={{
          height: size.height,
          width: size.width
        }}>

          <Trend {...size}/>
        </div>
      </div>
      <div>
        this could host a caption
      </div>
    </div>
  )
}

export default ChapterVisualisations
