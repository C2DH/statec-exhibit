import React from 'react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ZoomIn, ZoomOut } from 'react-feather'
import ReactHammer from 'react-hammerjs'
import '../styles/components/ZoomAndPanMedia.css'

const HAMMER_DIRECTION_ALL = 30
const PINCH_TIMEOUT = 300

const getTransform = (state) => {
  const translateDeltaX = state.deltaX + state.panDeltaX
  const translateDeltaY = state.deltaY + state.panDeltaY
  const scale = state.zoom * state.pinchingZoom
  return `translate(${translateDeltaX}px, ${translateDeltaY}px) scale(${scale})`
}

const MediaViewerZoomableFigure = ({
  src='',
  media = {},
  height=100,
  width=100
}) => {
  const [state, setState] = useState({
    zoom: 1,
    pinchingZoom: 1,
    lastPinchedAt: 0,
    deltaX: 0,
    deltaY: 0,
    panDeltaX: 0,
    panDeltaY: 0,
    maxWidth: 0,
    maxHeight: 0,
  })

  const mediaContentRef = useRef()
  const boundsDeltas = useCallback(
    (deltaX, deltaY, zoom) => {
      const maxDeltaX = (state.maxWidth * (+zoom - 1)) / 2
      const maxDeltaY = (state.maxHeight * (+zoom - 1)) / 2

      const boundedDeltaX = Math.max(Math.min(deltaX, maxDeltaX), -maxDeltaX)
      const boundedDeltaY = Math.max(Math.min(deltaY, maxDeltaY), -maxDeltaY)

      return {
        deltaX: boundedDeltaX,
        deltaY: boundedDeltaY,
      }
    },
    [state.maxHeight, state.maxWidth]
  )



  const handleZoom = useCallback(
    (param) => {
      setState((prevState) => {
        const nextZoom =
          param + prevState.zoom > 4 || param + prevState.zoom < 1
            ? prevState.zoom
            : param + prevState.zoom
        return {
          ...prevState,
          pinchingZoom: 1,
          zoom: nextZoom,
          ...boundsDeltas(prevState.deltaX, prevState.deltaY, nextZoom),
        }
      })
    },
    [boundsDeltas]
  )

  const handlePinchEnd = useCallback(
    (e) => {
      let newZoom = state.zoom * e.scale
      newZoom = Math.max(Math.min(newZoom, 4), 1)
      setState({
        ...state,
        pinchingZoom: 1,
        lastPinchedAt: new Date().getTime(),
        zoom: newZoom,
        ...boundsDeltas(state.deltaX, state.deltaY, newZoom),
      })
    },
    [boundsDeltas, state]
  )

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      handleZoom(e.deltaY * -0.01)
    },
    [handleZoom]
  )

  const resetZoom = () => {
    const zoom = 1
    setState({
      ...state,
      pinchingZoom: 1,
      zoom,
      ...boundsDeltas(state.deltaX, state.deltaY, zoom),
    })
  }

  const handlePinch = useCallback(
    (e) => {
      const pinchingZoom = +e.scale
      setState({
        ...state,
        pinchingZoom,
      })
    },
    [state]
  )

  function handlePan(e) {
    if (
      state.pinchingZoom !== 1 ||
      new Date().getTime() - state.lastPinchedAt < PINCH_TIMEOUT
    ) {
      return
    }
    setState({
      ...state,
      panDeltaX: +e.deltaX,
      panDeltaY: +e.deltaY,
    })
  }

  function handlePanEnd(e) {
    if (
      state.pinchingZoom !== 1 ||
      new Date().getTime() - state.lastPinchedAt < PINCH_TIMEOUT
    ) {
      return
    }

    let deltaX = +e.deltaX + state.deltaX
    let deltaY = +e.deltaY + state.deltaY

    setState({
      ...state,
      panDeltaX: 0,
      panDeltaY: 0,
      ...boundsDeltas(deltaX, deltaY, state.zoom * state.pinchingZoom),
    })
  }

  function onLoadImage(e) {
    setState({
      ...state,
      maxWidth: e.target.width,
      maxHeight: e.target.height,
    })
  }

  useLayoutEffect(() => {
    const image = mediaContentRef.current
    if (image) {
      image.addEventListener('wheel', handleWheel, {
        passive: false,
      })
      return () => image.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  useLayoutEffect(() => {
    resetZoom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])
  return (
    <div className="ZoomAndPanMedia absolute top-0 shadow" style={{
      width, height,
    }}>
      <div className="ZoomAndPanMedia_container" ref={mediaContentRef}>
        <ReactHammer
          options={{
            recognizers: {
              pan: {
                enable: true,
                direction: HAMMER_DIRECTION_ALL,
              },
              pinch: {
                enable: true,
              },
            },
          }}
          onPinch={handlePinch}
          onPinchEnd={handlePinchEnd}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          <img
            alt="Zoom and pan"
            onDragStart={(e) => {
              e.preventDefault()
              return false
            }}
            onLoad={onLoadImage}
            draggable="false"
            style={{ transform: getTransform(state) }}
            className="ZoomAndPanMedia_zoomable"
            src={src}
          />
        </ReactHammer>
      </div>
    <div className="ZoomAndPanMedia_controls">
      <div className="d-flex flex-row">
        <div
          className={`ZoomAndPanMedia_zoomButton cursor-pointer btn-zoom mb-2`}
          onClick={() => handleZoom(0.1)}
        >
          <ZoomIn></ZoomIn>
        </div>
        <div
          className={`ZoomAndPanMedia_zoomResetButton cursor-pointer btn-zoom mb-2 ms-3`}
          onClick={() => resetZoom()}
        >
          Reset
        </div>
        <div
          className={`ZoomAndPanMedia_zoomButton cursor-pointer btn-zoom mb-2 ms-3`}
          onClick={() => handleZoom(-0.1)}
        >
          <ZoomOut></ZoomOut>
        </div>
      </div>
    </div>
  </div>
)
}

export default MediaViewerZoomableFigure
