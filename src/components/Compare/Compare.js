import React from 'react'
import { useTranslation } from 'react-i18next'


const Compare = ({
  groupValues=[], minValue, maxValue, datasetId
}) => {
  const { t } = useTranslation()
  if (!groupValues.length) {
    return null
  }
  const keyToCompareWith = groupValues[0].key
  const columns = groupValues[0].values.length
  return (
    <div
      className="Compare dt pl4 w-100"
    >
      <div className="dt-row " >
        <div className="dtc ph2 bb" style={{ width: 100 }}>&nbsp;</div>
        {groupValues[0].values.map((v, i) => (
          <div
            className="dtc ph2 tr bb"
            key={i}
          >
            {v.t}
          </div>
        ))}
      </div>
      {groupValues.map((g, i) => (
        <React.Fragment key={i}>
          <div className="dt-row" style={{fontSize: '12px'}}>
            <div className="dtc ph2" style={{ width: 100 }}>
              {g.legend}
            </div>
            {g.values.map((v, j) => (
              <div
                className="dtc ph2 tr"
                key={`${g.key}-${j}`}
              >
                {t('number', { n: v[g.key] })}
              </div>
            ))}
          </div>
          <div className="dt-row" style={{fontSize: '12px'}}>
            <div className="dtc ph2 bb" style={{ width: 100 }}>

            </div>
            {g.values.map((v, j) => {
              const percentage = v[g.key]/v[keyToCompareWith] * 100
              return (<div
                className="dtc ph2 tl bb"
                key={`${g.key}-${j}`}
                style={{
                  background: `linear-gradient(to right, transparent 1%, var(--data-background) 0%, var(--data-background) ${percentage}%, transparent ${percentage}%)`,
                  backgroundSize: '100% 25%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom',
                  color: 'var(--data-background)',
                  borderColor: 'var(--secondary)',
                  marginLeft: 2,
                }}
              >
                {t('percentage', { n: percentage })}
              </div>
            )})}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}


export default Compare;
