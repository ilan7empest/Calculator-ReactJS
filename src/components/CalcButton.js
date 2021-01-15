import React from 'react';

import { svgSelector } from '../utils/svgSelector';
import './CalcButton.css';

const CalcButton = ({ name, type, className, onClick, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    return onClick(textContent);
  };
  return (
    <button
      type='button'
      id={name}
      className={className}
      onClick={(e) => handleClick(e)}>
      <span>{children}</span>
      {svgSelector(type)}
    </button>
  );
};
// onClick(e.target.textContent)
export default CalcButton;
