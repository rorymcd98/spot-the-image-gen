import React, { useEffect } from 'react';
import { EuiIcon, EuiText, EuiFlexGroup } from '@elastic/eui';
import {
  useProgressStore,
  usePaintingNameStore,
} from '../../../../../state-management/Store';

export const ClockCounter: React.FC = () => {
  const { paintings, incrementTime } = useProgressStore();
  const { paintingName } = usePaintingNameStore();
  const time_seconds = paintings[paintingName].timeSpent_seconds;

  const isComplete = paintings[paintingName].isComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isComplete) {
        incrementTime(paintingName);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [paintingName, isComplete, incrementTime]);

  return (
    <EuiFlexGroup justifyContent="center" alignItems="center" gutterSize="s">
      <EuiText size="relative" color="text">
        {time_seconds >= 60
          ? Math.floor(time_seconds / 60) +
            ':' +
            (time_seconds % 60).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          : time_seconds}
      </EuiText>
      <EuiIcon type="clock" size="l" />
    </EuiFlexGroup>
  );
};
