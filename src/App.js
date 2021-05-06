import React, {Suspense} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainBackground from './components/MainBackground'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import TableOfContents from './components/TableOfContents'
import Panel from './components/Panel'
//

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainBackground />
      <Panel name='about' left>
        About page.
      </Panel>
      <Panel name='table-of-contents'>
        <TableOfContents />
      </Panel>
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
