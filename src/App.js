import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import './App.css';
import Navbar from './Navbar';
import CustomerDetails from './pages/CustomerDetails';
import CustomersList from './pages/CustomersList';
import Login from './pages/Login';
import MyProvider from './lib/components/TrainerProvider';

// IMPORTANT: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components

// [AMN] Until we have the signin process ready I'm passing by props the trainer Id I want to use for test purpose.
function App() {
  const isLoggedin = true; // [AMN] Provisionally till we have the signup/signin ready
  return (
    <div className="App">
      <Navbar />
      <MyProvider trainerId={"5ffb2d0deed9fa20eab8044f"}>
        <Switch>
          <Route exact path="/customerslist" 
            render={() => isLoggedin ? <CustomersList /> 
                                    : <Redirect to="/signin" />} /> 
          <Route exact path="/customerdetails" 
            render={(customer) => isLoggedin ? <CustomerDetails {...customer} /> 
                                    : <Redirect to="/signin" />} /> 
          <Route exact path="/signin" 
            render={() => !isLoggedin ? <Login />
                                      : <Redirect to="/customerslist" />} />
        </Switch>
      </MyProvider>
    </div>
  );
}

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


export default App;
