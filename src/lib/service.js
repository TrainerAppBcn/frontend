import axios from "axios";

// [AMN] Important note. What follows can be reviewed on the Youtube channel: The Net
// Nija here: https://www.youtube.com/watch?v=aKOQtGLT-Yk&list=WL&index=45 (tutorial
// #24 - useEffect Cleanup)
// In case we detect on the console that appears a message saying that we try to 
// update the state and the component was unmounted, and this can happen when the 
// user navigates to another page leaving the current w/o time to render the data
// then we need a useEffect hook to cleanup the backend return and avoid this.  

class Service {
    constructor() {
        this.service = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          withCredentials: true,
        });
    };

    getCustomers = async (trainerId) => {
        // const getRoute = "/customer-routes/customers/5ffb2d0deed9fa20eab8044f";
        console.log("Service getting customers...");
        const getRoute = "/customer-routes/customers/" + trainerId;
        try {
            const res = await this.service.get(getRoute);
            return res.data;
        } catch (error) {
            console.log("The error from getCustomers is: ", error);
        };
    };

    updateCustomer = async (customerId, customerData) => {
        console.log("Service updating a customer data...");
        const putRoute = "/customer-routes/customerupdate/" + customerId;
        try {
            const res = await this.service.put(putRoute, {customerData});
            return res.data;
        } catch (error) {
            console.log("The error from updateCustomer is: ", error);
        };
    };

    deleteCustomer = async (customerId) => {
        console.log("Service deleting customer");
        const delRoute = "/customer-routes/customerdelete/" + customerId;
        try {
            const res = await this.service.delete(delRoute);
            return res.data;
        } catch (error) {
            console.log("The error from deleteCustomer is: ", error);
        };
    };

    getTrainer = async (trainerEmail) => {
        const getTrainerRoute = "/trainer-routes/trainer?trainerEmail=" + trainerEmail;
        try {
            const res = await this.service.get(getTrainerRoute);     
            return res.data;       
        } catch (error) {
            console.log("The error from getting the trainer is: ", error);
        }
    }
};

const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;