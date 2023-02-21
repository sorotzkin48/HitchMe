import React, { useEffect, useState } from 'react';
import SingleCar from "../SingleCar/SingleCar";
import './Cars.css'

const Cars = () => {
	const [carsArray, setCarsArray] = useState([]);
	const [index, setIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(1);
	const [amountOfCars, setAmountOfCars] = useState(0);
	const [imgUrl, setImgUrl] = useState();
	const [selected, setSelected] = useState("");
	const [options, setOptions] = useState();
	const [areasOption, setAreasOption] = useState("");
	const [cityChoosed, setCityChoosed] = useState();
	const [someCars, setSomeCars] = useState(false)
	let type = [];


	useEffect(() => {
		fetch(`http://localhost:8080/api/cars/right/1`)
			.then(tenCars => tenCars.json())
			.then(tenCars => {
				setCarsArray([...tenCars])
				setRightIndex(rightIndex + 10)
				let url1 = require(`../images/${tenCars[0].carTypeId}.png`)
				setImgUrl(url1)
			})

		fetch(`http://localhost:8080/api/cars/amountOfCars`)
			.then(amountOfCars2 => amountOfCars2.json())
			.then(amountOfCars2 => {
				setAmountOfCars(amountOfCars2[0]['COUNT(*)']);
			})
	}, [])

	async function changeSelectOptionHandler(event) {
		if (event.target.value === "city") {
			setSelected(event.target.value)
			let cities = await fetch(`http://localhost:8080/api/cars/city`);
			cities = await cities.json();
			cities.forEach(element => {
				type.push(element.cityName)
			});
			type.unshift("choose a city")
			setOptions(type.map((el) => {
				if (el === "choose a city")
					return <option key={el} value={el} disabled selected>{el}</option>
				else return <option key={el} value={el}>{el}</option>
			}));

		} else if (event.target.value === "company") {
			setAreasOption(null)
			setSelected(event.target.value)
			let companies = await fetch(`http://localhost:8080/api/cars/company`);
			companies = await companies.json();
			companies.forEach(element => {
				type.push(element.brand)
			});
			type.unshift("choose a company")
			setOptions(type.map((el) => {
				if (el === "choose a company")
					return <option key={el} value={el} disabled selected>{el}</option>
				else return <option key={el} value={el}>{el}</option>
			}));

		} else if (event.target.value === "size") {
			setAreasOption(null)
			setSelected(event.target.value)
			let sizes = await fetch(`http://localhost:8080/api/cars/size`);
			sizes = await sizes.json();
			sizes.forEach(element => {
				type.push(element.numberOfSeats)
			});
			type.unshift("choose a size")
			setOptions(type.map((el) => {
				if (el === "choose a size")
					return <option key={el} value={el} disabled selected>{el}</option>
				else return <option key={el} value={el}>{el}</option>
			}));

		}
	}

	async function handleChange(event) {
		setCityChoosed(event.target.value)
		let cars = await fetch(`http://localhost:8080/api/cars/${selected}/${event.target.value}`);
		cars = await cars.json();
		setCarsArray(cars)
		setSomeCars(true)
		if (!cars[0]) {
			alert("no cars");
		}
		if (selected === "city") {
			let areas = await fetch(`http://localhost:8080/api/cars/city/${event.target.value}/areas`);
			areas = await areas.json();
			areas.forEach(element => {
				type.push(element.areaName)
			});
			type.unshift("choose an area")
			if (type[0]) {
				setAreasOption(type.map((el) => <option key={el} value={el}>{el}</option>));
			}
		}
	}


	async function areasOptionChange(event) {
		if (event.target.value != "choose an area") {
			fetch(`http://localhost:8080/api/cars/city/${cityChoosed}/area/${event.target.value}`)
				.then(cars => cars.json())
				.then(cars => {
					setCarsArray([...cars])
					setSomeCars(true)
				})
		}
	}


	async function clickedRight() {
		if ((index + 1) % 10 === 0 && (index + 1) === rightIndex - 1 && index != amountOfCars) {
			let tenCars = await fetch(`http://localhost:8080/api/cars/right/${rightIndex}`);
			tenCars = await tenCars.json();
			setCarsArray([...carsArray, ...tenCars])
			setRightIndex(rightIndex + 10)
			setIndex((index + 1) % (carsArray.length + tenCars.length))
			let url1 = require(`../images/${tenCars[0].carTypeId}.png`)
			setImgUrl(url1)
		}
		else {
			let url1 = require(`../images/${carsArray[index + 1].carTypeId}.png`)
			setImgUrl(url1)
			debugger
			setIndex((index + 1) % carsArray.length)
		}
	}


	async function clickedLeft() {
		let url1 = require(`../images/${carsArray[index - 1].carTypeId}.png`)
		setImgUrl(url1)
		if (index != 0)
			setIndex((index - 1))
	}


	return (
		<div>
			<div className="singleCarDivInCars">
				{carsArray[0] && imgUrl && <SingleCar myCar={carsArray[index]} url={imgUrl} currentAmountOfCars={carsArray.length} someCars={someCars} index={index} clickedLeft={() => clickedLeft()} clickedRight={() => clickedRight()} />}
			</div>
			<div className="selects">
				<div>
					<select className="selectCar" onChange={changeSelectOptionHandler}>
						<option disabled selected>Choose category...</option>
						<option>city</option>
						<option>company</option>
						<option>size</option>
					</select>
				</div>
				{options && <div>
					<select className="selectCar" onChange={(event) => handleChange(event)} >
						{options}
					</select>
				</div>}
				{areasOption && <div>
					<select className="selectCar" onChange={(event) => areasOptionChange(event)} >
						{areasOption}
					</select>
				</div>}
			</div>
		</div>
	);
};

export default Cars;

