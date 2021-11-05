import React from 'react';
import { useRincewindActions } from '../common/actions';

const StartActions = () => {
  const { onNewFile } = useRincewindActions();
  return (
    <>
      <p>Start</p>
      <ul>
        <li><button className="link" onClick={() => onNewFile(false)}>New empty file</button></li>
        <li><button className="link" onClick={() => onNewFile(true)}>New file from example</button></li>
      </ul>
    </>
  );
}

export default StartActions;
