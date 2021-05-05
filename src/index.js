import React from 'react';
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import 'tachyons'
import App from './App'
import translations from './translations'
import './styles/index.scss'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: 'fr-FR',
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function(value, format, lng) {
        if (typeof value === 'number') {
          // adapt number
          console.info(value, format, lng)
          return new Intl.NumberFormat(lng, {
            maximumFractionDigits: format
          }).format(value)
        }
        return value;
      }
    }
  }).then( () => {
    console.info('translations loaded')
    ReactDOM.render(<App />, document.getElementById('root'));
  })

//registerServiceWorker();

console.info('version',
  process.env.REACT_APP_GIT_TAG,
  process.env.REACT_APP_GIT_BRANCH,
  `\nhttps://github.com/C2DH/statec-exhibit/commit/${process.env.REACT_APP_GIT_REVISION}`
)
