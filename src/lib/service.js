import axios from "axios";

class Service {
    constructor() {
        this.service = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          withCredentials: true,
        });
    };

    getCustomers = async (trainerId) => {
        // const getRoute = "/customer-routes/customers/5ffb2d0deed9fa20eab8044f";
        const getRoute = "/customer-routes/customers/" + trainerId;
        try {
            const res = await this.service.get(getRoute);
            return res.data;
        } catch (error) {
            console.log("The error from getCustomers is: ", error);
        };
    };
};

const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;