import React, {useContext, useState} from 'react';
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
        const {name, surname} = customerData;
    } else {
        error = `The customer with id: ${id} didn't exist `;
    };

    // const [name, setName] = useState(customerData.name);
    // const [surname, setSurname] = useState(customerData.surname);

    // function handleChange(event, index) {
    //     const { name, value } = event.target;
    //     const newExpenses = [...expenses];
    //     newExpenses[index] = {
    //       ...expenses[index],
    //       [name]: value
    //     };
    //     setExpenses(newExpenses);
    // };

    function handleChange(event) {
        const { name, value } = event.target; 
        console.log("Name: ", name);
        console.log("Value: ", value);
        console.log(typeof value);
        let newCustomerList = [...customersList];
        if (name === 'weigth' || name === 'heigth') {
            newCustomerList[indexData][name] = Number(value);
        } else {
            newCustomerList[indexData][name] = value; 
        }
        setCustomersList(newCustomerList);
    };

    function handleSubmit (event) {
        event.preventDefault();

    }

    return (
        <div>
            <div className="custdata">
                <h2>Customer Details - { id }</h2>
                { error && <div> { error } </div>}
                { customersList && (
                    <form onSubmit={handleSubmit}>
                        <label>Name: </label>
                        <input
                            key="1"
                            type="text"
                            required
                            name="name"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].name}
                        />
                        <label>Surname: </label>
                        <input
                            key="2"
                            type="text"
                            required
                            name="surname"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].surname}
                        />
                        <label>Weigth: </label>
                        <input
                            key="3"
                            type="number"
                            name="weigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].weigth}
                        />
                        <label>Heigth: </label>
                        <input
                            key="4"
                            type="number"
                            name="heigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].heigth}
                        />
                        <label>Birthdate: </label>
                        <input
                            key="5"
                            type="date"
                            name="birthdate"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].birthdate}
                        />
                        <label>Perímeters: </label>
                        <select>
                            <option value="Chest">Chest</option>
                            <option value="Waist">Waist</option>
                            <option value="Hip">Hip</option>
                        </select>
                        <label>Skin turgor: </label>
                        <select>
                            <option value="Chest">Legs</option>
                            <option value="Waist">Arms</option>
                            <option value="Hip">Waist</option>
                        </select>
                        <label>Objective: </label>
                        <input
                            key="6"
                            name="objective"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].objective}
                        />
                        <label>Injuries and/or disseases: </label>
                        <input
                            key="7"
                            name="injuriesDiseases"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customersList[indexData].injuriesDiseases}
                        />
                        <button>Update Customer</button>
                    </form>
                )}
                <p>It lacks perimeters date with possibilities to add measurements on different dates</p>
                <p>It lacks skin turgor date with possibilities to add measurements on different dates</p>
                <p>It lacks going to look for trainer name</p>
            </div>          
        </div>
    )
};
