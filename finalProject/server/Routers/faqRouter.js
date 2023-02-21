const express = require('express');
const faqServices = require('../Services/faqServices')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await faqServices.getFaqs();
        console.log("in get faqs router");
        res.json(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = router;