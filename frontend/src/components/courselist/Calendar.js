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
  const monClasses = [{code: "COS126", time: 1000, duration: 80, capacity: "180/200", color: "#375C92"}];
  const tueClasses = [{code: "LIN201", time: 1300, duration: 50, capacity: "100/100", color: "#2D6334"}, {code: "EGR330", time: 1950, duration: 50, capacity: "28/30", color: "#614A95"}];
  const wedClasses = [{code: "COS126", time: 1000, duration: 80, capacity: "180/200", color: "#375C92"}];
  const thuClasses = [{code: "LIN201", time: 1300, duration: 50, capacity: "100/100", color: "#2D6334"}, {code: "EGR330", time: 1950, duration: 50, capacity: "28/30", color: "#614A95"}];
  const friClasses = [{code: "VIS265", time: 1250, duration: 80, capacity: "9/10", color: "#954962"}];
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
