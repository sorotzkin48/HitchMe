const express = require('express');
const carsService = require('../Services/carsServices');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        let result = await carsService.getCars();
        console.log("in get cars router");
        res.send(result);
    } catch (err) {
        alert(err)
        next(err)
    }


});


router.get('/carsTypes', async (req, res, next) => {
    try {
        let result = await carsService.getCarsTypes();
        console.log("in get cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});


router.get('/right/:index', async (req, res, next) => {
    try {
        let result = await carsService.getTenRightCars(req.params.index);
        console.log("in get ten right cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});



router.post('/addcar', async (req, res, next) => {
    try {
        debugger
         await carsService.addCar(req.body)
        console.log("in add cars router");
        res.send('in add cars router');
    } catch (err) {
        console.log("err: " + err);
        next(err)
    }
});


router.get('/amountOfCars', async (req, res, next) => {
    try {
        let result = await carsService.getAmountOfCars();
        console.log("in get amount of cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.get('/city/:cityName', async (req, res, next) => {
    try {
        let result = await carsService.getCarsByCityName(req.params.cityName);

        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }

});

router.get('/company/:company', async (req, res, next) => {
    try {
        let result = await carsService.getCarsByCompany(req.params.company);
        if (result) {
            console.log("got cars successfully according to company");
        }
        res.send(result);
    } catch (err) {
        console.log("error in get cars by company " + err);
        next(err)
    }

});
router.get('/size/:size', async (req, res, next) => {
    try {
        let result = await carsService.getCarsBySize(req.params.size);
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }

});


router.get('/city', async (req, res, next) => {
    try {
        let result = await carsService.getCities();
        console.log("in get cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }


});

router.get('/company', async (req, res, next) => {
    try {
        let result = await carsService.getCompaneis();
        console.log("in get cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});


router.get('/size', async (req, res, next) => {
    try {
        let result = await carsService.getSizes();
        console.log("in get cars router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }


});

router.get('/:cityId', async (req, res, next) => {
    try {
        let result = await carsService.getCarsByCity(req.params.cityId);
        console.log("in get cars router");
        if (result) {
            result.map(item => {
                console.log("car id" + item.carId + " color: " + item.color);
            })
        }
        res.send(result);
    } catch (err) {
        alert(err)
        next(err)
    }

});



router.get('/city/:cityName/areas', async (req, res, next) => {
    try {
        let result = await carsService.getAreasByCity(req.params.cityName);
        console.log("in get areas router");
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }

});

router.get('/city/:cityName/area/:areaName', async (req, res, next) => {
    try {
        let result = await carsService.getCarsByCityAndArea(req.params.cityName, req.params.areaName);
        res.send(result);
    } catch (err) {
        alert(err)
        next(err)
    }

});

module.exports = router;
