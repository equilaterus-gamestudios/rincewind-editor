import React, { useEffect } from 'react';
import StartPage from './pages/StartPage';
import PreferencesPage from './pages/PreferencesPage';
import { Titlebar, Color } from 'custom-electron-titlebar'
import { ipcRenderer } from 'electron';
import { EditorContext, useEditorState } from './models/editor';
import { LocationContext, useLocationState } from './models/location';
import { LOCATIONS } from './common/constants';

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
      {location === LOCATIONS.START && <StartPage />}
      {location === LOCATIONS.PREFERENCES && <PreferencesPage />}
    </EditorContext.Provider>   
    </LocationContext.Provider>
  );
}

export default App;
