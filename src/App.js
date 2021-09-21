import React, {Suspense} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainBackground from './components/MainBackground'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import TableOfContents from './components/TableOfContents'
import About from './components/About'
import MediaViewer from './components/MediaViewer'
import Panel from './components/Panel'
import { useStore } from './store'

const AppPanels = () => {
  const color = useStore(state => state.backgroundColor)

  return (
    <>
      <Panel name='about' left color={color}>
        <About color={color}/>
      </Panel>
      <Panel name='table-of-contents' color={color}>
        <TableOfContents color={color}/>
      </Panel>
      <Panel name='viewer' color={color}>
        <MediaViewer color={color} />
      </Panel>
    </>
  )
}
const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App
