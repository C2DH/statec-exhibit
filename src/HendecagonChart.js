import React, { Component } from 'react'
import { line } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { omit } from 'lodash'
import gaussianQ from './gaussian.json'
import gaussianP from './gaussian2.json'
import GaussianCurve from './GaussianCurve'
const bellWidth = 60

export default class HendecagonChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: null,
    }
  }

  render() {
    const {
      data,
      dataKey,
      countryKey,
    } = this.props

    const containerWidth = window.innerWidth * 0.7
    const countryData = data.filter(d => d.country_code === countryKey)
    const filteredCountryData = Object.values(omit(countryData[0], ['country','country_code']))

    const quartiles = {
      'macro_1': [
        38.1,
        67.9,
        83.4,
      ],
      'macro_2': [
        58.6,
        73.9,
        85.8,
      ],
      'macro_3': [
        27.0,
        41.2,
        75.1,
      ],
      'macro_4': [
        29.6,
        37.3,
        53.8,
      ]
    }

    return (
      <svg width={containerWidth} height="600">
        <g transform={`translate(${containerWidth/2},300)`}>
        {
          filteredCountryData.map((d, i) => {
            console.log(d)
            return (
              <g transform={`rotate(360, 0, 0)`}>
                <GaussianCurve
                  transform={`translate(${-60},${-60}) rotate(${32 * i}, ${0}, 0) scale(1, -1)`}
                  countryData={d}
                  key={i}
                  index={i}
                  country={countryKey}
                  quartile={quartiles[dataKey]}
                />
              </g>
            )
          })
        }
        </g>
      </svg>
    )
  }
}
