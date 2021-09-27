import React from 'react'
import { useTranslation } from 'react-i18next'

const slugify = (text, separator='-') => {
  return text
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
}

const DownloadDataButton = ({ label, legend = {}, values, debug=false }) => {
  const filename = React.useMemo(() => `${slugify(label)}.csv`, [label])
  const { t } = useTranslation()
  if (!Array.isArray(values) || !values.length) {
    return null
  }
  // prepare data
  const headers = Object.keys(legend)
  const data = [
    headers.map(d => legend[d]).join(','),
    values.map(d => headers.map(h => d[h]).join(',')).join('\n')
  ].join('\n')
  const handleDebugClick = () => {
    console.info('headers', headers)
    console.info('data:\n', data)
  }

  if (debug) {
    return (
      <button className="f6 link dim dib black" onClick={handleDebugClick}>
        {t('downloadAsCSV')}&nbsp;↓
      </button>
    )
  }
  return (
    <a className="f6 link dim dib black tc" title={t('downloadAsCSV')} style={{
      border: '1px solid',
      height: 20,
      lineHeight: '18px',
      borderRadius: 3,
      padding: '0 4px'
    }}
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(data)}`}
      download={filename}
    >
      download .csv ⇣
    </a>
  )
}
export default DownloadDataButton
