// AMN - you can create several reducers and combine them. See Net Ninja lessson
// 11 from tutorial "React, Redux & Firebase App #11 - Adding Redux & Reducers"
// this rootReducer will be the one who would combine authReducer (for Firebase - Nitra's auth)
// with a new projectReducer that would have this rootReducer info.

const initState = {
    customersList: [],
    customerSessions: [],
    trainerData: null,
    customerData: null,
    sessionData: null,
    isCustomerDeleted: false,
    isSessionDeleted: false,
    error: '',
    isPending: false,
    isHide: true,
    classNav: 'rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden',
}

const rootReducer = (state = initState, action) => {
    console.log("Action: ", action);
    console.log("State: ", state);

    switch (action.type) {
        case 'GET_CUSTOMERS':
            if (action.error === null) {
                return {
                    ...state,
                    customersList: [...action.customers],
                    isCustomerDeleted: action.isCustomerDeleted,
                    error: action.error
                }    
            } else {
                return {
                    ...state,
                    error: action.error
                }    
            }
        case 'GET_SESSIONS':
            if (action.error === null) {
                return {
                    ...state,
                    customerSessions: [...action.sessions],
                    isSessionDeleted: action.isSessionDeleted,
                    error: action.error
                }    
            } else {
                return {
                    ...state,
                    error: action.error
                }    
            }
        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                error: action.error
            }
        case 'UPDATE_SESSION':
            // if (action.error === null) {
            //     console.log("Updated session: ", action.session);
            //     return {
            //         ...state,
            //         error: action.error
            //     }
            // } else {
            //     return {
            //         ...state,
            //         error: action.error
            //     }
            // }
            return {
                ...state,
                error: action.error
            }
        case 'DELETE_CUSTOMER':
            if (action.error === null) {
                return {
                    ...state,
                    customerData: null,
                    isCustomerDeleted: action.isCustomerDeleted,
                    error: action.error
                }
            } else {
                return {
                    ...state,
                    error: action.error
                }
            }
        case 'DELETE_SESSION':
        if (action.error === null) {
            return {
                ...state,
                sessionData: null,
                isSessionDeleted: action.isSessionDeleted,
                error: action.error
            }
        } else {
            return {
                ...state,
                error: action.error
            }
        }
        case 'GET_CUSTOMER':
            if (action.error === null) {
                return {
                    ...state,
                    customerData: {...action.customer},
                    isCustomerDeleted: action.isCustomerDeleted,
                    error: action.error
                }
            } else {
                return {
                    ...state,
                    error: action.error
                }
            }
        case 'GET_SESSION':
            if (action.error === null) {
                return {
                    ...state,
                    sessionData: {...action.session},
                    isSessionDeleted: action.isSessionDeleted,
                    error: action.error
                }
            } else {
                return {
                    ...state,
                    error: action.error
                }
            }
        case 'GET_TRAINER':
            if (action.error === null) {
                return {
                    ...state,
                    trainerData: {...action.trainer},
                    error: action.error
                }    
            } else {
                return {
                    ...state,
                    error: action.error
                }    
            }
        case 'CHANGE_IS_HIDE':
            return {
                ...state,
                isHide: action.isHide
            }
        case 'SET_CLASS_NAV':
            return {
                ...state,
                classNav: action.classNav
            }
        // case 'CHANGE_IS_CUSTOMER_DELETED':
        //     return {
        //         ...state,
        //         isCustomerDeleted: action.isCustomerDeleted
        //     }
        //     break;
        case 'SET_CUSTOMERS_LIST':
            return {
                ...state,
                customersList: [...action.newCustomersList]
            }
        case 'SET_CUSTOMER_DATA':
            return {
                ...state,
                customerData: {...action.newCustomerData}
            }
        case 'SET_SESSION_DATA':
            console.log("Within rootReducer - isSessionConfirmed: ", action.newSessionData);
            return {
                ...state,
                sessionData: {...action.newSessionData}
            }
        case 'SET_IS_PENDING':
            return {
                ...state,
                isPending: action.isPending
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default rootReducer;