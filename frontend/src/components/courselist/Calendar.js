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
        <DayColumn day="MON"/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="TUE"/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="WED"/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="THU"/> 
        </div>
        <div className="scrollable-column">
        <DayColumn day="FRI"/> 
        </div>
      </div> 
    </div>
  );
};

export default Calendar;
