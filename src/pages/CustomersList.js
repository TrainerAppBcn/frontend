import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {TrainerContext} from "../contexts/TrainerContext";

console.log("I'm within CustomersList.js");
function CustomersList () {
    const [isLoading, setIsLoading] = useState(true);
    const {customersList, setCustomersList, 
           error, setError,
           fetchAllCustomers} = useContext(TrainerContext);

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
        <main>
            <div className="flex flex-col items-center">
                <header>
                    <h1 className="text-gray-700 text-3xl font-bold uppercase flex flex-col items-center">Customers List</h1>
                </header>
                <div className="grid lg:grid-cols-3">
                    { error && <div> { error } </div>}
                    { isLoading && <div>Loading...</div>}
                    {customersList && customersList.map(customer => {
                        return (
                            <div className="custcard" key={customer._id}>
                                <div className="flex-row">
                                    <Link to={`/customerdetails/${customer._id}`}>
                                        <div className="flex-column">
                                            <h2 className="text-yellow-500 text-2xl">Surname: </h2><p className="text-gray-600">{customer.surname},</p>
                                            <h2 className="text-yellow-500 text-2xl">Name: </h2><p className="text-gray-600">{customer.name}</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex-row m-auto mt-3 mb-3">
                                    <Link className="rounded bg-red-500 text-white p-2 m-auto mt-3 mb-3 w-20 hover:bg-primary" to={`/customersessions/${customer._id}`}>
                                        Sessions
                                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

export default CustomersList;
