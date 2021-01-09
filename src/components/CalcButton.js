import React from 'react';

const CalcButton = ({ className, onClick, children }) => {
  const handleClick = (e) => {
    const { textContent } = e.target;
    return onClick(textContent);
  };
  return (
    <button type='button' className={className} onClick={(e) => handleClick(e)}>
      {children}
    </button>
  );
};
// onClick(e.target.textContent)
export default CalcButton;
