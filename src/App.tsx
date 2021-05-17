import React, { useEffect} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';

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
