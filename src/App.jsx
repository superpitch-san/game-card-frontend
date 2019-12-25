import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import './App.scss';

// pages
import {
  Home,
  Game,
} from './pages';

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route sensitive strict exact path="/game/cardmatch" component={Game} />
            <Route sensitive strict exact component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
