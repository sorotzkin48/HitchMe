import { React, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function NavBar() {


    const [user, setUser] = useState()

    
    useEffect(() => {
        let user2 = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setUser(user2);
    }, [])

    
    return (
            <div className="navUser">
                {user && <NavLink activeclassname="active" className="nav-link" to={"/home/myorders"}>
                    <i className="bi bi-list-ul">
                        <div className="show">myorders</div>
                    </i>
                </NavLink>}

                {user && <NavLink activeclassname="active" className="nav-link" to={'/home/cars'}>
                    <i className="bi bi-car-front-fill">
                        <div className="show">cars</div>
                    </i>
                </NavLink>}

                {user && <NavLink activeclassname="active" className="nav-link" to={'/home/faq'}>
                    <i className="bi bi-question-circle-fill">
                        <div className="show">faqs</div>
                    </i>
                </NavLink>}

                {user && <NavLink activeclassname="active" className="nav-link" to={'/home/about'}>
                    <i className="bi bi-chat-dots-fill">
                        <div className="show">about</div>
                    </i>
                </NavLink>}

                {user && <NavLink activeclassname="active" className="nav-link" to={'/home/contact'}>
                <i class="bi bi-envelope-plus-fill">
                        <div className="show">messages</div>
                    </i>
                </NavLink>}

                {user && <NavLink activeclassname="active" className="nav-link" to={'/home/logout'}>
                    <i className="bi bi-box-arrow-right">
                        <div className="show">logout</div>
                    </i>
                </NavLink>}
            </div>
    );
}


