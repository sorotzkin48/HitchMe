import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import PayPal from '../PayPal/PayPal.js'
import './NewOrder.css';

export default function NewOrder() {


    let { carId } = useParams();
    const [day, setDay] = useState(false)
    const [hour, setHour] = useState(false)
    const [amountOfDays, setAmountOfDays] = useState(0)
    const [amountOfHours, setAmountOfHours] = useState(0)
    const [insurance, setInsurance] = useState(false)
    const [pickUpDateTime, setPickUpDateTime] = useState(false)
    const [returnDateTime, setReturnDateTime] = useState(false)
    const [today, setToday] = useState()
    let navigate = useNavigate()



    useEffect(() => {
        let todayTmp = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
        setToday(todayTmp)
    }, [])



    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }



    function calculateReturnDateAndTime(val) {
        debugger
        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }
        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + days);
            return this;
        }
        val = new Date(val);
        setPickUpDateTime(`${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(val.getDate())} ${pad(val.getHours())}:${pad(val.getMinutes())}`)
        val.addDays(amountOfDays);
        val.addHours(amountOfHours);
        setReturnDateTime(`${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(val.getDate())} ${pad(val.getHours())}:${pad(val.getMinutes())}`)
    }



    async function handleOrder(event) {
        event.preventDefault()
        let DayOrHourStatusId;
        if (day) DayOrHourStatusId = 1;
        else DayOrHourStatusId = 2;
        let user = JSON.parse(sessionStorage.getItem("currentUser"))
        let order = {
            "userId": user.userId,
            "carId": carId,
            "insurance": insurance,
            "pickUpDateTime": pickUpDateTime,
            "returnDateTime": returnDateTime,
            "numberOfHours": amountOfHours,
            "numberOfDays": amountOfDays,
            "dayOrHourStatusId": DayOrHourStatusId
        }
        let result = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            mode: 'cors',
        })
        const text = await result.text();
        alert(text)
        if (text === 'your order went through successfully') {
            debugger
            navigate(`/home/order/${carId}/paypal`)
        }
    }


    function days() {
        setHour(false)
        setAmountOfHours(0)
        setDay(true)
    }

    function hours() {
        setDay(false)
        setAmountOfDays(0)
        setHour(true)
    }


    return (
        <form onSubmit={(event) => handleOrder(event)}>
            <p>Please select your age:</p>
            <input required onClick={() => days()} type="radio" id="daily" name="dayOrHour" value="day" />
            <label for="day">day</label><br />
            <input required onClick={() => hours()} type="radio" id="hourly" name="dayOrHour" value="hour" />
            <label for="hour">hour</label><br />

            {day && <input className="input_order" required id="amountOfDays" name="amountOfDays" type="number" placeholder="amount of days" onChange={event => setAmountOfDays(JSON.parse(event.target.value))} />}
            <br></br>
            {hour && <input className="input_order" required id="amountOfHours" name="amountOfHours" type="number" placeholder="amount of hours" onChange={event => setAmountOfHours(JSON.parse(event.target.value))} />}
            <br></br>
            <label>
                <input type="checkbox" onClick={(e) => setInsurance(e.target.checked)} />
                insurance
            </label>
            <br />

            <label>
                pick up date and hour<br />
                <input min={today} className="input_order" required type="datetime-local" onChange={(e) => calculateReturnDateAndTime(e.target.value)} />
            </label>
            <br />
            <Routes>
                <Route exact element={<PayPal />} path="/paypal" />
            </Routes>
            <Button variant="outline-secondary" type="submit">order</Button>
        </form>
    );
}
