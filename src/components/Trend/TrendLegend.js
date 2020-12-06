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
    const filteredAdditionalTrends = additionalTrends.map((k,i) => ({
      k,
      color: additionalTrendsColors[i],
    })).filter(d => d.k !== valueKey)

    return (
      <div className="moduleProgress TrendLegend">
          <span>
            <span className="underline mr2">{mainValue}</span>
            <span>
              {legend?.v}
            </span>
          </span>
          <span style={{
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          {filteredAdditionalTrends.map(({ k, color }, i) => (
            <span key={i} style={{ color }}>
              &nbsp;&middot;&nbsp;
              <span style={{ textDecoration: 'underline' }}>{value[k]}</span>
              &nbsp;
              <span>{legend[k]}</span>
            </span>
          ))}
          </span>
      </div>
    );
  }
};

export default TrendLegend
