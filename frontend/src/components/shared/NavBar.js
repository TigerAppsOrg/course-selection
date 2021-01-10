import React, { Component } from 'react';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/courses">
            CourseSelection
          </a>
          <div>
            <a
              className="btn nav-btn"
              href="/courses"
              rel="noopener noreferrer"
            >
              Courses
            </a>
            <a className="btn nav-btn" href="/list" rel="noopener noreferrer">
              List
            </a>
            <a
              className="btn nav-btn"
              href="/tigerpath"
              rel="noopener noreferrer"
            >
              TigerPath
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
