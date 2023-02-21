import { React } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './LogIn.css';


export default function LogIn() {

    let navigate = useNavigate();


    function emailValidation(email) {
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            alert('Wrong, this email address ia not valid!');
            navigate('/login')
        }
    }


    function handleSubmit(event) {
        emailValidation(event.target.email.value)
        event.preventDefault();
        userExists(event.target.email.value, event.target.password.value)
    }


    async function userExists(email, password) {
        try {
            let details = {
                "email": email,
                "password": password
            }
            let user = await fetch('http://localhost:8080/api/users/email/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
                mode: 'cors',
            })
            user = await user.json();
            if (!user[0]) {
                throw ("you don't exist, please sign up");
            }
            else {
                sessionStorage.setItem("currentUser", JSON.stringify(user[0]));
                if (user[0].userType === "manager") {
                    navigate('/manager');
                } else {
                    navigate('/home/');
                }
            }
        }
        catch (err) {
            alert(err);
            navigate('/signup')
        }
    }


    return (
        <div className='form formLogIn'>
            <div className='form_title'>
                Log<span>I</span>n
            </div>
            <form className='form_items' onSubmit={(event) => handleSubmit(event)}>
                <div className='form_inputs'>
                    <input
                        name="email"
                        type='text'
                        required
                        placeholder="email"
                    />
                </div>
                <div className='form_inputs'>
                    <input
                        name="password"
                        type='password'
                        required
                        placeholder="password"
                    />
                </div>
                <button className='form_button btn1'>Log In</button>
            </form>
            <div className='form_other'>
                <NavLink activeclassname="active" className="nav-link" to={'/signup'}><div className="show">Join Now</div></NavLink>
            </div>
        </div >

    );
}

