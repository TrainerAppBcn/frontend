import React, {useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { TrainerContext } from "../contexts/TrainerContext";

export default function SessionDetails() {

    const { id } = useParams(); // It grabs the id parameter defined on the route.
    const {customerSessions, setCustomerSessions, 
           updateSession, 
           isPending, 
           deleteSession,
           setIsHide,
           formatTime,
           handleClickBack,
           setClassNav} = useContext(TrainerContext);

    useEffect(() => {
        setIsHide(true)
        setClassNav("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden");
    }, [])

    let sessionData, indexData, error;

    if (customerSessions !== null) {
        sessionData = customerSessions.find(session => session._id === id);
        indexData = customerSessions.findIndex(session => session._id === id);
    } else {
        error = `The session with id: ${id} didn't exist `;
    };

    function handleChange(event) {
        const { name, value } = event.target; 

        let newCustomerSessions = [...customerSessions];
        if (name === 'isSessionConfirmed') {
            console.log(value);
            console.log(newCustomerSessions[indexData][name]);
            newCustomerSessions[indexData][name] = !value; 
            console.log(newCustomerSessions[indexData][name]);
        } else {
            newCustomerSessions[indexData][name] = value; 
        }
        
        setCustomerSessions(newCustomerSessions);
    };

    function handleSubmit (event) {
        event.preventDefault(); // It prevents refreshing the page
        updateSession(indexData);
    };

    function handleDelete (event) {
        event.preventDefault();
        deleteSession(indexData);
    };

    function handleBack(event) {
        event.preventDefault()
        handleClickBack(`/customersessions/${sessionData.customerId}`)
    }

    return (
        <div>
            <div className="max-w-screen-sm my-0 mx-auto text-center">
                <header>
                    <h1 className="text-gray-700 text-3xl font-bold uppercase">Session Details</h1>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <h2 className="flex text-yellow-500 text-2xl">Date - time: </h2>
                            {sessionData && 
                                <p className="flex text-gray-600 text-2xl">&nbsp;
                                    {sessionData.sessionDate.slice(0,4)+"-"+
                                    sessionData.sessionDate.slice(5,7)+"-"+
                                    sessionData.sessionDate.slice(8,10)}
                                </p>
                            }
                            {sessionData && 
                                <p className="flex text-gray-600 text-2xl">&nbsp;-&nbsp;
                                    {formatTime(sessionData.sessionTime)}
                                </p>
                            }
                        </div>
                        {sessionData && sessionData.isSessionPaid ? 
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> : 
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        }
                    </div>
                </header>
                <br></br>
                { error && <div> { error } </div>}
                { sessionData && (
                    <form className="w-full">
                        <label className="custdetlabel">Effort level: </label>
                        <input className="custdetfield"
                            key="1"
                            type="text"
                            required
                            name="effortLevel"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={sessionData.effortLevel}
                        />
                        <label className="custdetlabel">Satisfaction level: </label>
                        <input className="custdetfield"
                            key="2"
                            type="text"
                            required
                            name="satisfactionLevel"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            value={sessionData.satisfactionLevel}
                        />
                        <div className="flex flex-row">
                            <label className="custdetlabel">Confirmed: </label>
                            {sessionData.isSessionConfirmed ?
                                <input className="custdetfield"
                                    key="3"
                                    type="checkbox"
                                    name="isSessionConfirmed"
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={sessionData.isSessionConfirmed}
                                    checked
                                /> : 
                                <input className="custdetfield"
                                    key="3"
                                    type="checkbox"
                                    name="isSessionConfirmed"
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    value={sessionData.isSessionConfirmed}
                                />
                            }
                        </div>
                        <br></br>
                    </form>
                )}
                <div className="flex flex-row justify-around">
                    {!isPending && 
                        <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                onClick={handleSubmit}>Update
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg> 
                        </button>
                    }
                    {isPending && 
                        <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Updating session...
                        </button>
                    }
                    {!isPending &&
                        <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                onClick={handleBack}>Back
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                    }
                    {!isPending && 
                        <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                onClick={handleDelete}>Delete
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    }
                    {isPending && 
                        <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Deleting session...
                        </button>
                    }
                </div>
            </div>          
        </div>
    )
};
