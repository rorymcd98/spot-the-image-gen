import React from 'react'
import { EuiIcon, EuiText, EuiFlexGroup, useEuiTheme} from "@elastic/eui";
import { useClockStore } from '../../Store';

export const  ClockCounter: React.FC = () => {
  const {time_seconds, incrementTime} = useClockStore();

  React.useEffect(() => {
    const interval = setInterval(() => {
      incrementTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <EuiFlexGroup justifyContent='center' alignItems='center' gutterSize='s'>
      <EuiText size='relative' color='text'>
        {time_seconds >= 60 ? Math.floor(time_seconds/60) + ':' + (time_seconds%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) : time_seconds}
      </EuiText>
      <EuiIcon type="clock" size="l"/>
    </EuiFlexGroup>
  )
}