import React from 'react'
import { Link } from 'react-router-dom'

import Chapter from '../components/Chapter/Chapter';
import theme01 from '../data/themes/theme-01.json';

const Home = () => {
  return (
    <div>
      <div className="flex flex-column-ns items-center" style={{minHeight:'70vh'}}>
        <div className="mw9 center pa4 pt5-ns ph7-l">
          <h1 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">Framing Luxembourg</h1>
          <h2 className="f3 fw1 lh-title">This website presents a series of <i>narratives</i></h2>
          <h2 className="f3 fw1 lh-title">In 1839, after almost half of the old Duchy of Luxembourg was ceded to Belgium, and the Grand Duchy of Luxembourg remained a mere 2,589 km2 as territory, 169,920 inhabitants were counted.</h2>
        </div>
        <div className="mw9 center pa4 pt5-ns ph7-l">
          <h3 className="tc"><Link to="/a-country-of-migration">1. A Country of Migrations</Link></h3>
          <h3 className="tc"><Link to="/family">2. Family Life</Link></h3>
        </div>
      </div>
      <Chapter
        theme={theme01}
        heading={false}
        showCover={false}
        showTitle={false}
        color={'rgb(217,238,241)'}
        headColor={'rgba(217,238,241, .8)'}
        chapterIndex={1}
      />
    </div>
  )
}

export default Home