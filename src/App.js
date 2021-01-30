import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
// import './App.css';
import Navbar from './lib/components/Navbar';
import CustomerDetails from './pages/CustomerDetails';
import CustomersList from './pages/CustomersList';
import TrainerDetails from './pages/TrainerDetails';
import CustomerSessions from './pages/CustomerSessions';
import Login from './pages/Login';
import Signup from './pages/signup';
import TrainerProvider from './contexts/TrainerContext';
import TrainerContextProvider from './contexts/TrainerContext';
import { computeHeadingLevel } from '@testing-library/react';

// IMPORTANT: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components

// [AMN] Until we have the signin process ready I'm passing by props the trainer Id I want to use for test purpose.
function App() {
  const isLoggedin = true; // [AMN] Provisionally till we have the signup/signin ready
  return (
    <Router>
      <div className="App">
        <Navbar />
        <TrainerContextProvider >
          {console.log("I'm back from TrainerProvider...")}
          <Switch>
            <Route exact path="/customerslist" component={CustomersList}/> 
            <Route exact path="/customerdetails/:id" component={CustomerDetails}/> 
            <Route exact path="/customersessions/:id" component={CustomerSessions}/>
            <Route exact path="/trainerdetails" component={TrainerDetails}/> 
            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Switch>
        </TrainerContextProvider>
      </div>
    </Router>
  );
}

export default App;

// function App() {
//   const isLoggedin = true; // [AMN] Provisionally till we have the signup/signin ready
//   return (
//     <div className="App">
//       <Navbar />
//       <Switch>
//         <Route exact path="/customerslist" 
//           render={() => isLoggedin ? <CustomersList trainerId={'5ffb2d0deed9fa20eab8044f'}/> 
//                                    : <Redirect to="/signin" />} /> 
//         <Route exact path="/customerdetails" 
//           render={(customer) => isLoggedin ? <CustomerDetails {...customer} /> 
//                                    : <Redirect to="/signin" />} /> 
//         <Route exact path="/signin" 
//           render={() => !isLoggedin ? <Login />
//                                     : <Redirect to="/customerslist" />} />
//       </Switch>
//     </div>
//   );
// }

