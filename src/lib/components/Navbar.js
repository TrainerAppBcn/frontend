import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <h1>NAVBAR</h1>
                <div className="navbar">
                    <Link to='/signin' className="linktosignin">
                        Signin
                    </Link>
                    <br></br>
                    <Link to='/' className="linktomain">
                        Customers List
                    </Link>
                    <Link to='/trainerdetails' className="linktomain">
                        Trainer details
                    </Link>                   
                </div>
            </nav>
        </div>
    )
};
