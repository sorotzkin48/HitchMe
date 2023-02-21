import React, { useEffect, useState } from 'react';
import './SingleOrder.css'


export default function SingleOrder(props) {


    const [carReturned, setCarReturned] = useState(true)


    // useEffect(() => {
    //     Date.prototype.displayDate = function (date) {
    //         let formatted = date.getFullYear();
    //         return this.displayDate();
    //     }
    // }, [])


    useEffect(() => {
        if (props.order.orderStatusName === "booked")
            setCarReturned(false)
    }, [])

    async function returnCar() {
        await fetch(`http://localhost:8080/api/orders/${props.order.orderId}/returnCar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        })
        setCarReturned(true)
    }


    return (
        <div className="singleOrderDiv" >
            <h3>{'order id: ' + props.order.orderId}</h3>
            <h3>{props.order.brand + " " + props.order.model + " " + props.order.numberOfSeats + ' seats ' + props.order.color}</h3>
            {props.order.insurance ? <h3>insurance</h3> : <h3>no insurance</h3>}
            {props.order.dayOrHourStatusName === "hour" ? <h3>{props.order.numberOfHours + " hours"}</h3> :
                <h3>{props.order.numberOfDays + " days"}</h3>}
            <h3>{props.order.pickUpDateTime.toString().slice(0, 10).split('-').reverse().join('/') + " " +
                props.order.pickUpDateTime.toString().slice(12, 16)}</h3>
            {!carReturned ? <h3> not returned</h3> :
                <h3> returned</h3>}
            {!carReturned && <button onClick={returnCar} className="btn1">update car return</button>}
            <h3>{'totalPrice: ' + Math.round(props.order.totalPrice)}</h3>
        </div>
    );
}



