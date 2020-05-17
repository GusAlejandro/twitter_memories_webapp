import React from 'react';
import Navigation from './Navigation';
import Welcome from './Welcome';
import Register from './Register';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Welcome} />
        <Route path='/register' component={Register} />
      </Switch>
    </Router>

  );
}

export default App;
