import React, { useRef, useEffect, useState, useMemo } from 'react'
import Trend from '../Trend'
import ChapterModulesGraphics from './ChapterModulesGraphics'
import DownloadDataButton from '../DownloadDataButton'

const ChapterVisualisations = ({ keys=['v'], legend, data=[], modules=[], height=100, width=100, step }) => {
  const ref = useRef();
  const [size, setSize] = useState({ left: 0, width: 0, height: 0 });
  const [visibleKeys, setVisibleKeys] = useState(keys.map(key => ({
    isVisible: true,
    key,
  })))
  const paragraphs = useMemo(() => {
    return modules.reduce((acc, mod, i) => acc.concat(mod.paragraphs.map((par, j) => {
      return {
        ...par,
        moduleId: i,
        paragraphId: `${i},${j}`
      }
    })), [])
  }, [modules])

  const paragraph = step
    ? paragraphs.find(d => step.paragraphId === d.paragraphId)
    : null

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
      console.info('ChapterVisualisations updated size:', boundingClientRect)
    }
  }, [height, width])

  const toggleKeyVisibility = (key, isVisible) => {
    setVisibleKeys(visibleKeys.map((d) => {
      if(d.key === key) {
        return { isVisible, key }
      }
      return d
    }))
  }

  useEffect(() => {
    setVisibleKeys(keys.map(key => ({
      isVisible: false,
      key,
    })))
  }, [keys])

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

          <Trend
            from={paragraph?.from}
            to={paragraph?.to}
            paragraphId={paragraph?.paragraphId}
            data={data}
            focusKeys={paragraph? paragraph.keys || ['v'] : []}
            keys={keys}
            legend={legend}
            visibleKeys={visibleKeys}
            height={size.height}
            width={size.width}
            left={size.left}
            top={size.top}
          />
        </div>
      </div>
      <div className="flex mh5">
        {visibleKeys.map(({key, isVisible},i) => {
          return (
            <div className="ma2 relative" key={i}>
              {key}
              <input
                type="checkbox"
                checked={isVisible} onChange={() => toggleKeyVisibility(key, !isVisible)}/>
            </div>
          )
        })}
        <DownloadDataButton label="test" values={data} legend={legend} />
        this could host a caption
      </div>
    </div>
  )
}

export default ChapterVisualisations
