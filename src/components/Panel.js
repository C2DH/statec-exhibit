import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { useCurrentWindowDimensions } from '../hooks'
import { X } from 'react-feather'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Panel = ({ name='table-of-contents', children, left=false }) => {
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
      backgroundColor: 'var(--primary)',
      position: 'fixed',
      zIndex:1000,
      transition: 'transform 0.6s cubic-bezier(0.83, 0, 0.17, 1)',
      transform: `translateX(${isOpen ? 0 : (left ? 100 : -100)}%)`,
    }}>
      <button className="Panel_closeButton bg-transparent bw0" onClick={() => history.replace({ search: null })}>
        <X size={25} />
      </button>
      {children}
    </div>
  )
}
export default Panel
