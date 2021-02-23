import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import 'tachyons';
import './index.css';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import MainBackground from './components/MainBackground';
import Home from './pages/Home';
import About from './About';
import Contents from './Contents';

import translations from './translations'

const ChapterContainer = lazy(() => import('./ChapterContainer'));
const DocumentViewer = lazy(() => import('./pages/DocumentViewer'));


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <MainBackground />
      <Suspense fallback={''}>
        <About />
        <Contents />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/doc/:documentId" component={DocumentViewer} />
          <Route path="/:themeId" component={ChapterContainer} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: 'en-US',
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function(value, format, lng) {
        if(value instanceof Date) {
          if (format === 'fromNow') {
            return moment(value).fromNow()
          }
          return moment(value).format(format)
        } else if (typeof value === 'number') {
          // adapt number
          return new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: format }).format(value)
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
