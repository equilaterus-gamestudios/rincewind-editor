import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';
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
          <Route path="/" component={Home} />
        </Switch>
      </Router> 
    </EditorContext.Provider>   
  );
}

export default App;
