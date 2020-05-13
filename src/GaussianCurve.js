import React, { Component } from 'react'
import { line } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import gaussianQ from './gaussian.json'
import gaussianP from './gaussian2.json'

const bellWidth = window.innerWidth * 0.8 / 20

const x = scaleLinear()
    .range([0, bellWidth])

const y = scaleLinear()
  .domain([0, 0.4])
const lineFx = line()
  .x(function(d) {
    return x(d.q)
  })
  .y(function(d) {
    return y(d.p)
  })

const normal = () => {
    let x = 0
    let y = 0
    let rds = null
    let c  = null
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c // throw away extra sample y * c
}

const gaussian = (x, scale) => {
	const gaussianConstant = (1 / Math.sqrt(2 * Math.PI))
	const	mean = 0
  const sigma = 1
  x = (x - mean) / sigma
  return gaussianConstant * Math.exp(-.5 * x * x) / sigma
}

// function plotOnBell(x,scale){
//   //This is the real workhorse of this algorithm. It returns values along a bell curve from 0 - 1 - 0 with an input of 0 - 1.
//   scale = scale || false;
//   var stdD = .125
//   var mean = .5
//   if(scale){
//     return  1 / (( 1/( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E , -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD,2))));
//   }else{
//      return (( 1/( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E , -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD,2)))) * plotOnBell(.5,true);
//   }
// }
//
// var step = .5;
// var limit = 100;
// var shapeAPoints = [];
// var shapeBPoints = [];
// var shapeCPoints = [];
// var shapeDPoints = [];
// var shapeEPoints = [];
//
// for(let i = step ; i < limit ; i += step){
//
//   var plot = plotOnBell(i / limit);
//
//   shapeAPoints.push([i, 50 - (50 * plot)]);
//   shapeBPoints.push([i, 50 - (40 * plot)]);
//   shapeCPoints.push([i, 50 - (30 * plot)]);
//   shapeDPoints.push([i, 50 - (20 * plot)]);
//   shapeEPoints.push([i, 50 - (10 * plot)]);
//
// }

export default class GaussianCurve extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: null,
    }
  }

  getData(countryData, scale) {
    let data =[]
    let qp = []
    // loop to populate data array with
    // probabily - quantile pairs
    for (var i = 0; i < 5000; i++) {
        const q = gaussianQ[i] // calc random draw from normal dist
        // const q = normal()
        // qp.push(q)
        //const p = gaussian(q, scale) // calc prob of rand draw
        const p = gaussianP[i]
        //qp.push(p)
        const el = {
            "q": q,
            "p": p
        }
        data.push(el)
    };

    // need to sort for plotting
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    data.sort(function(x, y) {
        return x.q - y.q;
    })

    //console.log(qp);

    x.domain(extent(data, d => d.q))
    y.range([ scale ? scale : countryData, 0])

    return lineFx(data)
  }

  // setHoverState = (i) => {
  //   this.setState({hover: i})
  // onMouseOver={() => this.setHoverState(index)} onMouseLeave={() => this.setHoverState(null)}
  // }

  render() {
    const {
      countryData,
      index,
      country,
      transform,
      quartile,
    } = this.props

    const containerWidth = window.innerWidth * 0.8
    const gaussianData = this.getData(countryData)
    const gaussianData1 = this.getData(countryData, 10)
    const gaussianData2 = this.getData(countryData, 20)
    const gaussianData3 = this.getData(countryData, 30)
    const gaussianData4 = this.getData(countryData, 40)
    const gaussianData5 = this.getData(countryData, 50)
    const gaussianData6 = this.getData(countryData, 60)
    const gaussianData7 = this.getData(countryData, 70)
    const gaussianData8 = this.getData(countryData, 80)
    const gaussianData9 = this.getData(countryData, 90)
    // const colors = [
    //   ['#49589c', '#5967a6', '#6a76b1', '#7a87bd', '#8a9acc'],
    //   ['#9cd7d3', '#abddd9', '#bae3e0', '#c9e9e7', '#d8efee'],
    //   ['#fac2ae', '#faccba', '#fad5c7', '#faded3', '#fae7e0'],
    //   ['#c73b4c', '#d15861', '#db7278', '#e68b93', '#f6a6b2'],
    // ]

    // const colors = [
    //   '#49589c',
    //   '#9cd7d3',
    //   '#fac2ae',
    //   '#c73b4c',
    // ]

    const colors = [
      ["#97A2CF", "#8E9ACC", "#8592C9", "#7C8AC6", "#7382C3", "#6B7BBF", "#6273BC", "#596BB9", "#5063B6", "#475BB3"],
      ["#CEF2EF", "#BFEDEA", "#B1E9E5", "#A2E4E0", "#94E0DB", "#85DBD5", "#77D7D0", "#68D2CB", "#5ACEC6", "#4BC9C1"],
      ["#FDE7DF", "#FDE0D6", "#FCD9CC", "#FCD1C3", "#FCCAB9", "#FBC3B0", "#FBBCA6", "#FBB49D", "#FAAD93", "#FAA68A"],
      ["#E08282", "#D67777", "#CC6B6B", "#C26060", "#B85555", "#AF4949", "#A53E3E", "#9B3333", "#912727", "#871C1C"]
    ]
    // let indexC
    // if (countryData < 20) {
    //   indexC = 4
    // } else if (countryData > 20 && countryData < 40) {
    //   indexC = 3
    // } else if (countryData > 40 && countryData < 60) {
    //   indexC = 2
    // } else if (countryData > 60 && countryData < 80) {
    //   indexC = 1
    // } else if (countryData > 80) {
    //   indexC = 0
    // }
    let indexC
    if (countryData <= quartile[0]) {
      indexC = 3
    } else if (countryData > quartile[0] && countryData <= quartile[1]) {
      indexC = 2
    } else if (countryData > quartile[1] && countryData <= quartile[2]) {
      indexC = 1
    } else if (countryData > quartile[2]) {
      indexC = 0
    }
    const randomColor = colors[indexC]
    const colorIndexMain = Math.ceil((countryData / 10)) -1

    return (
        <g transform={`translate(${bellWidth / 2},0)`}>

          <g transform={transform} style={{'opacity': this.state.hover === index ? 1 : (this.state.hover === null ? 1 : 0.5)}}>
            <path stroke={'black'} strokeOpacity={0.6} fill={randomColor[colorIndexMain]} style={{'fillOpacity': 1}} className="line" d={(gaussianData)} transform={`translate(0,${100 - (countryData)})`} />
            {
              countryData > 90 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[9]} style={{'fillOpacity': 1}} className="line" d={(gaussianData9)} transform={`translate(0,${100 - 90})`} />
            }
            {
              countryData > 80 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[8]} style={{'fillOpacity': 1}} className="line" d={(gaussianData8)} transform={`translate(0,${100 - 80})`} />
            }
            {
              countryData > 60 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[7]} style={{'fillOpacity': 1}} className="line" d={(gaussianData7)} transform={`translate(0,${100 - 70})`} />
            }
            {
              countryData > 60 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[6]} style={{'fillOpacity': 1}} className="line" d={(gaussianData6)} transform={`translate(0,${100 - 60})`} />
            }
            {
              countryData > 50 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[5]} style={{'fillOpacity': 1}} className="line" d={(gaussianData5)} transform={`translate(0,${100 - 50})`} />
            }
            {
              countryData > 40 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[4]} style={{'fillOpacity': 1}} className="line" d={(gaussianData4)} transform={`translate(0,${100 - 40})`} />
            }
            {
              countryData > 30 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[3]} style={{'fillOpacity': 1}} className="line" d={(gaussianData3)} transform={`translate(0,${100 - 30})`} />
            }
            {
              countryData > 20 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[2]} style={{'fillOpacity': 1}} className="line" d={(gaussianData2)} transform={`translate(0,${100 - 20})`} />
            }
            {
              countryData > 10 &&
              <path stroke={'black'} strokeOpacity={0.6} strokeDasharray={2} fill={randomColor[1]} style={{'fillOpacity': 1}} className="line" d={(gaussianData1)} transform={`translate(0,${100 - 10})`} />
            }
            <text className="text" transform={`translate(${(bellWidth / 2)},120)`} style={{'textAnchor': 'middle', fontSize: '13px'}}>
              {country}
            </text>
          </g>
        </g>
    )
  }
}
