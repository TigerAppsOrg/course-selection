import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'styles/Courses.css';
import 'styles/Requirements.css';
import 'styles/Print.css';
import 'styles/Menu.css';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/courses">TODO: Courses View</Route>
      <Route path="/list">TODO: List View</Route>
      <Route path="/tigerpath">
        <App />
        {/* TODO: Refactor App to TigerPath */}
      </Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);
