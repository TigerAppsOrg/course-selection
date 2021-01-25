import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseInfo.css';
import CourseHeader from './CourseHeader';
import Ratings from './Ratings';
const CourseDetails = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
  console.log('Displaying Course', props.course);

  // Example API request
  const fetchProfile = () => {
    $.ajax({
      url: '/api/v1/get_profile/',
      datatype: 'json',
      type: 'GET',
      success: (profile) => setProfile({ profile }),
    });
  };

  return (
    <div className="details-column">
      <CourseHeader course={props.course} rating = {4.5} />
      <div className="row">
        <div className="scrollable-column">
          <p className="section-header"> Ratings </p>
          <Ratings  rating={3.87} />
          <Ratings  rating={5.0} />
          <Ratings  rating={4.5} />
          <Ratings  rating={3.2} />
          <p className="section-header"> Past Semesters </p>
        </div>
        <div className="scrollable-column">
          <p> column 2 </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
