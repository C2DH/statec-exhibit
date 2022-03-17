import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCurrentWindowDimensions, useURLSearchParams } from '../hooks'
import { ArrowLeftCircle, ArrowRightCircle, X } from 'react-feather'
import { setBodyNoScroll } from '../logic/viewport'
import '../styles/components/panel.scss'

const Panel = ({
  name='table-of-contents',
  left=false,
  backgroundColor='var(--dark)',
  color='white',
  isMobile=false,
  withLine=false,
  Component,
  children,
}) => {
  const { width, height } = useCurrentWindowDimensions({ isMobile })
  const [isOpen, setIsOpen ] = useState(false)
  const history = useHistory()
  const qs = useURLSearchParams()

  const closeButtonClickHandler = () => {
    console.debug('[Panel]', name, '@closeButtonClickHandler')
    setBodyNoScroll(false)
    history.replace({
      search: null,
      hash: window.location.hash
    })
  }

  useEffect(() => {
    console.debug('[Panel]', name, '@useEffect location changed to:', qs.get('panel'));
    const panelName = qs.get('panel')
    setIsOpen(panelName === name)
    if (panelName === name) {
      setBodyNoScroll(true)
    } else if (!panelName) {
      setBodyNoScroll(false)
    }
  }, [qs, name])

  return (
    <div className="Panel" dataname={name} style={{
      width, height: height + 100,
      backgroundColor,
      position: 'fixed',
      zIndex:1002,
      transition: 'transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)',
      transform: `translateX(${isOpen ? 0 : (left ? 100 : -100)}%)`,
    }}>
      <button
        className={`Panel_closeButton absolute bg-transparent bw0 ${left ? 'right-0': 'left-0'}`}
        onClick={closeButtonClickHandler}
      >
        {left ? <ArrowRightCircle strokeWidth={1.5} size={25} color={color}/> : <ArrowLeftCircle strokeWidth={1.5} size={25} color={color}/> }
      </button>
      <button
        className={`Panel_closeButton absolute bg-transparent bw0 ${left ? 'left-0': 'right-0'}`}
        onClick={closeButtonClickHandler}
      >
        <X size={25} color={color}/>
      </button>
      {withLine
        ? (
          <div className="Panel_scrollableContentLine mh3 mh4-m mh5-l" style={{
            backgroundColor: color,
          }}/>
        )
        : null
      }
      <div className="Panel_scrollableContent ph3 ph4-m ph5-l w-100" style={{
        height,
        color,
      }}>
      {Component
        ? <Component color={color} height={height} width={width} isMobile={isMobile} qs={qs} />
        : children
      }
      </div>
    </div>
  )
}
export default Panel
