import React from 'react';
import ReactDOM from 'react-dom';
import TigerPath from 'views/TigerPath';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'styles/Courses.css';
import 'styles/Requirements.css';
import 'styles/Print.css';
import 'styles/Menu.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/shared/Navbar';

ReactDOM.render(
  <Router>
    <NavBar />
    <Switch>
      <Route path="/courses">TODO: Courses View</Route>
      <Route path="/list">TODO: List View</Route>
      <Route path="/tigerpath">
        <TigerPath />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);
