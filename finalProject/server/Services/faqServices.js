const db = require('./db');
const jFile = require('jsonfile')
const path = require("path")
const jsonfile = path.join(__dirname, "/../faq.json")

async function getFaqs() {
    return new Promise((resolve, reject) => {
        jFile.readFile(jsonfile, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }
        })
    })
}

module.exports = { getFaqs }