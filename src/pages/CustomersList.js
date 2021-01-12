import React, { useState } from 'react';
import services from "../lib/service";
import { Link } from "react-router-dom";

function CustomersList ({trainerId}) {

    const [customersList, setCustomersList] = useState([]);

    const fetchAllCustomers = async (trainerId) => {
        try {
            const customers = await services.getCustomers(trainerId);
            setCustomersList(customers);      
        } catch (error) {
            console.log("Error while getting the customers: ", error);
            this.setState({message: "Error while getting the curtomers: " + error});
        };

    };

    fetchAllCustomers(trainerId);

    const handleSessions = (customerId) => {
        console.log("Clicking to see sessions of customerId: ", customerId);
    };

    const handleCustomerData = (customerId) => {
        console.log("On link to customer details...");
        <Link to='/customerdetails' />
        // console.log("Cliking to see customer personal data of customerId: ", customerId);
    };

    return (
        <div>
            <div className="custlist">
                <h1 >Customers List</h1>
                {customersList.map(customer => {
                    return (
                        <div key={customer._id} className="customerdata">
                            <h2>Surname: </h2><p>{customer.surname},</p> 
                            <h2>Name: </h2><p>{customer.name}</p>
                            {/* {console.log(customer)} */}
                            <button onClick={() => handleSessions(customer._id)} className="sessionsbtn"> Sessions</button>
                            {/* <button onClick={() => handleCustomerData(customer._id)} className="personalbtn"> Personal data</button> */}
                            {/* <Link to='/customerdetails' className="linktodetails">
                                Personal data
                            </Link> */}
                            <Link to={{
                                pathname: '/customerdetails',
                                state: {customer: {...customer}}
                            }} className="linktodetails">
                                Personal data
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CustomersList;