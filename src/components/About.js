import React from 'react'
import { useTranslation } from 'react-i18next'


const About = ({ color='white' }) => {
  const { t } = useTranslation()
  return (
    <div className="About h-100 pt5 pa3 pa4-m pa5-l" style={{color}}>
      <h1 className="ma0 pa0 mb4 f3 f2-m f1-l" style={{color}}>{t('AboutTitle')}</h1>
      <section className="f5 f4-m f3-l lh-copy">
      <p  dangerouslySetInnerHTML={{ __html: t('AboutIntroduction')}} />
      <p dangerouslySetInnerHTML={{ __html: t('AboutConcept')}} />
      <p dangerouslySetInnerHTML={{ __html: t('AboutDevelopment')}} />
      </section>
    </div>
  )
}
export default About