import React, {useMemo, useEffect} from 'react'
import { useStore } from '../store'
import {X, Bookmark} from 'react-feather'
import {useTranslation} from 'react-i18next'
import { useSpring, animated, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useCurrentWindowDimensions } from '../hooks'
import population from '../data/datasets/population.json'
import '../styles/components/currentYearExplorer.scss'

const CurrentYearExplorer = ({ height=300, width=300 }) => {
  const [{ pos }, set] = useSpring(() => ({ pos: [width - 250, 150] }))
  const { width:windowWidth, height: windowHeight } = useCurrentWindowDimensions()
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ xy, down, movement: pos }) => {
      set.start({ pos, immediate: down })
    },
    { initial: () => pos.get() }
  )

  const { t } = useTranslation()
  const {
    currentDatum, currentYear,
    currentHotspot,
    currentDataset,
    currentFocusKeys, currentKeys,
    currentYearExplorerOpen, changeCurrentYearExplorerOpen
  } = useStore(state => state)
  const people = useMemo(() => {
    return population.values.find(d => String(d.t) === String(currentYear))
  }, [currentYear])

  useEffect(() => {
    set.start({ pos: [windowWidth - 250, 150 ]})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, windowHeight])

  return (
    <animated.div {...bind()} className="CurrentYearExplorer shadow-5 fixed pa3" style={{
      transform: to([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)`),
      width:200,
      opacity: currentYearExplorerOpen && currentDatum? 1 : 0,
      pointerEvents: currentYearExplorerOpen ? 'auto' : 'none'
    }}>
      {!currentYear && !currentDatum
        ? (
          <p>...</p>
        )
        : null
      }
      <div className="CurrentYearExplorer_dragHandle" />
      <h1 className="ma0" style={{color: 'var(--primary)'}}>{currentYear}</h1>
      {people
        ? <p className="bb pb1 ma0 mb2 ">{t('datasetPopulationLegendValuev', {n: people.v})}</p>
        : null
      }
      <div />
      {currentDatum && currentKeys.map((key) => {
        const isOnFocus = currentFocusKeys.includes(key)
        return (
        <div className="flex items-end justify-between w100" key={key}>
          <div style={{
            color: isOnFocus? 'var(--primary)' : 'var(--data-background)'
          }}>{t(`dataset${currentDataset}LegendValue${key}`)}</div>
          <div className="tr ml2" style={{
            color: 'var(--white)'
          }}>{t('number', { n: currentDatum[key] })}</div>
        </div>
        )
      })}
      {currentHotspot
        ? (<>
          <p className="bt pt2 ma0 mt2 " style={{fontSize:13, lineHeight:'16px'}}>
            <label className="db ttu tracked mb1" ><Bookmark size={12}/>&nbsp;{t('hotspotLabel')}</label>
            <span className="db" style={{color: 'var(--white)'}}>{currentHotspot.title || currentHotspot.text}</span>
          </p>
          {currentHotspot.title ? <blockquote className="db bl ml0 pl2 pr0 mr0" style={{color: 'var(--white)'}}>{currentHotspot.text}</blockquote> : null}
          </>
        ) : null}
      <button className="absolute right-0 pa3 top-0 Panel_closeButton bg-transparent bw0" onClick={() => changeCurrentYearExplorerOpen(false)}>
        <X size={20} color='var(--primary)'/>
      </button>
    </animated.div>
  )
}

export default CurrentYearExplorer
