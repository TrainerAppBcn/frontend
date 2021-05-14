import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './lib/components/Navbar';
import CustomerDetails from './pages/CustomerDetails';
import CustomersList from './pages/CustomersList';
import TrainerDetails from './pages/TrainerDetails';
import CustomerSessions from './pages/CustomerSessions';
import Login from './pages/Login';
import TrainerContextProvider from './contexts/TrainerContext';
import NotFound from './pages/NotFound';
import SessionDetails from './pages/SessionDetails';

// IMPORTANT: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components

// [AMN] Until we have the signin process ready I'm passing by props the trainer Id I want to use for test purpose.
// Last route with "*" is at the bottom on purpose. It means that whenever the
// user writes a non-existing url it will see the NotFound page. The * allows
// React to catch any url that is not one of the exinting ones.
function App() {
  return (
    <Router>
      <div className="App font-body ">
        <TrainerContextProvider >
          <Navbar />
          <Switch>
            <Route exact path="/" component={CustomersList}/> 
            <Route exact path="/customerdetails/:id" component={CustomerDetails}/> 
            <Route exact path="/customersessions/:id" component={CustomerSessions}/>
            <Route exact path="/trainerdetails" component={TrainerDetails}/> 
            <Route exact path="/sessiondetails/:id" component={SessionDetails}/>
            <Route exact path="/signin" component={Login}/>
            <Route path="*"> 
              <NotFound />
            </Route>
          </Switch>
        </TrainerContextProvider>
      </div>
    </Router>
  );
}

export default App;