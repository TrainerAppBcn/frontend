import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'; // connect is a HOC function
import { fetchAllCustomers, setIsHide } from '../store/actions/customerActions';
import { getTrainer } from '../store/actions/trainerActions';

function CustomersList (props) {
    console.log("Props: ", props)
    const [isLoading, setIsLoading] = useState(true);
    // On the first render we look for the customers of the trainer. If we wanted to look for the customers
    // each time the customersList changed we should put at the end of the useEffect [customersList] instead
    // of []. Without [] useEffect is executing fetchAllCustomers in each render, with [] only when we
    // mount the component and with [customersList] each time the customersList changes.
    useEffect(() => {
        //fetchAllCustomers("5ffb2d0deed9fa20eab8044f"); 
        props.fetchAllCustomers("5ffb2d0deed9fa20eab8044f");
        console.log("Props: ", props);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        props.getTrainer("martinez.andreu@gmail.com"); // We get the trainer data
        setIsLoading(false);
    }, []);

    return (
        <main>
            <div className="flex flex-col items-center">
                <header>
                    <h1 className="text-gray-700 text-3xl font-bold uppercase flex flex-col items-center">Customers List</h1>
                    <div className="flex flex-row">
                        <h2 className="flex text-yellow-500 text-2xl">Trainer: </h2>
                        { isLoading && <div className="text-gray-600 text-2xl">Loading...</div>}
                        {props.trainerData ? <p className="flex text-gray-600 text-2xl">&nbsp;{`${props.trainerData.surname}, ${props.trainerData.name}`}</p> : null}
                    </div>
                </header>
                <div className="flex flex-col items-center">
                    { props.error && <div className="text-red-600 text-2xl"> { props.error } </div>}
                    { isLoading && <div className="text-gray-600 text-2xl">Loading...</div>}
                    {props.customersList && props.customersList.map(customer => {
                        return (
                            <div className="flex flex-row custcard transition ease-out duration-500" key={customer._id}>
                                <Link className="flex flex-row" to={`/customerdetails/${customer._id}`}>
                                    
                                        <p className="flex text-gray-600 text-2xl">&nbsp;{`${customer.surname}, ${customer.name}`}</p>
                                        <p className="flex text-gray-600 text-2xl">&nbsp;-&nbsp;{customer.email}</p>
                                    
                                </Link>
                                <div className="flex-row m-auto mt-3 mb-3 transform hover:scale-125">
                                    <Link className="rounded bg-red-500 text-white p-2 w-20 hover:bg-primary transition ease-out duration-300" to={`/customersessions/${customer._id}`}>
                                        Sessions
                                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
};

// a) Takes from Redux store the data that we want from the store
const mapStateToProps = (state) => {
    return {
      customersList: state.customersList,
      error: state.error,
      isHide: state.isHide,
      setClassNav: state.setClassNav,
      trainerData: state.trainerData,
      isCustomerDeleted: state.isCustomerDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCustomers: (id) => { dispatch(fetchAllCustomers(id)) },
        getTrainer: (email) => { dispatch(getTrainer(email)) },
        setIsHide: (isHide) => { dispatch(setIsHide(isHide))},
    }
}
  
  // b) we pass to the HOC function called 'connect' the info we get from the store so we can use it.
  
export default connect(mapStateToProps, mapDispatchToProps)(CustomersList); // As connect is a HOC function insted of connect(App) we wrapped App with connect()(App)
