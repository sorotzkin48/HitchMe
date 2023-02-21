import { React} from 'react';
import {useNavigate} from 'react-router-dom';
import './LogOut.css'


export default function LogOut() {

    let navigate=useNavigate()

    function leave() {
        sessionStorage.removeItem("currentUser")
        navigate('/login')
    }
    

    return (<>
        <div className='leave' onClick={leave}>are you sure you want to log out? click here</div></>
        );

}