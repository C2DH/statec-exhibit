import React, { Component } from 'react'
import { groupBy } from 'lodash'
import logo from './logo.svg'
import GaussianChart from './GaussianChart'
import HendecagonChart from './HendecagonChart'
import data from './data.json'
import 'tachyons'

class Country extends Component {
  render() {
    const theme = this.props.match.params.theme
    return (
      <div className="App">
        <div className="w-100 flex flex-column">
            <div className="w-100 flex">
              <div className="w-70 flex justify-start">
                <header className="App-header flex">
                  <div className="w-70 flex flex-column justify-end">
                    <h1 className="mt0 mb0" style={{ fontSize: '40px'}}>{theme}</h1>
                    <h4 className="mb0">Lorem </h4>
                  </div>
                  <div className="w-30 flex items-end" style={{ fontSize: '12px'}}>
                  </div>
                </header>
              </div>
              <div className="w-30 pa4 bg-white">

              </div>
            </div>
            <HendecagonChart data={data} countryKey={'BE'} countryName={'Belgium'} />
          </div>
      </div>
    );
  }
}

export default Country;
