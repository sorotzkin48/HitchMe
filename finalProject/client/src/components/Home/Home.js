import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cars from '../Cars/Cars';
import MyOrders from '../MyOrders/MyOrders';
import NewOrder from '../NewOrder/NewOrder';
import FAQ from '../Faq/Faq';
import AboutUs from '../AboutUs/AboutUs'
import NavBar from '../NavBar/NavBar';
import LogOut from '../LogOut/LogOut';
import Contact from '../Contact/Contact';
import './Home.css'


export default function Home() {

    const [user, setUser] = useState()

    useEffect(() => {
        let user2 = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setUser(user2);
    }, [])


    return (
        <div className="homeDiv">
            <NavBar />
            {user && <h1 className="welcome">{"welcome " + user.firstName + " " + user.lastName}</h1>}
            <Routes>
                <Route exact element={<MyOrders />} path="/myorders" />
                <Route exact element={<Cars />} path="/cars/*" />
                <Route exact element={<NewOrder />} path="/order/:carId/*" />
                <Route exact element={<FAQ />} path="/faq" />
                <Route exact element={<AboutUs />} path="/about" />
                <Route exact element={<Contact />} path="/contact" />
                <Route exact element={<LogOut />} path="/logout" />
            </Routes>
        </div>
    );
}


