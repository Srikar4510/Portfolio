import React from 'react';
import '../App.css';

const Background = ({ children }) => {
  return (
    <div className='relative z-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black  overflow-hidden'>
      <ul className="circles absolute inset-0 flex justify-center items-center space-x-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="circle bg-gradient-to-br from-purple-700 to-blue-700 rounded-full"></li>
        ))}
      </ul>
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default Background;
