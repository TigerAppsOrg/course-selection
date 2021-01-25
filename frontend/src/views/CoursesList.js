import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../styles/CourseInfo.css';
import Search from '../components/tigerpath/Search.js';
import CourseDetails from '../components/courseinfo/CourseDetails'

const CourseList = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 
  
  const course = {
    title: 'Computer Science: An Interdisciplinary Approach  ', 
    department: 'COS', 
    code: '126', 
    crossList : 'EGR', 
    tags: ['EC', 'NO AUDIT', 'PDF'], 
    rating: [4.01], 
    description: ['Introduction to the principles underlying chemical and biochemical engineering. This course begins with the basics of engineering calculations, and continues on to the core subjects of material and energy balances in single and multi-phase systems; both with and without reactions. The topics in this course lay the bedrock for the remaining CBE curriculum, and students will see the subjects that they learn here time and again in their future CBE courses.']
  }; 


  useEffect(() => {
    fetchProfile();
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
    <ThemeProvider theme={COURSESELECTION_THEME}>
      <div className="main-view">
      {/* <div id="search-pane" className="col-lg-2 pl-0 pr-0 dont-print" id = 'search-column'>
          <Search
            onChange={setSearchQuery}
            searchQuery={searchQuery}
            searchResults={searchResults}
          />
        </div> */}
        <div className = 'search-column'> 
          <p> Search Bar </p>
        </div>
        <CourseDetails course = {course} /> 
        <div className = 'shopping-cart'>
          <p> Cart </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CourseList;
