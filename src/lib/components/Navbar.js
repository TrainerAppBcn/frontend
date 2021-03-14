import React, {useState, useContext} from 'react';
import { Link } from "react-router-dom";
import {TrainerContext} from "../../contexts/TrainerContext";

export default function Navbar() {
    
    // AMN - The state is used locally to control the aspect of the navbar through Tailwind CSS   
    const {isHide, setIsHide,
           classNav, setClassNav } = useContext(TrainerContext);
    
    function hideUnhide (e) {
        e.preventDefault();
        if (isHide) {
            setIsHide(false);
            setClassNav("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500");
        } else {
            setIsHide(true)
            setClassNav("rounded bg-red-500 text-white p-2 mt-0.5 hover:bg-primary transition ease-out duration-500 hidden");
        };
    };

    return (
        <nav className="flex flex-row" >
            <div className="px-4 cursor-pointer my-6 md:hidden">
                <button classList="burguer-list" onClick={hideUnhide}>
                    <svg className="w-8 bg-red-500 text-white mx-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                </button>
                <div className="flex flex-col items-left px-6">
                    <Link to='/signin' className={classNav}>
                        <span>Log in</span>
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                    </Link>
                    <Link to='/signup' className={classNav}>
                        <span>Sign up</span>
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                    </Link>
                    <Link to='/' className={classNav}>
                        <span>Customers List</span>
                            <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                    </Link>
                    <Link to='/trainerdetails' className={classNav}>
                        <span>Trainer details</span>
                    </Link>                   
                </div>
            </div>
            <div className="flex flex-row items-center m-auto p-6">
                <Link to='/signin' className="rounded bg-red-500 text-white p-2 ml-4 transform hover:scale-125 hover:bg-primary transition ease-out duration-500 hidden md:block">
                    <span>Log in</span>
                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                </Link>
                <Link to='/signup' className="rounded bg-red-500 text-white p-2 ml-4 transform hover:scale-125 hover:bg-primary transition ease-out duration-500 hidden md:block">
                    <span>Sign up</span>
                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                </Link>
                <Link to='/' className="rounded bg-red-500 text-white p-2 ml-4 transform hover:scale-125 hover:bg-primary transition ease-out duration-500 hidden md:block">
                    <span>Customers List</span>
                        <svg className="w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                </Link>
                <Link to='/trainerdetails' className="rounded bg-red-500 text-white p-2 ml-4 transform hover:scale-125 hover:bg-primary transition ease-out duration-500 hidden md:block">
                    <span>Trainer details</span>
                </Link>                   
            </div>
        </nav>
    )
};
