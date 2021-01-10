import React from 'react';

const CalcButton = ({ className, onClick, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    return onClick(textContent);
  };
  return (
    <button
      type='button'
      id={`key-${children}`}
      className={className}
      onClick={(e) => handleClick(e)}>
      {children}
    </button>
  );
};
// onClick(e.target.textContent)
export default CalcButton;
