import React from 'react'


class TrendLegend extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value?.t !== this.props.value?.t
  }

  render() {
    const {
      progress,
      value,
      valueKey = 'v',
      date,
      legend,
      additionalTrends = [],
      additionalTrendsColors = []
    } = this.props
    if (!progress || !value) {
      return null
    }
    const mainValue = value[valueKey]
    return (
      <div className="moduleProgress TrendLegend">
          <div>
            <span className="underline mr2">{mainValue}</span>
            <span>
              {legend?.v} in {date}
            </span>
          </div>
          <div  className="mt2" style={{
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          {additionalTrends.map((k,i) => (
            k === valueKey
            ? null
            : <span key={i}>{legend[k]} <b className="ba pa1" style={{
              color: additionalTrendsColors[i]
              }}>{value[k]}</b> </span>
          ))}
          </div>
      </div>
    );
  }
};

export default TrendLegend
