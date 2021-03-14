import React, {useContext, useEffect} from 'react';
import { TrainerContext } from "../contexts/TrainerContext";

export default function TrainerDetails() {
    
    const {setIsHide, setClassNav} = useContext(TrainerContext);

    useEffect(() => {
        setIsHide(true)
        setClassNav("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden");
    }, [])

    return (
        <div>
            <div className="flex flex-col">
                <h1 className="m-auto">Trainer Details</h1>
                <p className="m-auto">Form with trainer data</p>
                <p className="m-auto">Button to delete the customer</p>
                <p className="m-auto">Button to update the customer data (created from customer</p>
            </div>          
        </div>
    )
};
