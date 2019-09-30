import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => (
  <div className="loading-panel">
    <LoadingIcon/>
  </div>
);

const LoadingIcon = () => (
  <svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
       preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50"
            fill="none"
            strokeLinecap="round" r="40" strokeWidth="4" stroke="#14A5D7"
            strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(71.7235 50 50)">
      <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50"
                        keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export default LoadingSpinner;
