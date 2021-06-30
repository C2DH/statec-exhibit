import React, {useMemo} from 'react'
import { useStore } from '../store'
import {X} from 'react-feather'
import {useTranslation} from 'react-i18next'
import { useSpring, animated, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import population from '../data/datasets/population.json'
import '../styles/components/currentYearExplorer.scss'
const CurrentYearExplorer = ({ height=300, width=300 }) => {
  const [{ pos }, set] = useSpring(() => ({ pos: [width - 250, 150] }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ xy, down, movement: pos }) => {
      set({ pos, immediate: down })
    },
    { initial: () => pos.get() }
  )

  const { t } = useTranslation()
  const {
    currentDatum, currentYear,
    currentDataset,
    currentFocusKeys, currentKeys,
    currentYearExplorerOpen, changeCurrentYearExplorerOpen} = useStore(state => state)
  const people = useMemo(() => {
    return population.values.find(d => String(d.t) === String(currentYear))
  }, [currentYear])

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
      <button className="absolute right-0 pa3 top-0 Panel_closeButton bg-transparent bw0" onClick={() => changeCurrentYearExplorerOpen(false)}>
        <X size={20} color='var(--primary)'/>
      </button>
    </animated.div>
  )
}

export default CurrentYearExplorer
