import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseInfo.css';
import CourseHeader from '../courseinfo/CourseHeader';
import Ratings from '../courseinfo/Ratings';
import DayColumn from './DayColumn';

const Calendar = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  const monClasses = [{code: "COS126", time: 1000, duration: 80}];
  const tueClasses = [{code: "LIN201", time: 1300, duration: 50}, {code: "EGR330", time: 1400, duration: 50}];
  const wedClasses = [{code: "COS126", time: 1000, duration: 80}];
  const thuClasses = [{code: "LIN201", time: 1300, duration: 50}, {code: "EGR330", time: 1400, duration: 50}];
  const friClasses = [{code: "VIS265", time: 1250, duration: 80}];
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
      <div className="row">
        <div className="scrollable-column">
        <DayColumn day="MON" classes={monClasses} isMonday = {true} /> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="TUE" classes={tueClasses}/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="WED" classes={wedClasses}/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="THU" classes={thuClasses}/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="FRI" classes={friClasses}/> 
        </div>
      </div> 
    </div>
  );
};

export default Calendar;
