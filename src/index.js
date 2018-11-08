import React from 'react';
import ReactDom from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

import reducers from './reducers'
import * as serviceWorker from './serviceWorker'

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(ReduxThunk))(createStore);

ReactDom.render(
  <>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
)

serviceWorker.unregister();
