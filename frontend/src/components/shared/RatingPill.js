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
    const backColor = colorGradient[12- Math.ceil((rating / 5) * 12) ]; 

    return (  
        <div className = "column"
        style={{ flex : 1, backgroundColor: backColor, height: "60%", borderRadius: "15px" }}>
            <h1 className="text white "> {rating.toPrecision(3)} </h1>
       </div>
    );
};

export default RatingPill;
