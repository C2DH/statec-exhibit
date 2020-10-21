import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useStore } from './store'
import 'tachyons';
import './index.css';
import Header from './components/Header'
import Home from './pages/Home';
import About from './About';
import Contents from './Contents';

const ChapterContainer = lazy(() => import('./ChapterContainer'))

const MainBackground = () => {
  const backgroundColor =  useStore((state) => state.backgroundColor);
  return (
    <div className="vh-100 w-100 fixed" style={{
      backgroundColor,
      top: 0,
      bottom: 0,
      zIndex: -1,
    }}></div>
  )
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <MainBackground />
        <Suspense fallback={''}>
          <About />
          <Contents />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:themeId" component={ChapterContainer} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
