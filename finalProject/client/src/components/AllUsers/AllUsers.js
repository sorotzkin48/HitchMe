import React, { useEffect, useState } from 'react';
import './AllUsers.css'


export default function MyOrders() {
    const [allUsers, setallUsers] = useState()


    useEffect(() => {
        fetch(`http://localhost:8080/api/users`)
            .then(allUsers => allUsers.json())
            .then(allUsers => {
                if (!allUsers[0]) {
                    throw ("there aren't any users");
                }
                else {
                    setallUsers(allUsers)
                }
            })
    }, [])

    
    return (
        <>
            <div className="allUsers" style={{ marginLeft: "-70vw" }}>
                <h1>all users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>user id</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>amount of orders</th>
                        </tr>
                    </thead>

                    {allUsers && allUsers.map(user => {
                        if (user.userType === "customer")
                            return (
                                <tbody >
                                    <tr>
                                        <td>{user.userId}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.amountOfOrders}</td>
                                    </tr>
                                </tbody>)
                    })}
                </table>
            </div>
        </>
    );
}



