import React, { useState, useEffect, Fragment } from 'react';

import classes from './Log.module.css';

const Log = ({ log }) => {
  const [logHistory, setLogHistory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLogHistory(log);
    return () => {};
  }, [log]);

  const logClasses = [classes.log];
  if (open) {
    logClasses.push(classes.openLog);
  }

  const logOpertions = (logItem) => {
    let logJoin = logItem.join(' ');
    logJoin = logJoin.slice(0, logJoin.lastIndexOf(' '));

    return logJoin;
  };

  return (
    <Fragment>
      <i
        className={classes.historyIcon}
        alt='View History'
        onClick={() => setOpen(!open)}
      />
      <div className={logClasses.join(' ')}>
        {logHistory.length === 0 ? (
          "There's no history"
        ) : (
          <ul>
            {logHistory.map((logItem, index) => {
              const text = logOpertions(logItem);
              const result = logItem[logItem.length - 1];

              return (
                <li key={index} className='d-flex flex-column mb-3'>
                  <span>{text}</span>
                  <span className='fs-3 lh-1'>{result}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default Log;
