import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseList.css';
import HourBox from './HourBox';
import DayBox from './DayBox';

const DayColumn = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  const day = props.day;
  const classes = props.classes;
  const days = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"]
  const hourHeight = 45.0; 
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
    <div>
      <DayBox dotw={day}/>
      {classes.map((curr) => <div className = "course" 
      style = {{marginTop: (hourHeight + 2)* (curr.time - 800) / 100.0 , height: curr.duration / 60 * 50 }} > 
        <div> {curr.code} </div> 
      </div>)}
      {days.map((day)=> <HourBox isMonday = {props.isMonday} time = {day} />)}
    </div>
  );
};

export default DayColumn;
