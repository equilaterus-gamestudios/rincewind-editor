import React, { useContext } from 'react';
import history from '../history';
import Preview from '../components/Preview';
import Preferences from '../components/Preferences';
import PreviewCol from '../components/PreviewCol';
import { EditorContext } from '../hooks/useEditor';

const PreferencesPage = () => {
  const { setPreferencesDefaults } = useContext(EditorContext);

  return (
    <div className="app">
      <div className="menu">
        <button className="btn" onClick={() => history.push('/')}>Return and Save</button>
        <button className="btn" onClick={() => history.push('/')}>Cancel</button>
        <button className="btn" onClick={setPreferencesDefaults}>Default</button>
      </div>
      <div className="editor">
        <div className="preferences-col container-fluid">      
          <Preferences />
        </div>
        <PreviewCol enabled={true} />
      </div>
    </div>
  );
};

export default PreferencesPage;
