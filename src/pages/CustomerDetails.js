import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'; // connect is a HOC function
import { setIsHide, setCustomerData, updateCustomer, getCustomer, deleteCustomer } from '../store/actions/customerActions';
import { useHistory } from 'react-router-dom';

function CustomerDetails(props) {
    console.log("Props detail: ", props)

    const history = useHistory();
    const { id } = useParams(); // It grabs the id parameter defined on the route.
    console.log("Id before useEffect: ", id)
    useEffect(() => {
        console.log("Id within useEffect: ", id)
        props.setIsHide(true)
        props.getCustomer(id)
    }, [])

    let error;

    // if (props.customerData !== null) {
    //     localCustomerData = props.customerData
    // } else {
    //     error = `The customer with id: ${id} didn't exist `;
    // };
    if (props.customerData === null) {
        error = `The customer with id: ${id} doesn't exist `;
    };
    if (props.isCustomerDeleted) {
        history.push('/');
    }

    function handleChange(event) {
        const { name, value } = event.target; 
        let newCustomerData = props.customerData;
        if (name.slice(0,9) === 'perimeter' || name.slice(0,10) === 'skinTurgor') {
            const indexEnds = name.split("").findIndex(digit => digit === "]");
            const index = name.slice(11,indexEnds);
            if (name.slice(0,9) === 'perimeter') {
                newCustomerData.perimeters[index][name.slice(indexEnds+2,22)] = Number(value);
            } else {
                newCustomerData.skinTurgor[index][name.slice(indexEnds+2,22)] = Number(value);
            };
        } else if (name === 'weigth' || name === 'heigth') {
            newCustomerData[name] = Number(value);
        } else {
            newCustomerData[name] = value; 
        }
        props.setCustomerData(newCustomerData);
        console.log("props.customerData: ", props.customerData)
        //console.log("localCustomerData: ", localCustomerData)
    };

    function handleSubmit (event) {
        event.preventDefault(); // It prevents refreshing the page
        props.updateCustomer(props.customerData);
    };

    function handleBack(event) {
        event.preventDefault()
        history.push('/')
    }

    // AMN - Pending things:
    // a) To request deletion confirmation before deleting the customer
    // b) To dedice whether we want to really delete it or mark it as inactive (to avoid losing data for historical reasons)
    // c) For the sessions to delete or mark them as inactive

    function handleDelete (event) {
        event.preventDefault();
        props.deleteCustomer(id);
    };

    return (
        <div>
            <div className="max-w-screen-sm my-0 mx-auto text-center">
                <h1 className="text-gray-700 text-3xl font-bold uppercase">Customer Details</h1>
                { error && <div className="text-red-600 text-2xl"> { error } </div>}
                {/* { localCustomerData && ( */}
                { props.customerData && (
                    <form className="w-full">
                        <p>{props.customerData.name}</p>
                        <label className="custdetlabel">Name: </label>
                        <input className="custdetfield"
                            key="1"
                            type="text"
                            required
                            name="name"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.name}
                        />
                        <label className="custdetlabel">Surname: </label>
                        <input className="custdetfield"
                            key="2"
                            type="text"
                            required
                            name="surname"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.surname}
                        />
                        <label className="custdetlabel">Weigth: </label>
                        <input className="custdetfield"
                            key="4"
                            type="number"
                            name="weigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.weigth}
                        />
                        <label className="custdetlabel">Heigth: </label>
                        <input className="custdetfield"
                            key="5"
                            type="number"
                            name="heigth"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.heigth}
                        />
                        <label className="custdetlabel">Birthdate: </label>
                        <input className="custdetfield"
                            key="6"
                            type="date"
                            name="birthdate"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.birthdate.slice(0,4)+"-"+
                                   props.customerData.birthdate.slice(5,7)+"-"+
                                   props.customerData.birthdate.slice(8,10)}
                        />
                        {props.customerData.perimeters.length &&
                         props.customerData.perimeters.map((perimeter, index) => (
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
                                    defaultValue={perimeter.perChest}
                                />
                                <label className="custdetlabel"> - Waist: </label>
                                <input className="custdetfield"
                                    key={index+101}
                                    type="number"
                                    name={"perimeters["+index+"].perWaist"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    defaultValue={perimeter.perWaist}
                                />
                                <label className="custdetlabel"> - Hip: </label>
                                <input className="custdetfield"
                                    key={index+102}
                                    type="number"
                                    name={"perimeters["+index+"].perHip"}
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    defaultValue={perimeter.perHip}
                                />
                            </div>
                        ))}
                        {props.customerData.skinTurgor.length &&
                         props.customerData.skinTurgor.map((skinTurgor, index) => (
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
                                    defaultValue={skinTurgor.skin1}
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
                            defaultValue={props.customerData.objective}
                        />
                        <label className="custdetlabel">Injuries and/or disseases: </label>
                        <input className="custdetfield"
                            key="8"
                            name="injuriesDiseases"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.customerData.injuriesDiseases}
                        />
                        <br></br>
                        <div className="flex flex-row justify-around">
                            {!props.isPending && 
                                <button className="cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                        onClick={handleSubmit}>Update
                                    <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg> 
                                </button>
                            }
                            {props.isPending && 
                                <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Updating customer...
                                </button>
                            }
                            {!props.isPending &&
                                <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                        onClick={handleBack}>Back
                                    <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                            }   
                            {!props.isPending && 
                                <button className="cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                        onClick={handleDelete}>Delete
                                    <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            }
                            {props.isPending && 
                                <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Deleting customer...
                                </button>
                            }
                        </div>
                        <br></br>
                    </form>
                )}
                <p>It lacks perimeters data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks skin turgor data measurements on a loop(map) with possibilities to add measurements on different dates</p>
                <p>It lacks going to look for trainer name</p>
            </div>          
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
      customerData: state.customerData,
      isCustomerDeleted: state.isCustomerDeleted,
      setIsHide: state.setIsHide,
      setClassNav: state.setClassNav,
      isPending: state.isPending,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHide: (isHide) => { dispatch(setIsHide(isHide))},
        setCustomerData: (newCustomerData) => { dispatch(setCustomerData(newCustomerData))},
        updateCustomer: (newCustomerData) => { dispatch(updateCustomer(newCustomerData))},
        getCustomer: (customerId) => { dispatch(getCustomer(customerId))},
        deleteCustomer: (customerId) => { dispatch(deleteCustomer(customerId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);