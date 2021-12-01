import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { store } from './app/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import Home from './pages/Home';
import NewsItem from './pages/Story';
import { PREFIX } from './app/config';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={`/${PREFIX}`}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:id" component={NewsItem} exact />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
