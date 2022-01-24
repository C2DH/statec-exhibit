import React from 'react'
import {ArrowRight, Eye} from 'react-feather'
import BaseDataset from '../Dataset/BaseDataset'
import { StartYear, EndYear } from '../../constants'
import { useTranslation } from 'react-i18next'

const RangeButton = ({ from, to, color, isActive=false, className, style, children,...rest}) => {
  return (
    <button className={`ba bg-transparent pl2 pr2  br2 flex justify-between items-center ${className}`} style={{
      ...style,
      color: color,
      borderColor: isActive ? color : 'transparent',
    }} {...rest}>
      <div className="pv1">
      {children}
      </div>
    </button>
  )
}


const VisualisationViewerWrapper = ({
  color,
  chapter,
  sectionModule,
  paragraph,
  datasetId,
  data,
  keys,
  from,
  to,
  height,
  width,
  numericTranslationLabel
}) => {
  const [withAllValues, set] = React.useState(false)
  const { t } = useTranslation()
  return (
    <>
    <h1 className="f4 ma0 pa0 pb0 mb3 normal">{sectionModule.title}</h1>
    <div className="flex inline-flex items-center ba br3 pa1 mb3">
      <div className="ph2"><Eye size={14} /></div>

      <RangeButton
        color={color}
        from={paragraph.from}
        to={paragraph.to}
        onClick={() => set(false)}
        className=""
        isActive={!withAllValues}
      >
        <span className="ml1 mr1">{from}</span>
        <ArrowRight size={14}/>
        <span className="ml1 mr1">{to}</span>
      </RangeButton>
      <RangeButton
        color={color}
        from={StartYear}
        to={EndYear}
        className=""
        onClick={() => set(true)}
        isActive={withAllValues}
      >
        voir tout
      </RangeButton>
    </div>
    <label className="db mb3 f6 i" dangerouslySetInnerHTML={{__html: t(`dataset${data.id}`) }} />

    <BaseDataset
      data={data}
      id={datasetId}
      layout="Lines"
      colorKeys={paragraph.colorKeys}
      keys={paragraph.visibleKeys || keys}
      from={withAllValues ? undefined : from}
      to={withAllValues ? undefined : to}
      height={height/2}
      width={width - 20}
      displayDashedLine={false}
      numericTranslationLabel={numericTranslationLabel || data.numericTranslationLabel || 'number'}
    />
    <label className="db mt1 f6 i">
      {t('figcaptionLabel')}&nbsp;
      {data.sourceUrl
        ? data.source
          ? (
            <>
            <span dangerouslySetInnerHTML={{__html: data.title}} />
            &nbsp;&mdash;&nbsp;
            <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer">{data.source}</a>
            </>
          )
          : <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{__html: data.title}} />
        : <span dangerouslySetInnerHTML={{__html: data.title}} />
      }
    </label>
    </>
  )
}

export default VisualisationViewerWrapper
