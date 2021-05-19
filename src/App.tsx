import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import { Titlebar, Color } from 'custom-electron-titlebar'
import { ipcRenderer } from 'electron';
import { EditorContext, useEditorState } from './hooks/useEditor';


export const titlebar = new Titlebar({
	backgroundColor: Color.fromHex('#000'),
  icon: `${process.env.PUBLIC_URL}/Rincewind.ico`
});

const getIsDev = async () => (await ipcRenderer.invoke('is-dev'))
export const isDev = getIsDev();

const App = () => {
  const editorState = useEditorState();
  return (
    <EditorContext.Provider value={editorState}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/preferences" component={PreferencesPage} />
        </Switch>
      </Router> 
    </EditorContext.Provider>   
  );
}

export default App;
