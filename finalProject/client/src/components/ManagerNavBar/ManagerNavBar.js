
import { React, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ManagerNavBar.css'

export default function ManagerNavBar() {

    const [manager, setManager] = useState()


    useEffect(() => {
        let managerTmp = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setManager(managerTmp);

    }, [])


    return (
        <div className="managerNavBar">
            <NavLink activeclassname="active" className="nav-link managerLink" to={"/manager/orders"}>
                <i class="bi bi-list-ol">
                    <div className="show">all orders</div>
                </i>
            </NavLink>

            <NavLink activeclassname="active" className="nav-link managerLink" to={'/manager/users'}>
                <i className="bi bi-people-fill">
                    <div className="show">all users</div>
                </i>
            </NavLink>

            <NavLink activeclassname="active" className="nav-link managerLink" to={'/manager/signup'}>
                <i class="bi bi-person-plus-fill">
                    <div className="show">add manager</div>
                </i>
            </NavLink>

            <NavLink activeclassname="active" className="nav-link managerLink" to={'/manager/contact'}>
                <i class="bi bi-person-plus-fill">
                    <div className="show">see contacts</div>
                </i>
            </NavLink>

            {manager && <NavLink activeclassname="active" className="nav-link managerLink" to={'/home/'}>
                <i class="bi bi-arrow-left-circle-fill">
                    <div className="show">enter as a customer</div>
                </i>
            </NavLink>}

            <NavLink activeclassname="active" className="nav-link managerLink" to={"/manager/addcar"}>

                <i className="bi bi-car-front-fill">
                    <div className="show">add car</div>
                </i>
            </NavLink>
        </div>
    );
}