import React, { useEffect, useState } from 'react';
import SingleOrder from '../SingleOrder/SingleOrder.js'
import './MyOrders.css'

export default function MyOrders() {


    const [userOrders, setUserOrders] = useState()


    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("currentUser"))
        fetch(`http://localhost:8080/api/orders/id/${user.userId}`)
            .then(userOrders => userOrders.json())
            .then(userOrders => {
                if (!userOrders[0]) {
                    throw ("you don't have any orders");
                }
                else {
                    setUserOrders(userOrders)
                }
            })
    }, [])


    
    return (
        <div className="myOrders">
            {userOrders ? userOrders.map(item => <SingleOrder key={item.orderId} order={item} className="singleOrder" />):<h5>no result</h5>}
        </div>

    );
}



