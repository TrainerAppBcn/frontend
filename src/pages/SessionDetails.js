import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'; // connect is a HOC function
import { setIsHide, setSessionData, updateSession, deleteSession, getSession } from '../store/actions/customerActions';
import { useHistory } from 'react-router-dom';

function SessionDetails(props) {

    const history = useHistory();
    const { id } = useParams(); // It grabs the id parameter defined on the route.

    useEffect(() => {
        props.setIsHide(true)
        props.getSession(id)
    }, [])

    let indexData, error;

    if (props.sessionData === null) {
        error = `The session with id: ${id} doesn't exist `;
    };

    if (props.isSessionDeleted) {
        history.push(`/customersessions/${props.sessionData._id}`);
    }

    function handleChange(event) {
        const { name, value } = event.target; 

        let newSessionData = props.sessionData;
        if (name === 'isSessionConfirmed') {
            console.log("IsSessionConfirmed - value: ", value);
            console.log("IsSessionConfirmed - name: ", name);
            console.log(newSessionData[name]);
            //newSessionData[name] = !value; 
            newSessionData[name] = !newSessionData[name]; 
            console.log(newSessionData[name]);
        } else {
            console.log("value: ", value);
            console.log("name: ", name);
            console.log(newSessionData[name]);
            newSessionData[name] = value; 
            console.log(newSessionData[name]);
        }
        
        props.setSessionData(newSessionData);
        console.log("props - value: ", props.sessionData)
    };

    function handleSubmit (event) {
        event.preventDefault(); // It prevents refreshing the page
        props.updateSession(props.sessionData);
    };

    function handleDelete (event) {
        event.preventDefault();
        props.deleteSession(id);
    };

    function handleBack(event) {
        event.preventDefault()
        history.push(`/customersessions/${props.sessionData.customerId}`)
    }

    function formatTime(oneTime) {
        const hourNum = oneTime / 100
        const hourStr = Math.trunc(hourNum).toString().padStart(2, '0')
        const minStr  = (oneTime - Math.trunc(hourNum) * 100).toString().padStart(2, '0')
        
        return hourStr + ':' + minStr
    }

    // let element = document.getElementById(checkbox);
    // if (props.sessionData.isSessionConfirmed === true) {
    //     element.setAttribute("checked", "true");
    //     element.checked = true;
    //     document.getElementById(markbox).classList.add('checked');
    // } else {
    //     element.removeAttribute("checked");
    //     element.checked = false;
    //     document.getElementById(markbox).classList.remove('checked');
    // }

    return (
        <div>
            <div className="max-w-screen-sm my-0 mx-auto text-center">
                <header>
                    <h1 className="text-gray-700 text-3xl font-bold uppercase">Session Details</h1>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <h2 className="flex text-yellow-500 text-2xl">Date - time: </h2>
                            {props.sessionData && 
                                <p className="flex text-gray-600 text-2xl">&nbsp;
                                    {props.sessionData.sessionDate.slice(0,4)+"-"+
                                    props.sessionData.sessionDate.slice(5,7)+"-"+
                                    props.sessionData.sessionDate.slice(8,10)}
                                </p>
                            }
                            {props.sessionData && 
                                <p className="flex text-gray-600 text-2xl">&nbsp;-&nbsp;
                                    {formatTime(props.sessionData.sessionTime)}
                                </p>
                            }
                        </div>
                        {props.sessionData && props.sessionData.isSessionPaid ? 
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> : 
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        }
                    </div>
                </header>
                <br></br>
                { error && <div> { error } </div>}
                { props.sessionData && (
                    <form className="w-full">
                        <label className="custdetlabel">Effort level: </label>
                        <input className="custdetfield"
                            key="1"
                            type="text"
                            required
                            name="effortLevel"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.sessionData.effortLevel}
                        />
                        <label className="custdetlabel">Satisfaction level: </label>
                        <input className="custdetfield"
                            key="2"
                            type="text"
                            required
                            name="satisfactionLevel"
                            onChange={(event) => handleChange(event)}
                            // onKeyDown={handleKeyDown}
                            defaultValue={props.sessionData.satisfactionLevel}
                        />
                        <div className="flex flex-row">
                            <label className="custdetlabel">Confirmed: </label>
                            {props.sessionData.isSessionConfirmed ?
                                <input className="custdetfield"
                                    key="3"
                                    type="checkbox"
                                    name="isSessionConfirmed"
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    defaultValue={props.sessionData.isSessionConfirmed}
                                    checked
                                /> : 
                                <input className="custdetfield"
                                    key="4"
                                    type="checkbox"
                                    name="isSessionConfirmed"
                                    onChange={(event) => handleChange(event)}
                                    // onKeyDown={handleKeyDown}
                                    defaultValue={props.sessionData.isSessionConfirmed}
                                />
                            }
                        </div>
                        <br></br>
                    </form>
                )}
                <div className="flex flex-row justify-around">
                    {!props.isPending && 
                        <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                onClick={handleSubmit}>Update
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg> 
                        </button>
                    }
                    {props.isPending && 
                        <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Updating session...
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
                        <button className="flex flex-row cursor-pointer rounded bg-red-500 hover:bg-primary text-white p-2 ml-4" 
                                onClick={handleDelete}>Delete
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    }
                    {props.isPending && 
                        <button className="cursor-pointer rounded bg-red-500 text-white p-2 ml-4" disabled>Deleting session...
                        </button>
                    }
                </div>
            </div>          
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
      sessionData: state.sessionData,
      isSessionDeleted: state.isSessionDeleted,
      setIsHide: state.setIsHide,
      setClassNav: state.setClassNav,
      isPending: state.isPending,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHide: (isHide) => { dispatch(setIsHide(isHide))},
        setSessionData: (newSessionData) => { dispatch(setSessionData(newSessionData))},
        updateSession: (newSessionData) => { dispatch(updateSession(newSessionData))},
        getSession: (sessionId) => { dispatch(getSession(sessionId))},
        deleteSession: (sessionId) => { dispatch(deleteSession(sessionId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDetails);