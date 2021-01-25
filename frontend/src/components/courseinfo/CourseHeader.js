import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseInfo.css';
import RatingPill from '../shared/RatingPill';

const CourseHeader = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);

  useEffect(() => {}, []);
  // Example API request
  const fetchProfile = () => {
    $.ajax({
      url: '/api/v1/get_profile/',
      datatype: 'json',
      type: 'GET',
      success: (profile) => setProfile({ profile }),
    });
  };
  const rating = props.rating;
  const colorGradient = [
    '#009214',
    '#4d9600',
    '#739800',
    '#949900',
    '#b19a00',
    '#bd9100',
    '#c88800',
    '#d37d00',
    '#cf6800',
    '#ca5000',
    '#c53500',
    '#be0000',
  ];
  const backColor = colorGradient[12 - Math.ceil((rating / 5) * 12)];
  return (
    <div className="course-header row">
      <p className="text title" style={{ flex: 10 }}>
        {props.course.department}/{props.course.code}
        <br />
        {props.course.title}
      </p>
      <div className="column" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <div
          className="column"
          style={{  backgroundColor: backColor, height: "30%", borderRadius: '15px' }}
        >
          <h1 className="text white header "> {rating.toPrecision(3)} </h1>
        </div>


        <p> ec</p>
      </div>
    </div>
  );
};

export default CourseHeader;
