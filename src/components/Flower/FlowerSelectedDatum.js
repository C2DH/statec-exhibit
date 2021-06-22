import React from 'react'
import {useTranslation} from 'react-i18next'

const FlowerSelectedDatum = ({ data, datum, field='v', height=0, onChange, className, style }) => {
  const { t } = useTranslation()
  return (
    <div className={['FlowerSelectedDatum', className].join(' ')} style={style}>
      {datum
        ? (
          <div className="tc">
            {datum.t} <br/>
            <b className="bold">{t('number', {n: datum[field]})}</b>
          </div>
        ): null
      }
    </div>
  )
}

export default FlowerSelectedDatum
