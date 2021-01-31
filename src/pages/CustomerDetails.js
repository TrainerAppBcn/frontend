import React, {useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TrainerContext } from "../contexts/TrainerContext";

export default function CustomerDetails() {

    const { id } = useParams(); // It grabs the id parameter defined on the route.
    const {customersList, setCustomersList, updateCustomer, isPending, deleteCustomer} = useContext(TrainerContext);
    let customerData, indexData, error;
    // console.log("CustomersList: ", customersList);
    // console.log("Is Pending: ", isPending);
    if (customersList !== null) {
        customerData = customersList.find(customer => customer._id === id);
        indexData = customersList.findIndex(customer => customer._id === id);
        // console.log("Customer Data: ", customerData);
        // console.log(customersList[indexData].birthdate.slice(8,10)+"/"+customersList[indexData].birthdate.slice(5,7)+"/"+customersList[indexData].birthdate.slice(0,4));
        // console.log(customersList[indexData].birthdate.slice(0,4)+"-"+customersList[indexData].birthdate.slice(5,7)+"-"+customersList[indexData].birthdate.slice(8,10));
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
        // console.log("Name: ", name);
        // console.log("Value: ", value);
        // console.log(typeof value);
        let newCustomerList = [...customersList];
        // console.log(name.slice(0,10));
        if (name.slice(0,9) === 'perimeter' || name.slice(0,10) === 'skinTurgor') {
            const indexEnds = name.split("").findIndex(digit => digit === "]");
            const index = name.slice(11,indexEnds);
            // console.log("Index ends: ", indexEnds);
            if (name.slice(0,9) === 'perimeter') {
                newCustomerList[indexData].perimeters[index][name.slice(indexEnds+2,22)] = Number(value);
            } else {
                newCustomerList[indexData].skinTurgor[index][name.slice(indexEnds+2,22)] = Number(value);
            };
        } else if (name === 'weigth' || name === 'heigth') {
            newCustomerList[indexData][name] = Number(value);
        } else {
            newCustomerList[indexData][name] = value; 
        }
        setCustomersList(newCustomerList);
    };

    function handleSubmit (event) {
        event.preventDefault(); // It prevents refreshing the page
        // console.log("Handle submit Customer Data: ", customerData);
        // console.log("Ispending before update: ", isPending);
        updateCustomer(indexData);
        // console.log("IsPending after update: ", isPending);
    };

    function handleDelete (event) {
        event.preventDefault();
        deleteCustomer(indexData);
    };

    return (
        <div>
            <div className="custdata">
                <h2>Customer Details - { id } - {customerData.email}</h2>
                { error && <div> { error } </div>}
                { customerData && (
                    <form>
                        <label>Name: </label>
                        <input
                            key="1"
                            type="text"
                            required
                            name="name"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.name}
                        />
                        <label>Surname: </label>
                        <input
                            key="2"
                            type="text"
                            required
                            name="surname"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.surname}
                        />
                        <label>Weigth: </label>
                        <input
                            key="4"
                            type="number"
                            name="weigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.weigth}
                        />
                        <label>Heigth: </label>
                        <input
                            key="5"
                            type="number"
                            name="heigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.heigth}
                        />
                        <label>Birthdate: </label>
                        <input
                            key="6"
                            type="date"
                            name="birthdate"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.birthdate.slice(0,4)+"-"+
                                   customerData.birthdate.slice(5,7)+"-"+
                                   customerData.birthdate.slice(8,10)}
                        />
                        {customerData.perimeters.length &&
                         customerData.perimeters.map((perimeter, index) => (
                            <div>
                                <label>Perímeters measured on - {perimeter.perDate.slice(0,4)+"-"+
                                                                 perimeter.perDate.slice(5,7)+"-"+
                                                                 perimeter.perDate.slice(8,10)}</label>
                                <label> - Chest: </label>
                                <input
                                    key={index+100}
                                    type="number"
                                    name={"perimeters["+index+"].perChest"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={perimeter.perChest}
                                />
                                <label> - Waist: </label>
                                <input
                                    key={index+101}
                                    type="number"
                                    name={"perimeters["+index+"].perWaist"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={perimeter.perWaist}
                                />
                                <label> - Hip: </label>
                                <input
                                    key={index+102}
                                    type="number"
                                    name={"perimeters["+index+"].perHip"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={perimeter.perHip}
                                />
                            </div>
                        ))}
                        {customerData.skinTurgor.length &&
                         customerData.skinTurgor.map((skinTurgor, index) => (
                            <div>
                                <label>Skin turgor measured on - {skinTurgor.skinDate.slice(0,4)+"-"+
                                                                  skinTurgor.skinDate.slice(5,7)+"-"+
                                                                  skinTurgor.skinDate.slice(8,10)}
                                </label>
                                <label> - Skin1: </label>
                                <input
                                    key={index+200}
                                    type="number"
                                    name={"skinTurgor["+index+"].skin1"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={skinTurgor.skin1}
                                />
                                {/* <select>
                                    <option value="Legs">Legs</option>
                                    <option value="Arms">Arms</option>
                                    <option value="Waist">Waist</option>
                                </select> */}
                            </div>
                        ))}
                        <label>Objective: </label>
                        <input
                            key="7"
                            name="objective"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.objective}
                        />
                        <label>Injuries and/or disseases: </label>
                        <input
                            key="8"
                            name="injuriesDiseases"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.injuriesDiseases}
                        />
                        {!isPending && <button onClick={handleSubmit}>Update Customer</button>}<br/>
                        {isPending && <button disabled>Updating customer...</button>}<br/>
                        {!isPending && <button onClick={handleDelete}>Delete Customer</button>}<br/>
                        {isPending && <button disabled>Deleting customer...</button>}<br/>
                    </form>
                )}
                <p>It lacks perimeters data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks skin turgor data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks going to look for trainer name</p>
            </div>          
        </div>
    )
};
