import React from 'react'
import { useTranslation } from 'react-i18next'


const About = ({ color='white' }) => {
  const { t } = useTranslation()
  return (
    <div className="About h-100 pa2 pa5-l pa4-m" style={{color}}>
      <h1 className="ma0 pa0 mb4 f3 f2-m f1-l" style={{color}}>{t('AboutTitle')}</h1>

      <h3 style={{color}}>Timeline</h3>

      <p dangerouslySetInnerHTML={{ __html: t('AboutIntroduction')}} />
      <p dangerouslySetInnerHTML={{ __html: t('AboutConcept')}} />
      <p dangerouslySetInnerHTML={{ __html: t('AboutDevelopment')}} />
    </div>
  )
}
export default About
