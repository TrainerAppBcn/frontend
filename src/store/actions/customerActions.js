import services from "../../lib/service";

export const fetchAllCustomers = (trainerId) => {
    return async(dispatch, getState) => {
        try {
            const customers = await services.getCustomers(trainerId);
            if (!customers) {
                throw Error(`The customers from the trainer with id ${trainerId} weren't fetched.`);
            };
            dispatch({
                type: 'GET_CUSTOMERS',
                customers: customers,
                isCustomerDeleted: false,
                error: null})
        } catch (error) {
            console.log("Error while getting the customers: ", error);
            dispatch({
                type: 'GET_CUSTOMERS',
                customers: null,
                error: error.message})
        };
    }
}

export const fetchAllSessions = (customerId) => {
    return async(dispatch, getState) => {
        try {
            console.log("Customer id for getting sessions: ", customerId);
            const sessions = await services.getSessions(customerId);
            if (!sessions) {
                throw Error(`The sessions from the customer with id ${customerId} weren't fetched.`);
            };
            dispatch({
                type: 'GET_SESSIONS',
                sessions: sessions,
                isSessionDeleted: false,
                error: null})
        } catch (error) {
            console.log("Error while getting the sessions: ", error);
            dispatch({
                type: 'GET_SESSIONS',
                sessions: null,
                error: error.message})
        };
    }
};

console.log("Before getCustomer");
export const getCustomer = (customerId) => {
    console.log("Within getCustomer with id: ", customerId);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const customer = await services.getCustomer(customerId);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!customer) {
                throw Error(`The customer with id: ${customerId} wasn't found.`);
            };
            dispatch({
                type: 'GET_CUSTOMER',
                customer: customer,
                isCustomerDeleted: false,
                error: null})         
        } catch (error) {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'GET_CUSTOMER',
                customer: null,
                error: error.message})   
            console.log(`Error while getting the customer with id: ${customerId}`);
        };
    }
};

export const getSession = (sessionId) => {
    console.log("Within getSession with id: ", sessionId);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const session = await services.getSession(sessionId);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!session) {
                throw Error(`The session with id: ${sessionId} wasn't found.`);
            };
            dispatch({
                type: 'GET_SESSION',
                session: session,
                isSessionDeleted: false,
                error: null})         
        } catch (error) {
            console.log(`Error while getting the session with id: ${sessionId}`);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'GET_SESSION',
                session: null,
                error: error.message})   
        };
    }
};

export const updateCustomer = (customerData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const customer = await services.updateCustomer(customerData._id, customerData);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!customer) {
                throw Error(`The customer with id: ${customerData._id} wasn't updated.`);
            };
            dispatch({
                type: 'UPDATE_CUSTOMER',
                customer: customer,
                error: null})
        } catch (error) {
            console.log(`Error while updating the customer with id: ${customerData._id}`);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'SET_ERROR',
                error: error.message,
            })
        };
    };
}

export const updateSession = (sessionData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const session = await services.updateSession(sessionData._id, sessionData);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!session) {
                throw Error(`The session with id: ${sessionData._id} wasn't updated.`);
            };
            dispatch({
                type: 'UPDATE_SESSION',
                session: session,
                error: null})
        } catch (error) {
            console.log(`Error while updating the session with id: ${sessionData._id}`);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'SET_ERROR',
                error: error.message,
            })
        };
    }   
};

export const deleteCustomer = (customerId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const customer = await services.deleteCustomer(customerId);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!customer) {
                throw Error(`The customer with id: ${customerId} wasn't deleted.`);
            };
            dispatch({
                type: 'DELETE_CUSTOMER',
                customer: null,
                isCustomerDeleted: true,
                error: null})
        } catch (error) {
            console.log(`Error while deleting the customer with id: ${customerId}`);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'SET_ERROR',
                error: error.message,
            })
        };
    }
};

export const deleteSession = (sessionId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: true
            })
            const session = await services.deleteSession(sessionId);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            if (!session) {
                throw Error(`The session with id: ${sessionId} wasn't deleted.`);
            };
            dispatch({
                type: 'DELETE_SESSION',
                session: null,
                isSessionDeleted: true,
                error: null})
        } catch (error) {
            console.log(`Error while deleting the session with id: ${sessionId}`);
            dispatch({
                type: 'SET_IS_PENDING',
                isPending: false
            })
            dispatch({
                type: 'SET_ERROR',
                error: error.message,
            })
        };
    }
};

export const setIsHide = (isHide) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CHANGE_IS_HIDE',
            isHide: isHide
        })
    }
}

export const setClassNav = (classNav) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_CLASS_NAV',
            classNav: classNav
        })
    }
}

// export const setIsCustomerDeleted = (isDeleted) => {
//     return (dispatch, getState) => {
//         dispatch({
//             type: 'CHANGE_IS_CUSTOMER_DELETED',
//             isCustomerDeleted: isCustomerDeleted
//         })
//     }
// }

export const setCustomersList = (newCustomersList) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_CUSTOMERS_LIST',
            newCustomersList: newCustomersList
        })
    }
}

export const setCustomerData = (newCustomerData) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_CUSTOMER_DATA',
            newCustomerData: newCustomerData
        })
    }
}

export const setSessionData = (newSessionData) => {
    return (dispatch, getState) => {
        console.log("Within customerActions - isSessionConfirmed: ", newSessionData)
        dispatch({
            type: 'SET_SESSION_DATA',
            newSessionData: newSessionData
        })
    }
}
