import React, { useEffect, useState } from 'react';
import SingleOrder from '../SingleOrder/SingleOrder';
import './AllOrders.css'

export default function AllOrders() {
    const [allOrders, setallOrders] = useState()

    
    useEffect(() => {
        fetch(`http://localhost:8080/api/orders`)
            .then(allOrders => allOrders.json())
            .then(allOrders => {
                if (!allOrders[0]) {
                    throw ("there aren't any orders");
                }
                else {
                    console.log(allOrders[0]);
                    setallOrders(allOrders)
                }
            })
    }, [])


    return (
        <>
            <h1>all orders</h1>
            <div className="myOrders" style={{ display: "flex", flexWrap: "wrap", justifyContent:"space-around" }}>
                {allOrders && allOrders.map(item => <SingleOrder key={item.orderId} order={item} />)}
            </div>
        </>
    );
}



