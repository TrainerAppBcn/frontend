import React from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerSessions() {
    const { id } = useParams(); // It grabs the id parameter defined on the route.
    return (
        <div>
            <div className="flex flex-col items-center">
            <h1 >Customers Sessions - { id }</h1>
            <p>Show list with customer sessions</p>
            </div>          
        </div>
    )
};