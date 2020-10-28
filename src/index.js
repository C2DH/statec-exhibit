import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'tachyons';
import './index.css';
import Header from './components/Header';
import MainBackground from './components/MainBackground';
import Home from './pages/Home';
import About from './About';
import Contents from './Contents';

const ChapterContainer = lazy(() => import('./ChapterContainer'));

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
