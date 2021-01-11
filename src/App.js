import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';

import CustomersList from './pages/CustomersList';

// [AMN] Until we have the signin process ready I'm passing by props the trainer Id I want to use for test purpose.
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/customerslist" render={() => <CustomersList trainerId={'5ffb2d0deed9fa20eab8044f'}/>} /> 
      </Switch>
    </div>
  );
}

export default App;
