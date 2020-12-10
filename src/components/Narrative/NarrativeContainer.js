import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import styles from './Narrative.module.css'
import {usePrevious} from '../../hooks'


const NarrativeContainer = React.memo(({ paragraphs = [], currentYear }) => {
  const [index, set] = useState(-1)
  const prevIndex = usePrevious(index)
  const downward = prevIndex < index

  useEffect(() => {
    const idx = paragraphs.findIndex(p => currentYear >= p.from && currentYear <= p.to)
    set(idx)
  }, [currentYear, paragraphs])

  const transitions = useTransition(index, i => i, {
    // from: { opacity: 0, transform: `translate3d(0,${downward ? '' : '-'}50%,0)` },
    // enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    // leave: { opacity: 0, transform: `translate3d(0,${downward ? '-' : ''}50%,0)` },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })
  return (
    <div className="h-100" style={{overflow:'hidden'}}>
    {transitions.map(({ item, props, key }) => {
      const paragraph = item > -1 ? paragraphs[item]: {}
      return (
        <animated.div key={key} className="h-100 absolute flex items-center" style={props}>
          <div className="ph4">
            {paragraph.title && (
              <h3 className={styles.narrativeTitle}>{paragraph.title}</h3>
            )}
            <p className={styles.narrativeParagraph} dangerouslySetInnerHTML={{
                __html: paragraph.text,
            }}/>
          </div>
        </animated.div>
      )
    })}
    </div>
  )
})

export default  NarrativeContainer
