import React, { useState, useLayoutEffect } from 'react'
import { Circle, CheckCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import { useLocalStorage } from '../hooks'
import { useStore } from '../store'
import '../styles/components/CConsent.css'


const CConsent = () => {
  const [styles] = useSpring(() => ({
    from: {y: 1200},
    to: { y: 0 },
    delay: 1500
  }))
  const [acceptCookies, setAcceptCookies ] = useLocalStorage(
    process.env.REACT_APP_COOKIES_ACCEPTED_STORAGE_KEY,
    false
  )
  const [acceptAnalytics, setAcceptAnalytics ] = useLocalStorage(
    process.env.REACT_APP_GA_ACCEPTED_STORAGE_KEY,
    false
  )
  const color = useStore(state => state.backgroundColor)
  const [, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const toggleAcceptAnalytics = () => {
    if (acceptAnalytics === 'no') {
      setAcceptAnalytics('yes')
    } else {
      setAcceptAnalytics('no')
    }
  }

  useLayoutEffect(() => {
    if (!acceptCookies) {
      setIsOpen(true)
    }
  }, [acceptCookies])

  if (acceptCookies === 'yes') {
    return null;
  }
  return (
    <animated.div className="CConsent shadow-2 br2 ph2 pb3" style={{
      color,
      ...styles
    }}>
      <p
        className="tc mb2"
        dangerouslySetInnerHTML={{
          __html: t('textCookieConsent')
        }}
      />
      <div className="CConsent_analytics tc mb2 flex items-center justify-center" onClick={toggleAcceptAnalytics}>
        <div className="CConsent_analytics_switch">
          {!acceptAnalytics || acceptAnalytics === 'yes'
            ? <CheckCircle  />
            : <Circle />
          }
        </div>
        <div className="ml2">
          {t('cookieConsentAnalyticsToo')}
        </div>
      </div>
      <div className="mb2 mt3 tc">
        <Link
          to={`?panel=about`}
          className="text-white mr2"
        >
          {t('readMoreCookieConsent')}
        </Link>
        <button
          className="ba pl2 pr2 pb1 pt1 br2 mr2 inline-flex items-center ml2"
          onClick={() => {
            setIsOpen(false);
            setAcceptCookies('yes')
            if (acceptAnalytics !== 'no') {
              setAcceptAnalytics('yes')
            }
          }}
        >
          {t('actionCookieConsent')}
        </button>
      </div>
    </animated.div>
  )
}

export default CConsent
