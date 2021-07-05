import React from 'react'
import { useTranslation } from 'react-i18next'
import '../../styles/components/compare.scss'


const Compare = ({
  groupValues=[], minValue, maxValue, datasetId, hidePercentage, width
}) => {
  const { t } = useTranslation()
  if (!groupValues.length) {
    return null
  }
  const keyToCompareWith = groupValues[0].key
  // const columns = groupValues[0].values.length
  return (
    <div style={{width, overflow: 'auto'}}>
    <div
      className="Compare relative dt pl4 w-100"

    >
      <div className="dt-row " >
        <div className="dtc ph2 bb Compare_firstcell">&nbsp;</div>
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
        <div className="Compare_row dt-row-group" key={i}>
          <div className="dt-row" style={{fontSize: '12px'}}>
            <div className="dtc ph2 Compare_firstcell">
              <span>{g.legend}</span>
            </div>
            {g.values.map((v, j) => (
              <div
                className={`dtc ph2 tr ${hidePercentage ? 'bb' : ''}`}
                key={`${g.key}-${j}`}
              >
                <span>{t('number', { n: v[g.key] })}</span>
              </div>
            ))}
          </div>
          {hidePercentage
            ? null
            : (
              <div className="dt-row " style={{fontSize: '12px'}}>
                <div className="dtc ph2 bb Compare_firstcell">

                </div>
                {g.values.map((v, j) => {
                  const percentage = v[g.key]/v[keyToCompareWith] * 100
                  return (<div
                    className="dtc ph2 tl bb Compare_cellpercentage"
                    key={`${g.key}-${j}`}
                    style={{
                      background: `linear-gradient(to right, transparent 1%, var(--data-background) 0%, var(--data-background) ${percentage}%, transparent ${percentage}%)`,
                      backgroundSize: '100% 25%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'bottom',

                      marginLeft: 2,
                    }}
                  >
                    {t('percentage', { n: percentage })}
                  </div>
                )})}
              </div>
            )
          }
        </div>
      ))}
    </div>
    </div>
  )
}


export default Compare;
