import React, { useState } from 'react';
import services from "../service";
export const TrainerContext = React.createContext();

function TrainerProvider ({trainerId}) {

    console.log("I'm within provider: ", trainerId);

    const [customersList, setCustomersList] = useState([]);

    const fetchAllCustomers = async (trainerId) => {
        try {
            const customers = await services.getCustomers(trainerId);
            setCustomersList(customers);      
        } catch (error) {
            console.log("Error while getting the customers: ", error);
            this.setState({message: "Error while getting the curtomers: " + error});
        };

    };

    fetchAllCustomers(trainerId);
    console.log("Return from back: ", customersList[1]);

    return (
        <TrainerContext.Provider value={{customerList: customersList, setCustomerList: setCustomersList}} >
            {/* {this.props.children}  */}
        </TrainerContext.Provider>
    )  
};

export default TrainerProvider;
