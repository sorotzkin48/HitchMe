import React, { useState, useEffect } from 'react';
import './Contact.css';


export default function Contact() {

    const [user, setUser] = useState()
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");


    useEffect(() => {
        let user2 = JSON.parse(window.sessionStorage.getItem("currentUser"))
        setUser(user2);
    }, [])


    async function handleContact(event) {
        event.preventDefault();
        try {
            let contactDetails = {
                "userId": user.userId,
                "contactTitle": title,
                "contactContents": contents
            }
            await fetch(`http://localhost:8080/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactDetails),
                mode: 'cors'
            });
            setTitle('');
            setContents('');
        }
        catch (err) { console.log(err); }
    }


    return (
        <div className='form contactForm' style={{ marginLeft: "-10vw" }}>
            <div className='form_title'>
                Mes<span>S</span>age
            </div>
            <form className='form_items' onSubmit={(e) => handleContact(e)} id="contact-form" class="form-horizontal" role="form">
                <div className='form_inputs'>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
                </div>
                <div className='form_inputs'>
                    <textarea style={{ height: "10vh" }} value={contents} onChange={(e) => setContents(e.target.value)} placeholder="contents" name="message" required></textarea>
                </div>
                <button className='form_button btn1'>send</button>
            </form>

        </div>

    )
}



