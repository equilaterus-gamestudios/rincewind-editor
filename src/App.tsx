import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';
import { Titlebar, Color } from 'custom-electron-titlebar'
import { ipcRenderer } from 'electron';

export const titlebar = new Titlebar({
	backgroundColor: Color.fromHex('#000')
});

const getIsDev = async () => (await ipcRenderer.invoke('is-dev'))
export const isDev = getIsDev();

const App = () => {
  
  return (         
    <Router history={history}>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>    
  );
}

export default App;
