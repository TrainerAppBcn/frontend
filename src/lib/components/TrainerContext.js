import React, { useState, createContext } from 'react';
import services from "../service";

export const TrainerContext = createContext();

function TrainerContextProvider (props) {
    const trainerId = "5ffb2d0deed9fa20eab8044f";
    console.log("I'm within provider: ", trainerId);
    
    const [customersList, setCustomersList] = useState(null);
    const [error, setError] = useState(null);
        //     {
    // const [customersList, setCustomersList] = useState([
    //     {
    //         _id: '5ffb2d57eed9fa20eab80450',
    //         email: 'client2@gmail.com',
    //         name: 'Client2Name',
    //         surname: 'Client2Surname',
    //         weigth: 65,
    //         heigth: 165,
    //         birthdate: '1998-02-08T23:00:00.000Z',
    //         perimeters: [{
    //             _id: "5ffb2d57eed9fa20eab80451",
    //             perDate: "2020-12-15T23:00:00.000Z",
    //             perChest: 90,
    //             perWaist: 60,
    //             perHip: 90
    //         }],
    //         skinTurgor: [{
    //             _id: "5ffb2d57eed9fa20eab80452",
    //             skinDate: "2020-12-15T23:00:00.000Z",
    //             skin1: 1.5
    //         }],
    //         objective: 'The strongest woman on earth!',
    //         injuriesDiseases: "No injuries nor disseases known so far, because I'm Superwoman.",
    //         trainerId: '5ffb2d0deed9fa20eab8044f'
    //       },
    //       {
    //         _id: '5ffb2dc2eed9fa20eab80453',
    //         email: 'client1@gmail.com',
    //         name: 'Client1Name',
    //         surname: 'Client1Surname',
    //         weigth: 75,
    //         heigth: 185,
    //         birthdate: '1990-02-08T23:00:00.000Z',
    //         perimeters: [{
    //             _id: "5ffb2dc2eed9fa20eab80454",
    //             perDate: "2020-12-15T23:00:00.000Z",
    //             perChest: 98,
    //             perWaist: 70,
    //             perHip: 95
    //         }],
    //         skinTurgor: [{
    //             _id: "5ffb2dc2eed9fa20eab80455",
    //             skinDate: "2020-12-15T23:00:00.000Z",
    //             skin1: 2.1
    //         }],
    //         objective: 'The strongest man on earth!',
    //         injuriesDiseases: "No injuries nor disseases known so far, because I'm Superman.",
    //         trainerId: '5ffb2d0deed9fa20eab8044f'
    //       },
    //       {
    //         _id: '5ffb334de90b2e2192058402',
    //         email: 'client3@gmail.com',
    //         name: 'Client3Name',
    //         surname: 'Client3Surname',
    //         weigth: 75,
    //         heigth: 185,
    //         birthdate: '1990-02-08T23:00:00.000Z',
    //         perimeters: [{
    //             _id: "5ffb334de90b2e2192058403",
    //             perDate: "2020-12-15T23:00:00.000Z",
    //             perChest: 98,
    //             perWaist: 70,
    //             perHip: 95
    //         }],
    //         skinTurgor: [{
    //             _id: "5ffb334de90b2e2192058404",
    //             skinDate: "2020-12-15T23:00:00.000Z",
    //             skin1: 2.1
    //         }],
    //         objective: 'The strongest man on earth!',
    //         injuriesDiseases: "No injuries nor disseases known so far, because I'm Superman.",
    //         trainerId: '5ffb2d0deed9fa20eab8044f'
    //       }

    // ]);

    const fetchAllCustomers = async (trainerId) => {
        try {
            console.log("Within try");
            const customers = await services.getCustomers(trainerId);
            if (!customers) {
                throw Error(`The customers from the trainer with id ${trainerId} weren't fetched.`);
            };
            console.log("The customers are: ", customers);
            setCustomersList(customers);      
            setError(null);
        } catch (error) {
            setError(error.message);
            console.log("Error while getting the customers: ", error);
        };

    };

    // const TrainerContext = fetchAllCustomers(trainerId);

    // console.log("Return from back: ", customersList);

    return (
        
        <TrainerContext.Provider value={{customersList, setCustomersList, 
                                        error, setError, 
                                        fetchAllCustomers}} >
            {/* {console.log("TrainerProvider return: ", customersList)}
            {console.log("TrainerProvider function return: ", setCustomersList)} */}
            {props.children} 
        </TrainerContext.Provider>
    );
};

export default TrainerContextProvider;
