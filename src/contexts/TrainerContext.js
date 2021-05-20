// import React, { useState, createContext } from 'react';
// import services from "../lib/service";
// import { useHistory } from 'react-router-dom';

// export const TrainerContext = createContext();

// function TrainerContextProvider (props) {
//     const trainerId = "5ffb2d0deed9fa20eab8044f";
//     const trainerEmail = "martinez.andreu@gmail.com";
    
//     const [customersList, setCustomersList] = useState(null);
//     const [customerSessions, setCustomerSessions] = useState(null);
//     const [trainerData, setTrainerData] = useState(null)
//     const [customerData, setCustomerData] = useState(null)
//     const [error, setError] = useState(null);
//     const [isPending, setIsPending] = useState(false);
//     const [isHide, setIsHide] = useState(true);
//     const [classNav, setClassNav] = useState("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden");
//     const history = useHistory();
    
//     const fetchAllCustomers = async (trainerId) => {
//         try {
//             const customers = await services.getCustomers(trainerId);
//             if (!customers) {
//                 throw Error(`The customers from the trainer with id ${trainerId} weren't fetched.`);
//             };
//             setCustomersList(customers);      
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             console.log("Error while getting the customers: ", error);
//         };
//     };

//     const updateCustomer = async (indexData) => {
//         try {
//             setIsPending(true);
//             const customer = await services.updateCustomer(customersList[indexData]._id, customersList[indexData]);
//             setIsPending(false);
//             if (!customer) {
//                 throw Error(`The customer with id: ${customersList[indexData]._id} wasn't updated.`);
//             };
//             setError(null);
//         } catch (error) {
//             setIsPending(false);
//             setError(error.message);
//             console.log(`Error while updating the customer with id: ${customersList[indexData]._id}`);
//         };
//     };

//     const deleteCustomer = async (indexData) => {
//         try {
//             setIsPending(true);
//             const customer = await services.deleteCustomer(customersList[indexData]._id);
//             setIsPending(false);
//             if (!customer) {
//                 throw Error(`The customer with id: ${customersList[indexData]._id} wasn't deleted.`);
//             };
//             history.push('/')
//             setError(null);
//         } catch (error) {
//             setIsPending(false);
//             setError(error.message);
//             console.log(`Error while deleting the customer with id: ${customersList[indexData]._id}`);
//         };
//     };

//     const getTrainer = async (trainerEmail) => {
//         try {
//             setIsPending(true);
//             const trainer = await services.getTrainer(trainerEmail);
//             setIsPending(false);
//             if (!trainer) {
//                 throw Error(`The trainer with email: ${trainerEmail} wasn't found.`);
//             };
//             setTrainerData(trainer);
//             setError(null);            
//         } catch (error) {
//             setIsPending(false);
//             setError(error.message);
//             console.log(`Error while getting the trainer with email: ${trainerEmail}`);
//         };
//     };

//     const updateSession = async (indexData) => {
//         try {
//             setIsPending(true);
//             const session = await services.updateSession(customerSessions[indexData]._id, customerSessions[indexData]);
//             setIsPending(false);
//             if (!session) {
//                 throw Error(`The session with id: ${customerSessions[indexData]._id} wasn't updated.`);
//             };
//             setError(null);
//         } catch (error) {
//             setIsPending(false);
//             setError(error.message);
//             console.log(`Error while updating the session with id: ${customerSessions[indexData]._id}`);
//         };
//     };

//     const fetchAllSessions = async (customerId) => {
//         try {
//             console.log("Customer id for getting sessions: ", customerId);
//             const sessions = await services.getSessions(customerId);
//             if (!sessions) {
//                 throw Error(`The sessions from the customer with id ${customerId} weren't fetched.`);
//             };
//             setCustomerSessions(sessions);      
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             console.log("Error while getting the sessions: ", error);
//         };
//     };

//     const getCustomer = async (customerId) => {
//         try {
//             setIsPending(true);
//             const customer = await services.getCustomer(customerId);
//             setIsPending(false);
//             if (!customer) {
//                 throw Error(`The customer with id: ${customerId} wasn't found.`);
//             };
//             setCustomerData(customer);
//             setError(null);            
//         } catch (error) {
//             setIsPending(false);
//             setError(error.message);
//             console.log(`Error while getting the customer with id: ${customerId}`);
//         };
//     };

//     function formatTime(oneTime) {
//         const hourNum = oneTime / 100
//         const hourStr = Math.trunc(hourNum).toString().padStart(2, '0')
//         const minStr  = (oneTime - Math.trunc(hourNum) * 100).toString().padStart(2, '0')
        
//         return hourStr + ':' + minStr
//     }

//     function handleClickBack(routeBack) {
//         history.push(routeBack)
//     }

//     return (
        
//         <TrainerContext.Provider value={{customersList, setCustomersList, 
//                                         customerSessions, setCustomerSessions,
//                                         error, setError, 
//                                         fetchAllCustomers,
//                                         fetchAllSessions,
//                                         updateCustomer,
//                                         updateSession,
//                                         formatTime,
//                                         handleClickBack,
//                                         isPending, setIsPending,
//                                         isHide, setIsHide,
//                                         classNav, setClassNav,
//                                         deleteCustomer,
//                                         trainerData, setTrainerData,
//                                         customerData, setCustomerData,
//                                         getTrainer, getCustomer}} >
//             {props.children} 
//         </TrainerContext.Provider>
//     );
// };

// export default TrainerContextProvider;
