import React, { useState } from 'react';
import services from "../service";

const TrainerContext = React.createContext({});
export default TrainerContext;

export function TrainerProvider ({children}) {
    const trainerId = "5ffb2d0deed9fa20eab8044f";
    console.log("I'm within provider: ", trainerId);
    
    const [customersList, setCustomersList] = useState([]);

    const fetchAllCustomers = async (trainerId) => {
        try {
            console.log("Within try");
            const customers = await services.getCustomers(trainerId);
            console.log(customers);
            setCustomersList(customers);      
        } catch (error) {
            console.log("Error while getting the customers: ", error);
            this.setState({message: "Error while getting the customers: " + error});
        };

    };

    fetchAllCustomers(trainerId);

    console.log("Return from back: ", customersList);

    return (
        
        <TrainerContext.Provider value={{customersList: customersList, setCustomersList: setCustomersList, fetchAllCustomers: fetchAllCustomers}} >
            {console.log("TrainerProvider return: ", customersList)}
            {console.log("TrainerProvider function return: ", setCustomersList)}
            {children} 
        </TrainerContext.Provider>
    );
};

