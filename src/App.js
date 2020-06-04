import React from 'react';
import Navigation from './Navigation';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' component={Register} />
        <Route path='/login' component={Login}/>
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
    </Router>

  );
}

export default App;
