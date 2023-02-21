import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleCar.css'
import Button from 'react-bootstrap/Button';

export default function SingleCar(props) {

    const [user, setUser] = useState()


    useEffect(() => {
        let user2 = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setUser(user2);
    }, [])


    return (
        <div className="singleCarDiv">
            <img className="carPic" src={props.url}></img>
            <div >
                <div className='innerDiv1'>
                    <h3>{props.myCar.houseNumber + " " + props.myCar.streetName + " street "}</h3>
                    <h3>{props.myCar.areaName + " " + props.myCar.cityName}</h3>
                </div>

                <table className="priceTable">
                    <thead>
                        <th></th>
                        <th>rent</th>
                        <th>insurance</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: "#1D7C7C" }}>hour</td>
                            <td>{Math.round(props.myCar.pricePerHour * 10) / 10}</td>
                            <td>{Math.round(props.myCar.insurancePerHour * 10) / 10}</td>

                        </tr>
                        <tr>
                            <td style={{ color: "#1D7C7C" }}>day</td>
                            <td>{Math.round(props.myCar.pricePerDay * 10) / 10}</td>
                            <td>{Math.round(props.myCar.insurancePerDay * 10) / 10}</td>
                        </tr>

                    </tbody>
                </table>
                <div className='innerDiv2'>
                    <h3>{props.myCar.brand + " " + props.myCar.model}</h3>
                    <h3>{props.myCar.numberOfSeats + " seats " + props.myCar.color}</h3>
                </div>
                <div className='innerDiv3'>
                    {props.myCar.wazeExists ? <h3><i style={{ color: "white" }} className="bi bi-geo-alt"></i>waze exists</h3> : <h3>waze doesn't exist</h3>}
                </div>

                <div class="container" style={{ marginLeft: "5vw" }}>
                    <div class="row" style={{ maxWidth: "20vw" }}>
                        <div className="col" >
                            <Button style={{ backgroundColor: "#1D7C7C", color: "white", marginTop: 15 }} disabled={props.index === 0} onClick={props.clickedLeft} className="leftButton col " variant="outline-secondary">last</Button>
                        </div>
                        <div className="col">
                            {user && user.licenseExpiery && user.licenseNumber && <Button style={{ backgroundColor: "#1D7C7C", color: "white", padding: 20 }} as={NavLink} exact to={"/home/order/" + props.myCar.carId}>order</Button>}
                        </div>
                        <div className="col">
                            <Button style={{ backgroundColor: "#1D7C7C", color: "white", marginTop: 15 }} disabled={props.index + 1 === props.currentAmountOfCars && props.someCars} onClick={props.clickedRight} className="rightButton col " variant="outline-secondary">next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

