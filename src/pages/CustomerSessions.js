import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {TrainerContext} from "../contexts/TrainerContext";
import { useParams } from 'react-router-dom';

export default function CustomerSessions() {
    const { id } = useParams(); // It grabs the id parameter defined on the route.
    const [isLoading, setIsLoading] = useState(true);
    const {customerSessions,
           error,
           setIsHide,
           setClassNav,
           fetchAllSessions,
           formatTime,
           handleClickBack,
           customerData, getCustomer} = useContext(TrainerContext);
    
    // On the first render we look for the sessions of the customer.
    useEffect(() => {
        fetchAllSessions(id); 
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getCustomer(id); // We get the customer data
        setIsLoading(false);
    }, []);

    // On each first render we hide the burguer menu to avoid it appearing open when we come from another page. 
    useEffect(() => {
        setIsHide(true)
        setClassNav("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden");
    }, []);

    function handleBack(event) {
        event.preventDefault()
        handleClickBack(`/`)
    }

    function formatDate (oneDate) {
        const theDate = new Date(oneDate);
        const dd = String(theDate.getDate()).padStart(2, '0');
        const mm = String(theDate.getMonth() + 1).padStart(2, '0');
        const yyyy = theDate.getFullYear();

        return yyyy + '/' + mm + '/' + dd;
    };
           
    return (
        <main>
            <div className="flex flex-col items-center">
                <header>
                    <h1 className="text-gray-700 text-3xl font-bold uppercase flex flex-col items-center">Sessions List</h1>
                    <div className="flex flex-row">
                        <h2 className="flex text-yellow-500 text-2xl">Customer: </h2>
                        {customerData && <p className="flex text-gray-600 text-2xl">&nbsp;{`${customerData.surname}, ${customerData.name}`}</p>}
                    </div>
                </header>
                <div className="flex flex-col items-center">
                    { error && <div> { error } </div>}
                    { isLoading && <div>Loading...</div>}
                    { customerSessions && customerSessions.map(session => {
                        return (
                            <div className="flex flex-row custcard transition ease-out duration-500" key={session._id}>
                                <Link className="flex flex-row" to={`/sessiondetails/${session._id}`}>     
                                        <p className="flex text-gray-600 text-2xl">&nbsp;{`${formatDate(session.sessionDate)}`}</p>
                                        <p className="flex text-gray-600 text-2xl">&nbsp;{`${formatTime(session.sessionTime)}`}</p>   
                                        
                                        {session.isSessionPaid ? 
                                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> : 
                                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                        }
                                        {session.isSessionConfirmed ? 
                                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> : 
                                            null
                                        }
                                </Link>
                            </div>
                        )
                    })}
                    <br/>
                    <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                            onClick={handleBack}>Back
                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <br/>
                </div>
            </div>
        </main>
    )
};