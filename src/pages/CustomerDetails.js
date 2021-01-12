import React from 'react';

export default function CustomerDetails({customer}) {
    // const {customer} = this.props.location;
    console.log(customer);
    return (
        <div>
            <div className="custdet">
            <h1 >Customers Details {customer}</h1>
            <p>Form with customer data</p>
            <p>Button to delete the customer</p>
            <p>Button to update the customer data (created from customer</p>
            </div>          
        </div>
    )
};
