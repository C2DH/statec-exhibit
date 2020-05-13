import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import 'tachyons';
import Home from './Home'
import Theme from './Theme'
import Country from './Country'
import registerServiceWorker from './registerServiceWorker'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className="w-100 h-100">
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
    <App />
  , document.getElementById('root'))
registerServiceWorker()
