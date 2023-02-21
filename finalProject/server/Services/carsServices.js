const db = require('./db');

async function getCars() {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    order by carId 
    `);
    return cars;
}


async function getCarsTypes() {
    const carsTypes = await db.query(`select carTypeId, numberOfSeats, color, brand, model from cartype`);
    return carsTypes;
}

async function getCarsByCity(cityId) {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    where cities.cityId= ${JSON.stringify(cityId)}
    order by carId `);
    return cars;
}
async function getCarsByCityAndArea(cityName, areaName) {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    where cities.cityName= ${JSON.stringify(cityName)} and a.areaName=${JSON.stringify(areaName)}
    order by carId `)
    return cars;
}


async function getCarsByCityName(cityName) {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    where cities.cityName= ${JSON.stringify(cityName)}
    order by carId `)
    return cars;
}


async function getCarsByCompany(company) {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    where ct.brand= ${JSON.stringify(company)}
    order by carId `)
    return cars;
}

async function getCarsBySize(size) {
    const cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
    cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
    FROM cars c
    join carType ct on c.carTypeId=ct.carTypeId
    join locations l on c.locationId=l.locationId
    join cities on cities.cityId=l.cityId 
    join streets s on s.streetId=l.streetId 
    join areas a on a.areaId=l.areaId 
    where ct.numberOfSeats= ${size}
    order by carId `)
    return cars;
}



async function getCities() {
    const cities = await db.query(`SELECT cityName FROM cities`)
    return cities;
}



async function getCompaneis() {
    const cars = await db.query(`SELECT brand FROM cartype group by brand`)
    return cars;
}



async function getSizes() {
    const cars = await db.query(`SELECT numberOfSeats FROM cartype group by numberOfSeats`)
    return cars;
}

async function getAreasByCity(cityName) {

    const cars = await db.query(`SELECT areaName FROM cars c
    join locations l on l.locationId=c.locationId
    join cities ct on ct.cityId=l.cityId
    join areas a on a.areaId=l.areaId
    where cityName=${JSON.stringify(cityName)}
    group by areaName`)
    return cars;
}

async function getTenRightCars(index) {

    const amountOfCars = await db.query(`SELECT COUNT(*) FROM cars`)
    let cars;
    if ((index + 10) < amountOfCars) {
        cars = await db.query(`SELECT c.carId,  c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
        cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
        FROM cars c
        join carType ct on c.carTypeId=ct.carTypeId
        join locations l on c.locationId=l.locationId
        join cities on cities.cityId=l.cityId 
        join streets s on s.streetId=l.streetId 
        join areas a on a.areaId=l.areaId 
        where c.carId between ${index} and ${index}+9`)
    }
    else {
        cars = await db.query(`SELECT c.carId, c.carTypeId, ct.numberOfSeats, ct.color, ct.brand, ct.model,ct.pricePerHour, ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay,ct.wazeExists,
        cities.cityName, s.streetName, a.areaName , l.houseNumber, cities.cityId
        FROM cars c
        join carType ct on c.carTypeId=ct.carTypeId
        join locations l on c.locationId=l.locationId
        join cities on cities.cityId=l.cityId 
        join streets s on s.streetId=l.streetId 
        join areas a on a.areaId=l.areaId 
        where c.carId between ${index} and ${amountOfCars}`)
    }
    return cars;
}

async function addCar(carDetails) {
    let locationId
    let cityId, areaId, streetId;
    cityId = await db.query(`SELECT cityId FROM cities 
        where cityName =  ${JSON.stringify(carDetails.city)}`)
    if (cityId[0] === undefined) {
        await db.query(`insert into cities values (default, ${JSON.stringify(carDetails.city)})`)
        cityId = await db.query(` SELECT MAX(cityId) FROM cities`)
        cityId = cityId[0]['MAX(cityId)']
    }
    else {
        cityId = cityId[0].cityId
    }
    areaId = await db.query(`SELECT areaId FROM areas 
        where areaName =  ${JSON.stringify(carDetails.area)}`)

    if (areaId[0] === undefined) {
        await db.query(`insert into areas values (default, ${JSON.stringify(carDetails.area)})`)
        areaId = await db.query(` SELECT MAX(areaId) FROM areas`)
        areaId = areaId[0]['MAX(areaId)']
    }
    else {
        areaId = areaId[0].areaId
    }
    streetId = await db.query(`SELECT streetId FROM streets 
        where streetName =  ${JSON.stringify(carDetails.street)}`)
    if (streetId[0] === undefined) {
        await db.query(`insert into streets values (default, ${JSON.stringify(carDetails.street)})`)
        streetId = await db.query(` SELECT MAX(streetId) FROM streets`)
        streetId = streetId[0]['MAX(streetId)']
    }
    else {
        streetId = streetId[0].streetId
    }

    locationId = await db.query(`select locationId from locations
        where cityId=${cityId} and areaId=${areaId} and streetId=${streetId} and houseNumber =${JSON.stringify(carDetails.houseNumber)}`)

    if (locationId[0] === undefined) {

        await db.query(`insert into locations values
        (default,
        ${JSON.stringify(cityId)},
        ${JSON.stringify(areaId)},
        ${JSON.stringify(streetId)},
        ${carDetails.houseNumber})`)

        locationId = await db.query(` SELECT MAX(locationId) FROM locations`)
        locationId = locationId[0]['MAX(locationId)']

    }
    else {
        locationId = locationId[0].locationId
    }

    await db.query(`insert into cars values
        (default,
        ${carDetails.carTypeId},
        ${JSON.stringify(locationId)})`)

}


async function getAmountOfCars() {
    const amountOfCars = await db.query(`SELECT COUNT(*) FROM cars`)
    return amountOfCars
}
module.exports = {
    getCars, getCarsByCity, getCarsByCityAndArea, getCarsByCityName, getCarsByCompany, getCarsBySize,
    getCities, getCompaneis, getSizes, getAreasByCity, getTenRightCars, getAmountOfCars, getCarsTypes, addCar
}