import React from 'react'

class TrendHotspotsGraphics extends React.Component{
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id
  }

  render() {
    console.info('rendering TrendStaticGraphics', this.props.id)
    const {marginLeft, marginTop, hotspots, scaleX, scaleY, radius=4} = this.props;
    return <g transform={`translate(${marginLeft}, ${marginTop})`}>
      {hotspots.map((d, i) => {
        return (
          <circle
            key={i}
            cx={scaleX(d.t)}
            cy={scaleY(d.v)}
            fill='red'
            r={radius}
          />
        );
      })}
      </g>
  }
}

export default TrendHotspotsGraphics
