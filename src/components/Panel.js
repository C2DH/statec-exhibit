import React, { useEffect, useState } from 'react'
import { useStore } from '../store'
import { useHistory, useLocation } from 'react-router-dom'
import { useCurrentWindowDimensions } from '../hooks'
import { ArrowLeftCircle, ArrowRightCircle, X } from 'react-feather'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Panel = ({ name='table-of-contents', children, left=false, color='white' }) => {
  const { width, height } = useCurrentWindowDimensions()
  const [isOpen, setIsOpen ] = useState(false)
  const history = useHistory()
  const qs = useQuery()

  useEffect(() => {
    console.info('location changed:', qs.get('panel'));
    const panelName = qs.get('panel')
    setIsOpen(panelName === name)
  }, [qs, name])

  return (
    <div style={{
      width, height,
      backgroundColor: 'var(--dark)',
      position: 'fixed',
      zIndex:1000,
      transition: 'transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)',
      transform: `translateX(${isOpen ? 0 : (left ? 100 : -100)}%)`,
    }}>
      <button className={`Panel_closeButton absolute pa3 bg-transparent bw0 ${left ? 'right-0': 'left-0'}`} onClick={() => history.replace({ search: null })}>
        {left ? <ArrowRightCircle size={25} color={color}/> : <ArrowLeftCircle size={25} color={color}/> }
      </button>
      <button className={`Panel_closeButton absolute pa3 bg-transparent bw0 ${left ? 'left-0': 'right-0'}`} onClick={() => history.replace({ search: null })}>
        <X size={25} color={color}/>
      </button>
      {children}
    </div>
  )
}
export default Panel
