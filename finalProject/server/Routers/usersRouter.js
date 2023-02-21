
const express = require('express');
const usersService = require('../Services/usersServices')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log("in get user router");

        let result = await usersService.getUsers();
        if (result) {
            result.map(user => {
                console.log("first name:" + user.firstName + " id: " + user.userId);
            })
        }
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }

});

router.post("/email/password", async (req, res, next) => {
    debugger
    try {
        console.log('in email pass router');
        let result = await usersService.getUser(req.body);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
        next(err)
    }
});
router.get("/id/:id", async (req, res, next) => {
    try {
        console.log('in get user by id router');
        let result = await usersService.getUserById(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        next(err)
    }

});


router.post('/', (req, res, next) => {
    try {
        usersService.addUser(req.body)
        res.send('got new period type')
    } catch (err) {
        alert(err)
        next(err)
    }

});



module.exports = router;