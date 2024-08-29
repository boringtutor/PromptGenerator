import React from "react";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="10%" cy="10%" r="50" fill="rgba(147, 51, 234, 0.1)" />
        <circle cx="90%" cy="20%" r="70" fill="rgba(236, 72, 153, 0.1)" />
        <path d="M 50 50 L 150 150 L 250 50 Z" fill="rgba(147, 51, 234, 0.1)" />
        <path
          d="M 70% 60% L 80% 70% L 90% 60% Z"
          fill="rgba(236, 72, 153, 0.1)"
        />
        <rect
          x="20%"
          y="70%"
          width="150"
          height="150"
          fill="none"
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth="2"
        />
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke="rgba(236, 72, 153, 0.1)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Background;
