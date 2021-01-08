import React from 'react';

const CalcButton = ({ className, onClick, children }) => {
  return (
    <input
      type='button'
      className={className}
      onClick={(e) => onClick(e.target.value)}
      value={children}
    />
  );
};

export default CalcButton;
