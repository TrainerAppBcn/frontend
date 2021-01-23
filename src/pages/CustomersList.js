import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {TrainerContext} from "../contexts/TrainerContext";

console.log("I'm within CustomersList.js");
function CustomersList () {
    const [isLoading, setIsLoading] = useState(true);
    const {customersList, setCustomersList, 
           error, setError,
           fetchAllCustomers} = useContext(TrainerContext);
    console.log("Within function CustomerList.js with context: ", customersList);
    console.log("Setcustomerslist: ", setCustomersList);
    console.log("Fucntion fetchallcustomers: ", fetchAllCustomers);
    // const handleSessions = (customerId) => {
    //     console.log("Clicking to see sessions of customerId: ", customerId);
    // };

    // const handleCustomerData = (customerId) => {
    //     console.log("On link to customer details...");
    //     <Link to='/customerdetails' />
    //     // console.log("Cliking to see customer personal data of customerId: ", customerId);
    // };

    // On the first render we look for the customers of the trainer. If we wanted to look for the customers
    // each time the customersList changed we should put at the end of the useEffect [customersList] instead
    // of []. Without [] useEffect is executing fetchAllCustomers in each render, with [] only when we
    // mount the component and with [customersList] each time the customersList changes.
    useEffect(() => {
        fetchAllCustomers("5ffb2d0deed9fa20eab8044f"); 
        setIsLoading(false);
    }, []);

    // fetchAllCustomers("5ffb2d0deed9fa20eab8044f");

    return (
        <div>
            <div className="custlist">
                <h1 >Customers List</h1>
                { error && <div> { error } </div>}
                { isLoading && <div>Loading...</div>}
                {customersList && customersList.map(customer => {
                    return (
                        <div key={customer._id} className="customerdata">
                            <Link to={`/customerdetails/${customer._id}`}>
                                <h2>Surname: </h2><p>{customer.surname},</p>
                                <h2>Name: </h2><p>{customer.name}</p>
                            </Link>
                            <div>
                                <Link to={`/customersessions/${customer._id}`}>
                                    Customer Sessions
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CustomersList;
