import { React, useEffect, useState } from 'react';
import './ManagerContact.css'

export default function ContactUs() {

    const [contacts, setContacts] = useState([])


    async function getContacts() {
        let user = JSON.parse(sessionStorage.getItem("currentUser"))
        fetch(`http://localhost:8080/api/contact/getContacts`)
            .then(contacts2 => contacts2.json())
            .then(contacts2 => {
                if (!contacts2[0]) {
                    throw ("there aren't any contactus");
                }
                else {
                    setContacts(contacts2)
                }
            })
    }


    useEffect(() => {
        let a = getContacts();
        setContacts(a);
    }, [])


    async function deleteContact(contactId) {
        let contactToDelete = {
            "contactId": contactId
        }
        await fetch('http://localhost:8080/api/contact/deleteContact', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(contactToDelete),
            mode: 'cors',
        })
        let cont = getContacts();
        setContacts(cont);
    }


    return (
        <>
            <div style={{ marginLeft: "-70vw" }}>
                <div style={{ padding: 50 }}>contacts</div>
                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>user id</th>
                            <th>title</th>
                            <th>contents</th>
                        </tr>
                    </thead>

                    {contacts[0] && contacts.map(item => {
                        return (
                            <tbody key={item.contactId}>
                                <tr>
                                    <td>{item.userId}</td>
                                    <td>{item.contactTitle}</td>
                                    <td className="contentTd">{item.contactContent}</td>
                                    <td><button className="readBtn" onClick={() => deleteContact(item.contactId)}>read</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    );
}
