import { React, useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';


export default function SignUp(props) {

    let navigate = useNavigate();
    let canSubmit = true;
    const [userTypeId, setUserTypeId] = useState(2)


    useEffect(() => {
        if (props.status === undefined) {
            setUserTypeId(2)
        }
        else {
            setUserTypeId(props.status)
        }
    }, [])


    function dateOfBirthValidation(dateOfBirth) {
        if ((Date.now() - dateOfBirth) < 18) {
            alert('you are too young to rent a car')
            canSubmit = false
        }
    }
    function emailValidation(email) {
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            alert('Wrong, this email address ia not valid!');
            canSubmit = false
        }
    }
    function phoneValidation(phone) {
        if (!phone.match(/^\d+$/)) {
            alert('Wrong, password should include only numbers!');
            canSubmit = false
        }
    }
    function passwordValidation(password) {
        if (!password.match(/^\d+$/)) {
            alert('Wrong, password should include only numbers!');
            canSubmit = false
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();
        await isValid(event.target.dateOfBirth.value, event.target.email.value, event.target.phone.value, event.target.password.value)
        if (canSubmit) {
            try {
                let checkExists = await fetch(`http://localhost:8080/api/users/id/${event.target.id.value}`);
                checkExists = await checkExists.json();
                if (checkExists[0]) {
                    if (userTypeId == 2)
                        throw ("you already exist, please log in");
                    else {
                        navigate('/manager')
                    }
                }
                else {
                    debugger
                    let currentUser = {
                        "userId": event.target.id.value,
                        "userTypeId": userTypeId,
                        "firstName": event.target.firstName.value,
                        "lastName": event.target.lastName.value,
                        "licenseNumber": event.target.licenseNumber.value,
                        "licenseExpiery": event.target.licenseExpiery.value,
                        "dateOfBirth": event.target.dateOfBirth.value,
                        "city": event.target.city.value,
                        "area": event.target.area.value,
                        "street": event.target.street.value,
                        "houseNumber": event.target.houseNumber.value,
                        "email": event.target.email.value,
                        "phone": event.target.phone.value,
                        "password": event.target.password.value
                    }
                    await fetch('http://localhost:8080/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify(currentUser),

                        mode: 'cors',
                    })
                    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
                    if (userTypeId == 2)
                        navigate(`/home/${event.target.id.value}`);
                    else {
                        navigate(`/manager`)
                    }
                }
            }
            catch (err) {
                alert(err);
                navigate('/login')
            }
        }
    }


    async function isValid(dateOfBirth, email, phone, password) {
        dateOfBirthValidation(dateOfBirth)
        if (canSubmit) emailValidation(email)
        if (canSubmit) phoneValidation(phone)
        if (canSubmit) passwordValidation(password)
        if (canSubmit) return true;
        return false;
    }


    return (
        <div className='form'>
            <div className='form_title'>
                Sign<span>U</span>p
            </div>
            <form className='form_items' onSubmit={(event) => handleSubmit(event)}>
                <div className='form_inputs'>
                    <input required id="firstName" name="firstName" type="text" placeholder="first name" />
                </div>

                <div className='form_inputs'>
                    <input required id="lastName" name="lastName" type="text" placeholder="last name" />
                </div>

                <div className='form_inputs'>
                    <input required id="id" name="id" type="text" placeholder="id" />
                </div>

                <div className='form_inputs'>
                    <input required id="dateOfBirth" name="dateOfBirth" type="date" placeholder="date of birth" />
                    <label style={{ opacity: 0.45 }}>date of birth</label>
                </div>

                <div className='form_inputs'>
                    <input required={userTypeId == 2} id="licenseNumber" name="licenseNumber" type="text" placeholder="license number" />
                </div>

                <div className='form_inputs'>
                    <input required={userTypeId == 2} id="licenseExpiery" name="licenseExpiery" type="date" placeholder="license expiery" />
                    <label style={{ opacity: 0.45 }}>license expiery</label>
                </div>

                <div className='form_inputs'>
                    <input required id="city" name="city" type="text" placeholder="city" />
                </div>

                <div className='form_inputs'>
                    <input required id="area" name="area" type="text" placeholder="area" />
                </div>

                <div className='form_inputs'>
                    <input required id="street" name="street" type="text" placeholder="street" />
                </div>

                <div className='form_inputs'>
                    <input required id="houseNumber" name="houseNumber" type="text" placeholder="house number" />
                </div>
                <div className='form_inputs'>
                    <input required id="phone" name="phone" type="text" placeholder="phone" />
                </div>

                <div className='form_inputs'>
                    <input required id="password" name="password" type="text" placeholder="password" />
                </div>
                <div className='form_inputs'>
                    <input required id="email" name="email" type="email" placeholder="email" />
                </div>
                <button className='form_button btn1'>Sign Up</button>
            </form>
            <div className='form_other'>
                <NavLink activeclassname="active" className="nav-link" to={'/login'}><div className="show">Log In</div></NavLink>
            </div>
        </div>
    );
}