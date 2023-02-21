import React, { useState, useEffect } from 'react';
 import './AddCar.css';

export default function AddCar() {

    const [options, setOptions] = useState("");
    const [carChoosed, setCarChoosed] = useState();

    let tmpTypes = [];
    useEffect(() => {

        fetch(`http://localhost:8080/api/cars/carsTypes`)
            .then(carsTypes => carsTypes.json())
            .then(carsTypes => {
                tmpTypes=carsTypes
                tmpTypes.unshift("choose a car type")
                setOptions(tmpTypes.map((el) => {if(el==="choose a car type")
                return <option key={el} value={el} disabled selected>{el}</option>
                else return <option key={el.carsTypeId} value={el.carTypeId}>
                {el.carTypeId + " " + el.brand + " " + el.model + " " + el.color + " " + el.numberOfSeats}</option>}));

            })
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        if (carChoosed != null) {
            let carDetails = {
                "carTypeId": carChoosed,
                "city": event.target.city.value,
                "area": event.target.area.value,
                "street": event.target.street.value,
                "houseNumber": event.target.houseNumber.value
            }
            await fetch('http://localhost:8080/api/cars/addcar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carDetails),
                mode: 'cors',
            })        
        } else {
            alert('dear manager, please choose car type')
        }
    }
    function handleChange(event) {
        event.preventDefault()

        if (event.target.value != "choose a car type") {
            setCarChoosed(event.target.value)
        }

    }

    return (
        <>
            <div className='form addCarForm'>
                <div className='form_title'>
                    Add<span>C</span>ar
                </div>
                <form className='form_items' onSubmit={(event) => handleSubmit(event)}>
                    <div className='form_inputs'>
                        <input
                            name="city"
                            type='text'
                            required
                            placeholder="city"
                        />
                    </div>
                    <div className='form_inputs'>
                        <input
                            name="area"
                            type='text'
                            required
                            placeholder="area"
                        />
                    </div>
                    <div className='form_inputs'>
                        <input
                            name="street"
                            type='text'
                            required
                            placeholder="street"
                        />
                    </div>
                    <div className='form_inputs'>
                        <input
                            name="houseNumber"
                            type='text'
                            required
                            placeholder="house number"
                        />
                    </div>
                    <select onChange={(event) => handleChange(event)}>
                        {options}
                    </select>
                    <button className='form_button btn1'>add</button>

                </form>

            </div>
        </>

    );
}

