import React from 'react';
import { numberWithCommas } from '../utils/helpers';

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

  return (
    <section className='display' style={displayStyleByLength}>
      {numberWithCommas(display)}
    </section>
  );
};
