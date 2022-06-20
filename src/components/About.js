import React from 'react'
import { useTranslation } from 'react-i18next'
import { Circle, CheckCircle } from 'react-feather'
import Footer from '../components/Footer'
import { useLocalStorage } from '../hooks'
import '../styles/pages/about.css'


const About = ({ color='white' }) => {
  const { t } = useTranslation()
  const [acceptAnalytics, setAcceptAnalytics ] = useLocalStorage(
    process.env.REACT_APP_GA_ACCEPTED_STORAGE_KEY,
    false
  )

  const toggleAcceptAnalytics = () => {
    if (acceptAnalytics === 'no') {
      setAcceptAnalytics('yes')
    } else {
      setAcceptAnalytics('no')
    }
  }

  return (
    <div className="About mb5" style={{color}}>
      <h1 className="ma0 pa0 mb4 f3 f2-m f1-l" style={{color}}>{t('AboutTitle')}</h1>
      <section className="f5 f4-m f3-l lh-copy">
      <div dangerouslySetInnerHTML={{ __html: t('AboutIntroduction')}} />
      <div dangerouslySetInnerHTML={{ __html: t('AboutConcept')}} />
      <div dangerouslySetInnerHTML={{ __html: t('AboutDevelopment')}} />
      <div dangerouslySetInnerHTML={{ __html: t('AboutTermsOfUse')}} />
      <b>{t('AboutCookieCustomise')}</b>
      <p dangerouslySetInnerHTML={{
        __html:t('AboutCookieCustomiseDescription')
      }} />
      <div
        className="About_switch extra-border ph3 ba pb1 tc mb2 inline-flex items-center justify-center"
        onClick={toggleAcceptAnalytics}
        style={{
          boxShadow: `inset -1px -1px 1px ${color}`
        }}
      >
        <div className="pt2">
          {!acceptAnalytics || acceptAnalytics === 'yes'
            ? <CheckCircle  />
            : <Circle />
          }
        </div>
        <div className="ml2">
          {t('cookieConsentAnalytics')}
        </div>
      </div>
      <Footer color={color} className="About_Footer flex flex-column items-start mv4 mv3-ns"/>
      </section>
    </div>
  )
}
export default About
