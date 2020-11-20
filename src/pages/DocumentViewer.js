import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styles from './DocumentViewer.module.css'
import MediaImage from '../components/MediaImage'
import MediaIndex from '../media/index.json'

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

const DocumentViewer = ({
  marginTop = 55
}) => {
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
  console.info('DocumentViewer:', doc, MediaIndex)

  return (
    <div style={{height: availableHeightInPx, marginTop}} className="w-100 fixed">
      <div className={styles.inner}>
      <MediaImage id="statec_004.png" height="100%" fill="transparent" caption={doc.caption}/>
      </div>

    </div>
  )
}
export default DocumentViewer
