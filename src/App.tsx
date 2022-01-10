import React, { useEffect } from 'react';
import StartPage from './pages/StartPage';
import PreferencesPage from './pages/PreferencesPage';
import { Titlebar, Color } from 'custom-electron-titlebar';
import { ipcRenderer } from 'electron';
import { EditorContext, useEditorState } from './models/editor';
import { LocationContext, useLocationState } from './models/location';
import { LOCATIONS } from './common/constants';
import EditorPage from './pages/EditorPage';
import Autosave from './components/Autosave';

// Custom title bar
export const titlebar = new Titlebar({
	backgroundColor: Color.fromHex('#000'),
  icon: `${process.env.PUBLIC_URL}/icon.png`
});

// Is dev?
export let isDev: boolean;
const setIsDev = async () => { isDev = await ipcRenderer.invoke('is-dev') as boolean; };

const App = () => {
  // On mount set isDev value
  useEffect(() => {
    setIsDev();
  }, [])
  
  const editorState = useEditorState();
  const locationState = useLocationState(); 
  const location = locationState.location;
  return (
    <LocationContext.Provider value={locationState}>
    <EditorContext.Provider value={editorState}>
      <>
        <Autosave saveTime={editorState.autosaveTime} />
        {location === LOCATIONS.START && <StartPage />}
        {location === LOCATIONS.PREFERENCES && <PreferencesPage />}
        {location === LOCATIONS.EDITOR && <EditorPage />}
      </>
    </EditorContext.Provider>   
    </LocationContext.Provider>
  );
}

export default App;
