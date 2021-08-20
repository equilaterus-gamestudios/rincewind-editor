import React, { useContext } from 'react';

import Preferences from '../components/Preferences';
import PreviewCol from '../components/PreviewCol';
import { EditorContext } from '../models/editor';
import { saveFile } from '../common/fileUtils';
import { LocationContext } from '../models/location';
import { LOCATIONS } from '../common/constants';

const PreferencesPage = () => {
  const { setPreferencesDefaults, getPreferencesToStore } = useContext(EditorContext);
  const { setLocation } = useContext(LocationContext);

  const onBack = () =>  setLocation(LOCATIONS.START);

  const onSave = async () => {
    await saveFile(JSON.stringify(getPreferencesToStore()), 'config.ini');
    onBack();
  }

  return (
    <div className="app">
      <div className="menu">
        <button className="btn" onClick={onSave}>Return and Save</button>
        <button className="btn" onClick={onBack}>Cancel</button>
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
