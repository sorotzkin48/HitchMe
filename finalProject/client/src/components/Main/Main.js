import React from 'react';
import LogIn from '../LogIn/LogIn.js'
import SignUp from '../SignUp/SignUp.js';
import Home from '../Home/Home.js';
import Manager from '../Manager/Manager';
import Error from '../Error/Error.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import image2 from '../images/logo1010.png';
import './Main.css'

export default function Main() {

    return (
        <>
            <img className="logo" src={image2} />
            <Routes className="mainWithoutLogo">
                <Route exact path="/" element={<Navigate replace to="/login" />} />
                <Route exact element={<LogIn />} path="/login" />
                <Route exact element={<SignUp status={2} />} path="/signup" />
                <Route exact element={<Home />} path="/home/*" />
                <Route exact element={<Manager />} path="/manager/*" />
                <Route exact element={<Error />} path="/*" />
            </Routes>
        </>
    );
}



