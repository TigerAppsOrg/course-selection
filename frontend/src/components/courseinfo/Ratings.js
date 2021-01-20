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

  return (
      <>
    <RatingPill rating = {3.87} /> 
    <RatingPill rating = {5.00} /> 
    <RatingPill rating = {4.50} /> 
    <RatingPill rating = {3.20} /> 
    </>
  );
};

export default Ratings;
