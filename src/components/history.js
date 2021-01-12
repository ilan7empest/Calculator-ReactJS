import React, { useState, useEffect } from 'react';

export const History = ({ history, log }) => {
  const [newlog, setLog] = useState([]);

  useEffect(() => {
    setLog(log);
    return () => {};
  }, [log]);

  // Todo: Save history to state on "="
  return <section className='history'>{history.join(' ')}</section>;
};
