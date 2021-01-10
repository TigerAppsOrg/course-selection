import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from 'components/shared/NavBar';
import TigerPath from 'views/TigerPath';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'styles/Courses.css';
import 'styles/Requirements.css';
import 'styles/Print.css';
import 'styles/Menu.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import CoursesInfo from './views/CoursesInfo';
import CoursesList from './views/CoursesList';

ReactDOM.render(
  <Router>
    <NavBar />
    <Switch>
      <Route path="/courses">
        <CoursesInfo />
      </Route>
      <Route path="/list">
        <CoursesList />
      </Route>
      <Route path="/tigerpath">
        <TigerPath />
      </Route>
      <Route path="/">TODO - main page</Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);
