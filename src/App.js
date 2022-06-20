import React, {Suspense} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import MainBackground from './components/MainBackground'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import TableOfContents from './components/TableOfContents'
import About from './components/About'
import Anaylitcs from './components/Analytics'
import CookieConsent from './components/CookieConsent'
import MediaViewer from './components/MediaViewer'
import Panel from './components/Panel'
import { useStore } from './store'
import { isMobile } from './logic/viewport'

const VisualisationViewer = React.lazy(() => import ('./components/VisualisationViewer'))

const AppPanels = () => {
  const color = useStore(state => state.backgroundColor)

  return (
    <>
      <Panel name='about' left color={color} withLine>
        <About color={color}/>
      </Panel>
      <Panel name='table-of-contents' color={color} withLine>
        <TableOfContents color={color}/>
      </Panel>
      <Panel name='viewer' color={color} isMobile={isMobile} Component={MediaViewer} />
      {isMobile && (
        <Panel name='vis' backgroundColor={color} color='var(--secondary)' >
          <Suspense fallback='loading'>
            <VisualisationViewer color='var(--secondary)' />
          </Suspense>
        </Panel>
      )}
    </>
  )
}
const App = () => {
  return (
    <BrowserRouter>
      <CookieConsent />
      <Anaylitcs />
      <QueryParamProvider ReactRouterRoute={Route}>
      <ScrollToTop />
      <MainBackground />
      <AppPanels/>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:chapterId" component={Chapter} />
        </Switch>
      </Suspense>
      </ QueryParamProvider>
    </BrowserRouter>
  );
}

export default App
