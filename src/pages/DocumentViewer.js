import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import MediaImage from '../components/MediaImage'
import MediaIndex from '../media/index.json'
import { Link } from 'react-router-dom'

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const CloseButton = ({ to }) => {
  return (
    <Link className='CloseButton' to={to}>×</Link>
  )
}

const DocumentViewer = ({
  marginTop = 55
}) => {
  // is there any from parameter
  const urlSearchParams = new URLSearchParams(window.location.search);
  const fromPage = urlSearchParams.get('from')
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 100)
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const availableHeightInPx = dimensions.height - marginTop
  const {documentId} = useParams()
  const doc = MediaIndex.images[documentId]
  console.info('DocumentViewer:', doc)

  return (
    <div style={{height: availableHeightInPx, marginTop}} className="DocumentViewer w-100 fixed">
      <div className='DocumentViewer_inner'>
        { fromPage
          ? <CloseButton to={`/${fromPage}${window.location.hash}`}/>
          : null
        }
        <MediaImage id={documentId} style={{ height: '100%' }} resolution="large-h"/>
      </div>

    </div>
  )
}
export default DocumentViewer
