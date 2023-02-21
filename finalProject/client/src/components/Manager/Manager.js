import React, { useState, useEffect } from 'react';
import AllOrders from '../AllOrders/AllOrders'
import AllUsers from '../AllUsers/AllUsers';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import AddCar from '../AddCar/AddCar';
import './Manager.css';
import ContactUs from '../ContactUs/ManagerContact';
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar';


export default function Manager() {
    
    const [manager, setManager] = useState()


    useEffect(() => {
        let managerTmp = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setManager(managerTmp);
    }, [])


    return (
        <div className="navManager">
            <ManagerNavBar />
            {manager && <h1 className="welcome" style={{ color: "white" }}>{"welcome " + manager.firstName + " " + manager.lastName}</h1>}
            <Routes>
                <Route exact element={<AllOrders />} path="/orders/*" />
                <Route exact element={<AllUsers />} path="/users/*" />
                <Route exact element={<SignUp status={1} />} path="/signup" />
                <Route exact element={<ContactUs />} path="/contact" />
                <Route exact element={<AddCar />} path="/addcar" />
            </Routes>
        </div>

    );
}

