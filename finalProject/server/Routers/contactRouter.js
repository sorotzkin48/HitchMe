const express = require('express');
const contactServices = require('../Services/contactServices');
const router = express.Router();


router.get('/getContacts', async (req, res, next) => {
    try {
        let result = await contactServices.getContacts();
        res.send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});


router.post('/', (req, res, next) => {
    debugger
    console.log("in post contact services");
    try {
        debugger
        contactServices.addContact(req.body)
        res.send('post contact')
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.delete('/deleteContact', async (req, res, next) => {
    debugger
    try {
        debugger
        contactServices.deleteContact(req.body)
        res.send("deleted contact");
    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = router;
