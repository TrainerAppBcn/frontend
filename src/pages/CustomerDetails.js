import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import {TrainerContext} from "../contexts/TrainerContext";

export default function CustomerDetails() {
    const { id } = useParams(); // It grabs the id parameter defined on the route.
    const {customersList, setCustomersList} = useContext(TrainerContext);
    let customerData, indexData, error;
    console.log("CustomersList: ", customersList);
    if (customersList !== null) {
        customerData = customersList.find(customer => customer._id === id);
        indexData = customersList.findIndex(customer => customer._id === id);
        console.log("Customer Data: ", customerData);
    } else {
        error = `The customer with id: ${id} didn't exist `;
    };

    // function handleChange(event, index) {
    //     const { name, value } = event.target;
    //     const newExpenses = [...expenses];
    //     newExpenses[index] = {
    //       ...expenses[index],
    //       [name]: value
    //     };
    //     setExpenses(newExpenses);
    // };

    function handleChange() {
        // const { name, value } = event.target; 
        let newCustomerList = [...customersList];
        newCustomerList.splice(indexData, 1, customerData);
        setCustomersList(newCustomerList);
    };

    return (
        <div>
            <div className="custdet">
                <h1 >Customer Details - { id }</h1>
                { error && <div> { error } </div>}
                { customerData && (
                    <article className="custdata">
                        <input
                            key="1"
                            name="customerName"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.name}
                        />
                        <input
                            key="2"
                            name="customerSurname"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.surname}
                        />
                        <input
                            key="3"
                            type="number"
                            name="customerWeigth"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.weigth}
                        />
                        <input
                            key="4"
                            type="number"
                            name="customerHeigth"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.heigth}
                        />
                        <input
                            key="5"
                            type="date"
                            name="customerBirthdate"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.birthdate}
                        />
                        <input
                            key="6"
                            name="customerObjective"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.objective}
                        />
                        <input
                            key="7"
                            name="customerInjDis"
                            onChange={() => {
                            handleChange();
                            }}
                            // onKeyDown={handleKeyDown}
                            value={customerData.injuriesDiseases}
                        />
                    </article>
                )}
                <p>It lacks perimeters</p>
                <p>It lacks skin turgor</p>
                <p>It lacks going to look for trainer name</p>
            </div>          
        </div>
    )
};
