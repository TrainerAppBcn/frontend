import React, { Component, useState } from 'react';
import services from "../lib/service";

function CustomersList ({trainerId}) {

    const [customersList, setCustomersList] = useState([]);
    console.log("TrainerId: ", trainerId);
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

    return (
        <div>
            <h1>Customers List</h1>
            {customersList.map(customer => {
                return (
                    <p>
                        {customer.surname}, {customer.name}
                    </p>
                )
            })}
        </div>
    );
};

export default CustomersList;