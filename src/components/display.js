import React from 'react';

export const Display = ({ display }) => {
  // display formatting
  const formatDisplay = parseFloat(display).toLocaleString();
  return <section className='display'>{formatDisplay}</section>;
};
