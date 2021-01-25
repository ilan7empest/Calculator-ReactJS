import React from 'react';

export const Display = ({ display }) => {
  // display formatting

  let displayStyleByLength = {};
  if (display.length > 5 && display.length < 9) {
    displayStyleByLength = {
      fontSize: '3em',
    };
  } else if (display.length >= 9) {
    displayStyleByLength = {
      fontSize: '2em',
    };
  }

  let formattedDispaly = parseFloat(display).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  });
  const match = display.match(/\.\d*?(0*)$/);

  if (match) formattedDispaly += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <section className='display' style={displayStyleByLength}>
      {formattedDispaly}
    </section>
  );
};
