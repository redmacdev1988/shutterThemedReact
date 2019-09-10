import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './store';
import { Provider } from 'react-redux';
import Main from './main';
import Bio from './bio';
import Contact from './contact';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <Provider store={store}>
    <div>
      <Route path="/gallery" component={Main} />
      <Route path="/bio" component={Bio} />
      <Route path="/contact" component={Contact} />
    </div>
    </Provider>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
