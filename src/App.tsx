import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';
import { Titlebar, Color } from 'custom-electron-titlebar'

export const titlebar = new Titlebar({
	backgroundColor: Color.fromHex('#000')
});

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
