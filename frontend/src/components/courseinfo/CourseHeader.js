import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseInfo.css';

const CourseHeader = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);

  useEffect(() => {

  }, []); 
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
    <div className="course-header">
      <p className = 'title text'>
          {props.course.department}/{props.course.code}
          <br/>
          {props.course.title} 
      </p>
    
    </div>
  );
};

export default CourseHeader;
