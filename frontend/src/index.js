import React from 'react';
import ReactDOM from 'react-dom';
import TigerPath from 'views/TigerPath';
import Path from 'views/PathPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'styles/Courses.css';
import 'styles/Requirements.css';
import 'styles/Print.css';
import 'styles/Menu.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import MainPage from './views/MainPage';
import AboutPage from './views/AboutPage';
import CoursesInfo from './views/CoursesInfo';
import CoursesList from './views/CoursesList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "'Open Sans', sans-serif",
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '33px',
      letterSpacing: '-0.01562em',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/courses">
          <CoursesInfo />
        </Route>
        <Route path="/list">
          <CoursesList />
        </Route>
        <Route path="/tigerpath">
          <Path />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app')
);
