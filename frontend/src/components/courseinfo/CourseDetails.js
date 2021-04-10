import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { ajaxSetup } from 'AjaxSetup';
import { ThemeProvider } from 'styled-components';
import { COURSESELECTION_THEME } from 'styles/theme';
import '../../styles/CourseInfo.css';
import CourseHeader from './CourseHeader';
import Ratings from './Ratings';
import { PieChart } from 'react-minimal-pie-chart';

const CourseDetails = (props) => {
  ajaxSetup();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetchProfile();
  }, []);

  const course = {
    title: 'Computer Science: An Interdisciplinary Approach  ',
    department: 'COS',
    code: '126',
    crossList: 'EGR',
    reviews: [
      'Make sure to watch the lectures every week, you will have a hard time with the assignments otherwise',
      'It is very helpful to have computer science background, otherwise the course is a LOT of work',
    ],
    tags: ['EC', 'NO AUDIT', 'PDF'],
    rating: [4.01],
    description: [
      'Introduction to the principles underlying chemical and biochemical engineering. This course begins with the basics of engineering calculations, and continues on to the core subjects of material and energy balances in single and multi-phase systems; both with and without reactions. The topics in this course lay the bedrock for the remaining CBE curriculum, and students will see the subjects that they learn here time and again in their future CBE courses.',
    ],
  };

  console.log('Displaying Course', course);
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
      <CourseHeader course={props.course} rating={4.5} />
      <div className="row">
        <div className="scrollable-column">
          <p className="section-header"> Ratings </p>
          <Ratings rating={3.87} />
          <Ratings rating={5.0} />
          <Ratings rating={4.5} />
          <Ratings rating={3.2} />
          <p className="section-header"> Reviews </p>

          {course.reviews.map((review) => (
            <div className="background" key={review}>
              <p className="text-normal"> {review} </p>
            </div>
          ))}
        </div>

        <div className="scrollable-column">
          <p className="section-header"> Description </p>
          <div className="background">
            <p className="text-normal"> {course.description} </p>
          </div>
          <p className="section-header"> Grading </p>
          <div className="background grading">
            <PieChart
              radius={3.7}
              center={[10, 5]}
              viewBoxSize={[10, 10]}
              label={(data) => '%' + data.dataEntry.value}
              labelStyle={{
                fontSize: '1px',
                fontFamily: 'Open Sans',
                fontWeight: '1px',
                fontColor: '#FFFFFA',
              }}
              data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
