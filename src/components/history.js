import React from 'react';

export const History = ({ history }) => {
  // Todo: Save history to state on "="
  return <section className='history'>{history.join(' ')}</section>;
};
