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
            <div className="max-w-screen-sm my-0 mx-auto text-center">
                <h1 className="text-gray-700 text-3xl font-bold uppercase">Customer Details</h1>
                { error && <div> { error } </div>}
                { customerData && (
                    <form className="w-full">
                        <label className="custdetlabel">Name: </label>
                        <input className="custdetfield"
                            key="1"
                            type="text"
                            required
                            name="name"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.name}
                        />
                        <label className="custdetlabel">Surname: </label>
                        <input className="custdetfield"
                            key="2"
                            type="text"
                            required
                            name="surname"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.surname}
                        />
                        <label className="custdetlabel">Weigth: </label>
                        <input className="custdetfield"
                            key="4"
                            type="number"
                            name="weigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.weigth}
                        />
                        <label className="custdetlabel">Heigth: </label>
                        <input className="custdetfield"
                            key="5"
                            type="number"
                            name="heigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.heigth}
                        />
                        <label className="custdetlabel">Birthdate: </label>
                        <input className="custdetfield"
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
                                <label className="custdetlabel">Perímeters measured on - {perimeter.perDate.slice(0,4)+"-"+
                                                                 perimeter.perDate.slice(5,7)+"-"+
                                                                 perimeter.perDate.slice(8,10)}</label>
                                <label className="text-yellow-500 text-2xl"> - Chest: </label>
                                <input className="custdetfield"
                                    key={index+100}
                                    type="number"
                                    name={"perimeters["+index+"].perChest"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={perimeter.perChest}
                                />
                                <label className="custdetlabel"> - Waist: </label>
                                <input className="custdetfield"
                                    key={index+101}
                                    type="number"
                                    name={"perimeters["+index+"].perWaist"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={perimeter.perWaist}
                                />
                                <label className="custdetlabel"> - Hip: </label>
                                <input className="custdetfield"
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
                                <label className="custdetlabel">Skin turgor measured on - {skinTurgor.skinDate.slice(0,4)+"-"+
                                                                  skinTurgor.skinDate.slice(5,7)+"-"+
                                                                  skinTurgor.skinDate.slice(8,10)}
                                </label>
                                <label className="custdetlabel"> - Skin1: </label>
                                <input className="custdetfield"
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
                        <label className="custdetlabel">Objective: </label>
                        <input className="custdetfield"
                            key="7"
                            name="objective"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.objective}
                        />
                        <label className="custdetlabel">Injuries and/or disseases: </label>
                        <input className="custdetfield"
                            key="8"
                            name="injuriesDiseases"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={customerData.injuriesDiseases}
                        />
                        {!isPending && 
                            <button className="cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                    onClick={handleSubmit}>Update Customer
                                <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg> 
                            </button>
                        }
                        <br/>
                        {isPending && 
                            <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Updating customer...
                            </button>
                        }
                        <br/>
                        {!isPending && 
                            <button className="cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" onClick={handleDelete}>Delete Customer
                                <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        }
                        <br/>
                        {isPending && 
                        <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Deleting customer...</button>}
                        <br/>
                    </form>
                )}
                <p>It lacks perimeters data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks skin turgor data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks going to look for trainer name</p>
            </div>          
        </div>
    )
};
