import services from "../../lib/service";

export const getTrainer = (email) => {
    return async (dispatch, getState) => {

        try {
            //setIsPending(true);
            const trainer = await services.getTrainer(email);
            //setIsPending(false);
            if (!trainer) {
                throw Error(`The trainer with email: ${email} wasn't found.`);
            };
            dispatch({
                type: 'GET_TRAINER',
                trainer: trainer,
                error: null})          
        } catch (error) {
            //setIsPending(false);
            console.log(`Error while getting the trainer with email: ${email}`);
            dispatch({
                type: 'GET_TRAINER',
                trainer: null,
                error: error.message})
        };


        return {
            type: 'GET_TRAINER',
            email: email
        }
    }
}