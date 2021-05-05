import React, {Suspense} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainBackground from './components/MainBackground'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
// import About from './pages/About'
// import Contents from './pages/Contents'
//

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainBackground />
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
