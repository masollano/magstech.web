import React, {useState} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './index.css';
import { Link } from "react-router-dom";


const Headerbar = () =>{
    const [show,setShow] =  useState(false)

    return (
         <header className={`header ${show ? 'space-toggle' : ''}`}>
                <div className="header-toggle" >
                <i className="fas fa-bars" onClick={() => setShow(!show)}></i>
                </div>
        </header> 
    );
};


export default Headerbar;