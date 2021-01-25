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
        onClick={() => setOpen(!open)}>
        <svg viewBox='0 0 24 24'>
          <path d='M11,7.4V13h4.68V11H13V7.4Zm7.36-1.76a9,9,0,0,0-12.72,0L5,6.31l-2-2V10H8.66L6.38,7.72l.67-.67a7,7,0,1,1-2,6h-2A9,9,0,0,0,12,21,9,9,0,0,0,18.36,5.64Z' />
        </svg>
      </i>
      <div className={logClasses.join(' ')}>
        {logHistory.length === 0 ? (
          "There's no history"
        ) : (
          <ul>
            {logHistory.map((logItem, index) => {
              const text = logOpertions(logItem);
              let result = logItem[logItem.length - 1];
              result = parseFloat(result).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 10,
              });

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
