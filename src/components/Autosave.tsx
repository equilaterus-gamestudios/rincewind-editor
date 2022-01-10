import React, { useEffect, useState } from 'react';
import { useRincewindActions } from '../common/actions';

const Autosave = ({ saveTime }) => {
  const [time, setTime] = useState(saveTime);
  const { onAutoSave } = useRincewindActions();

  useEffect(() => {
    // SaveTime is given in minutes
    const saveTimeSecs = saveTime * 60
    if (time >= saveTimeSecs) {
      setTime(0); 
      onAutoSave();
    }
    
    const intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(intervalId);

    // Ignore onAutoSave to avoid extra calls to this effect
    // eslint-disable-next-line
  }, [time, saveTime]);

  return (
    <></>
  );
}

export default Autosave;
