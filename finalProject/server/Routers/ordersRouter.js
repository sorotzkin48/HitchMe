const express = require('express');
const ordersService = require('../Services/ordersServices')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await ordersService.getAllOrders();
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.get('/id/:id', async (req, res, next) => {
    try {
        console.log('order with id router');
        let result = await ordersService.getUserOrders(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err)
        next(err)
    }

});



router.post('/', async (req, res, next) => {
    try {
        console.log('in order posr reouter');

        let result = await ordersService.addOrder(req.body)
        if (result === "your order went through successfully") {
            res.status(200).send(result)
        }else {
            res.status(406).send(result)

        }

    } catch (err) {
        console.log("err: " + err);
        next(err)
    }

});


router.put('/:orderId/returnCar', (req, res, next) => {
    try {

        ordersService.returnCar(req.params.orderId)
        res.send('return car')
    } catch (err) {
        console.log("error in return car: " + err);
        next(err)
    }

});
module.exports = router;