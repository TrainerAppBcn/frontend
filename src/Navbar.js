import React from 'react'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <h1>NAVBAR</h1>
                <div className="navbar">
                    <a href="/" style={{
                        color: "white",
                        backgroundColor: '#f1356d',
                        borderRadius: '8px'
                    }} >Home</a><br></br>
                    <a href="/customerlist" style={{
                        color: "white",
                        backgroundColor: '#f1356d',
                        borderRadius: '8px'
                    }} >Customers' list</a>
                </div>
            </nav>
        </div>
    )
};
