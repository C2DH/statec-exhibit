import React from 'react';
import { isMobileWithTablet } from '../../constants';

class TrendLegend extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value?.t !== this.props.value?.t;
  }

  render() {
    const {
      title,
      progress,
      value,
      valueKey = 'v',
      legend,
      additionalTrends = [],
      additionalTrendsColors = [],
      t,
      direction,
    } = this.props;
    if (!progress || !value) {
      return null;
    }
    const mainValue = value[valueKey];
    const filteredAdditionalTrends = additionalTrends
      .map((k, i) => ({
        k,
        color: additionalTrendsColors[i],
      }))
      .filter((d) => d.k !== valueKey);

    return (
      <div
        className="moduleProgress TrendLegend"
        style={{
          marginLeft: 0,
          marginTop: isMobileWithTablet ? '20px' : 0,
          height: isMobileWithTablet ? '48px' : 'auto',
        }}
      >
        <span
          className=""
          style={{
            color: 'var(--secondary)',
          }}
        >
          {title}&nbsp;{direction ? '↑' : '↓'}&nbsp;
        </span>
        <span>
          <span className="underline mr2">{t('number', { n: mainValue })}</span>
          <span>{legend?.v} </span>
        </span>
        <span
          style={{
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          {filteredAdditionalTrends.map(({ k, color }, i) => (
            <span key={i} style={{ color }}>
              &nbsp;&middot;&nbsp;
              <span style={{ textDecoration: 'underline' }}>
                {t('number', { n: value[k] })}
              </span>
              &nbsp;
              <span>{legend[k]}</span>
            </span>
          ))}
        </span>
      </div>
    );
  }
}

export default TrendLegend;
