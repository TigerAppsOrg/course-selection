import React, { useEffect, useState } from 'react';
import '../../styles/CourseInfo.css';

const RatingPill = (props) => {
  
    const rating =props.rating;
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
    console.log(colorGradient.length);
    const backColor = colorGradient[12- Math.ceil((rating / 5) * 12) ];
    console.log(backColor); 
    return (
      <div className="section row">
        <div className="column" style = {{flex: 7, textAlign: "left", marginBottom: "5px" }}>
          <p className="text"> Recommend to other students </p>
          <div style={{ backgroundColor: backColor, height: "6px", borderRadius:"3px", width: 67 * rating}}>
              <p> </p>
          </div> 
        </div>
  
        <div className = "column"
        style={{ flex : 1, backgroundColor: backColor, height: "20px", borderRadius: "15px" }}>
            <h1 className="text white "> {rating.toPrecision(3)} </h1>
       </div>
  
      </div>
    );
};

export default RatingPill;
