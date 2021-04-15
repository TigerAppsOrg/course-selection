import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseList.css';
import HourBox from './HourBox';
import DayBox from './DayBox';
import CourseDetails from '../courseinfo/CourseDetails';

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
  // console.log('Displaying Course', props.course);

  function adjustTime(int_time, str_time) {
    let output_time = "";
    if (int_time >= 1300) {
      str_time = String(int_time % 1200);
    }
    if (str_time.length == 4) {
      output_time = str_time[0] + str_time[1] + ":" + str_time[2] + str_time[3];
    }
    else {
      output_time = str_time[0] + ":" + str_time[1] + str_time[2];
    }
    // if (output_time[2] == "5") {
    //   output_time = output_time.substr(0, 2) + "3" + output_time.substr(3, output_time.length);
    // }
    return output_time;
  }

  for (let i = 0; i < classes.length; i++) {
    let str_start_time = String(classes[i].time);
    let int_start_time = parseInt(classes[i].time);
    let duration = parseInt(classes[i].duration);
    if (str_start_time[2] == "5") {
      str_start_time = str_start_time.substr(0, 2) + "3" + str_start_time.substr(3, str_start_time.length);
    }
    let start_time = adjustTime(int_start_time, str_start_time);

    console.log(start_time + ", duration of " + duration);
    let hour_diff = Math.floor(duration / 60);
    let min_diff = duration % 60;
    // let end_hour = parseInt(start_time.split(":")[0]) + hour_diff;
    // let end_min = parseInt(start_time.split(":")[1]) + min_diff;
    let end_hour = parseInt(str_start_time.substr(0, 2)) + hour_diff;
    let end_min = parseInt(str_start_time.substr(3, 5)) + min_diff;
    let int_end_time = end_hour * 100 + end_min;
    console.log(int_end_time);
    let str_end_time = String(end_hour) + String(end_min);
    console.log(str_end_time);
    str_end_time = adjustTime(int_end_time, str_end_time);
    if (int_start_time < 1200) {
      start_time += "am";
    }
    else {
      start_time += "pm";
    }
    if (int_end_time < 1200) {
      str_end_time += "am";
    }
    else {
      str_end_time += "pm";
    }
    classes[i].start = start_time;
    classes[i].end = str_end_time;
  }

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
      style = {{marginTop: (hourHeight + 2) * (curr.time - 800) / 100.0 + 0.5, height: curr.duration / 60 * hourHeight, background: curr.color}} > 
        <div className="course-time"> {curr.start} - {curr.end} </div> 
        <div className="course-code"> {curr.code} </div> 
        <div className="course-capacity" style = {{marginTop: curr.duration / 60 * hourHeight - 50}} > {curr.capacity} </div> 
      </div>)}
      {days.map((day)=> <HourBox isMonday = {props.isMonday} time = {day} />)}
    </div>
  );
};

export default DayColumn;
