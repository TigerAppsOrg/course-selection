import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseList.css';
const DayColumn = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  const dotw = props.dotw;

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
    <div className="day-box">
      {/* <p className="section-header"> Ratings </p> */}
      <p className="dotw">{dotw}</p>
    </div>
  );
};

export default DayColumn;
