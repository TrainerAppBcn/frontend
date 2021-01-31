import React, { useState, createContext } from 'react';
import services from "../lib/service";
import { useHistory } from 'react-router-dom';

export const TrainerContext = createContext();

function TrainerContextProvider (props) {
    const trainerId = "5ffb2d0deed9fa20eab8044f";
    // console.log("I'm within provider: ", trainerId);
    
    const [customersList, setCustomersList] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    
    const fetchAllCustomers = async (trainerId) => {
        try {
            // console.log("Within try");
            const customers = await services.getCustomers(trainerId);
            if (!customers) {
                throw Error(`The customers from the trainer with id ${trainerId} weren't fetched.`);
            };
            // console.log("The customers are: ", customers);
            setCustomersList(customers);      
            setError(null);
        } catch (error) {
            setError(error.message);
            console.log("Error while getting the customers: ", error);
        };
    };

    const updateCustomer = async (indexData) => {
        try {
            setIsPending(true);
            // console.log("IsPending on trainercontext before update: ", isPending);
            // console.log("Within updating customer");
            // console.log("Index to update: ", indexData);
            // console.log("With customerId: ", customersList[indexData]._id);
            // console.log("Data to update: ", customersList[indexData]);
            const customer = await services.updateCustomer(customersList[indexData]._id, customersList[indexData]);
            setIsPending(false);
            if (!customer) {
                throw Error(`The customer with id: ${customersList[indexData]._id} wasn't updated.`);
            };
            history.push('/customerslist')
            setError(null);
        } catch (error) {
            setIsPending(false);
            setError(error.message);
            console.log(`Error while updating the customer with id: ${customersList[indexData]._id}`);
        };
        // console.log("IsPending on trainercontext after update: ", isPending);
    };

    const deleteCustomer = async (indexData) => {
        try {
            setIsPending(true);
            const customer = await services.deleteCustomer(customersList[indexData]._id);
            setIsPending(false);
            if (!customer) {
                throw Error(`The customer with id: ${customersList[indexData]._id} wasn't deleted.`);
            };
            history.push('/customerslist')
            setError(null);
        } catch (error) {
            setIsPending(false);
            setError(error.message);
            console.log(`Error while deleting the customer with id: ${customersList[indexData]._id}`);
        };
    };

    return (
        
        <TrainerContext.Provider value={{customersList, setCustomersList, 
                                        error, setError, 
                                        fetchAllCustomers,
                                        updateCustomer,
                                        isPending, setIsPending,
                                        deleteCustomer}} >
            {/* {console.log("TrainerProvider return: ", customersList)}
            {console.log("TrainerProvider function return: ", setCustomersList)} */}
            {props.children} 
        </TrainerContext.Provider>
    );
};

export default TrainerContextProvider;
