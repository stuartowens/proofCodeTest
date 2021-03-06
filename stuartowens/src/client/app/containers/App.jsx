import React, { Component } from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { env } from '../../../config.js'

import * as reducers from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && env === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const reducer = combineReducers(reducers)

class App extends Component {
  render() {
    return (
      <div>
      <h1>Heyyyyy1234</h1>
      {/* <Provider store={store}>
        <BrowserRouter>
          <div>
            <div className="container">
              <Switch>
                <Route path="/about" component={About} />
                <Route render={()=> <Redirect to="/about" />} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider> */}
      </div>
    )
  }
}

export default App;
