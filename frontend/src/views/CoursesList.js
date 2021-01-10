import React, { Component } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    ajaxSetup();
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  // Example API request
  fetchProfile = () => {
    $.ajax({
      url: '/api/v1/get_profile/',
      datatype: 'json',
      type: 'GET',
      success: (profile) => this.setState({ profile }),
    });
  };

  render() {
    return (
      <ThemeProvider theme={COURSESELECTION_THEME}>
        <React.Fragment>TODO Courses List</React.Fragment>
      </ThemeProvider>
    );
  }
}
