import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setIsHide } from '../store/actions/customerActions';

function TrainerDetails(props) {
    
    useEffect(() => {
        props.setIsHide(true)
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

const mapStateToProps = (state) => {
    return {
      setIsHide: state.setIsHide
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHide: (isHide) => { dispatch(setIsHide(isHide))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainerDetails);
