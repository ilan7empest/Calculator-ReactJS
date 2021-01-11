import React from 'react';

export const Display = ({ display }) => {
  // display formatting

  let formattedDispaly = parseFloat(display).toLocaleString();
  const match = display.match(/\.\d*?(0*)$/);

  if (match) formattedDispaly += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return <section className='display'>{formattedDispaly}</section>;
};
