import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseList.css';
const DayColumn = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  const time = props.time;

  useEffect(() => {
    fetchProfile();
  }, []);
  // console.log('Displaying Course', props.course);

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
    <div className="hour-box">
      {/* <p className="section-header"> Ratings </p> */}
      {props.isMonday ? <p className="time">{time}</p> : null} 
    </div>
  );
};

export default DayColumn;
