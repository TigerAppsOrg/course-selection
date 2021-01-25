import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
// import RatingPill from '../shared/RatingPill';
import '../../styles/CourseInfo.css';
import RatingPill from '../shared/RatingPill';

const Ratings = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);

  useEffect(() => {}, []);
  // Example API request
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
  const backColor = colorGradient[12- Math.ceil((rating / 5) * 12) ];
  const perc = (rating * 20 - 5).toString() + "%"

  return (
    <>
    <div className="section row seperate">
        <div className="column" style = {{flex: 7, textAlign: "left", marginBottom: "5px" }}>
          <p className="text normal"> Recommend to other students </p>
          <div style={{ backgroundColor: backColor, height: "6px", borderRadius:"3px", width: perc}}>
              <p> </p>
          </div> 
        </div>
        <RatingPill rating = {rating} /> 
    </div>
    </>
  );
};

export default Ratings;
