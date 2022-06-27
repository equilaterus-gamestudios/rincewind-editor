import React, { useContext } from 'react'
import { shell } from 'electron';
import { EditorContext } from '../models/editor';

const Preferences = () => {
  const { 
    backgroundColor, setBackgroundColor, 
    backgroundUrl, setBackgroundUrl,
    numberRecentFiles, setNumberRecentFiles,
    autosaveTime, setAutosaveTime,
    autosaveHistory, setAutosaveHistory
  } = useContext(EditorContext);
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
          Search for <button className="link" onClick={() => { shell.openExternal('https://giphy.com/search/pixel-art')}}>pixelart backgrounds.</button>
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-4">
          <label>Recent files</label>  
        </div>
        <div className="col-8">       
          <input type="number" value={numberRecentFiles} onChange={(e) => setNumberRecentFiles(+e.target.value)} />          
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-4">
          <label>Auto save (minutes)</label>  
        </div>
        <div className="col-8">       
          <input type="number" value={autosaveTime} onChange={(e) => setAutosaveTime(+e.target.value)} />          
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-4">
          <label>Auto save history</label>  
        </div>
        <div className="col-8"> 
          <button className="btn w-100" onClick={() => setAutosaveHistory(!autosaveHistory)}>
            { autosaveHistory ? 'Yes' : 'No' }
          </button>
          <p><small>This option saves a copy of each auto-saved file. It's safer, but generates lots of files. <br/>
          <b>NOTE:</b> un-saved files and/or autosaved history files, are stored in the Editor Executable folder, subfolder /autosave/ named with a number indicating date and time; saved files have a <b>_tmp</b> on their same folder, as autosaved backup.</small></p>
        </div>
      </div>
    </>
  );
}

export default Preferences;
