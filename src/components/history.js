import React from 'react';

export const History = ({ history }) => {
  return <section className='history'>{history.join(' ')}</section>;
};
