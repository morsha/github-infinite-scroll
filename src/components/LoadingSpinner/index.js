// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import './index.scss';

type Props = {
  countDown?: Number,
};

const LoadingSpinner = ({
  countDown,
}: Props) => {
  const [count, setCount] = useState(countDown);

  useEffect(() => {
    if (countDown) {
      const intervalId = setInterval(() => {
        setCount(c => c - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }

    return () => null;
  }, [countDown]);

  return (
    <div className="loading-spinner-wrapper">
      <div className="loading-spinner" />
      {count ? (
        <span className="loading-spinner__countdown">{count}</span>
      ) : null}
    </div>
  );
};

LoadingSpinner.defaultProps = {
  countDown: 0,
};

export default LoadingSpinner;
