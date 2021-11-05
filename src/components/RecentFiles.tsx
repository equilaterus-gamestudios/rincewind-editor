import React, { useContext } from 'react';
import { useRincewindActions } from '../common/actions';
import { EditorContext } from '../models/editor';

const RecentFiles = () => {
  const { onLoadFile } = useRincewindActions();
  const { recentFiles } = useContext(EditorContext);
  if (recentFiles.length === 0) {
    return null;
  }
  return (
    <>
      <p>Recent files</p>
      <ul>
        {recentFiles.map(file => (
          <li><button className="link" onClick={() => onLoadFile(file)}>{file}</button></li>
        ))}        
      </ul>
    </>
  );
}

export default RecentFiles;
