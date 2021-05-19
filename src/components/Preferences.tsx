import React, { useContext } from 'react'
import { shell } from 'electron';
import { EditorContext } from '../hooks/useEditor';

const Preferences = () => {
  const { backgroundColor, setBackgroundColor, backgroundUrl, setBackgroundUrl} = useContext(EditorContext);
  return (
    <>
      <div className="row pt-2">
        <div className="col-4">
          <label>Background Color</label>
        </div>
        <div className="col-8">       
          <input type="text" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}/>
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-4">
          <label>Background URL</label>  
        </div>
        <div className="col-8">       
          <input type="text" value={backgroundUrl} onChange={(e) => setBackgroundUrl(e.target.value)} />
          Search for <a onClick={() => { shell.openExternal('https://giphy.com/search/pixel-art')}}>pixelart backgrounds.</a>
        </div>
      </div>
    </>
  );
}

export default Preferences;