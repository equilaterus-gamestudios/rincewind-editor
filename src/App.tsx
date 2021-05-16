import React, { useEffect} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';

const App = () => {
  return (         
    <Router history={history}>
      <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="pt-5 d-block d-sm-none">&nbsp;</div>
          <div className="container main-container overflow-auto">
            <div className="px-3">
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </div>
        </div>
      </div>    
      </div> 
    </Router>    
  );
}

export default App;
