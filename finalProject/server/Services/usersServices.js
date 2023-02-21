const db = require('./db');

async function getUsers() {
    const users = await db.query(`select u.userId, u.firstName, u.lastName, u.licenseNumber, 
    u.licenseExpiery, u.dateOfBirth, u.city, u.area, u.street,u.houseNumber, u.email, u.phone,
     u.password,ut.userTypeName as userType, u.amountOfOrders
    from users u 
     join userTypes ut 
     on u.userTypeId=ut.userTypeId`);
    return users;
}
async function getUser(details) {
    const a = `select u.userId, u.firstName, u.lastName, u.licenseNumber, u.licenseExpiery, u.dateOfBirth, u.city, u.area, u.street,u.houseNumber, u.email, u.phone, u.password,ut.userTypeName as userType, u.amountOfOrders
    from users u
   join userTypes ut on u.userTypeId=ut.userTypeId
   where u.email = ${JSON.stringify(details.email)} and u.password=  ${JSON.stringify(details.password)} `
    const user = await db.query(a);
    return user;
}

async function getUserById(id) {
    const user = await db.query(`select * from users where userId = ${id} `);
    return user;
}

async function addUser(user) {
    try {
        if (user.licenseNumber == '' || user.licenseExpiery == '') {
            await db.query(`insert into users values(
            ${JSON.stringify(user.userId)},
            ${JSON.stringify(user.userTypeId)},
            ${JSON.stringify(user.firstName)},
            ${JSON.stringify(user.lastName)},
            null,
            null,
            ${JSON.stringify(user.dateOfBirth)},
            ${JSON.stringify(user.city)},
            ${JSON.stringify(user.area)},
            ${JSON.stringify(user.street)},
            ${JSON.stringify(user.houseNumber)},
            ${JSON.stringify(user.email)},
            ${JSON.stringify(user.phone)},
            ${JSON.stringify(user.password)},
            0)`);
        } else {
            await db.query(`insert into users values(
                ${JSON.stringify(user.userId)},
                ${JSON.stringify(user.userTypeId)},
                ${JSON.stringify(user.firstName)},
                ${JSON.stringify(user.lastName)},
                ${JSON.stringify(user.licenseNumber)},
                ${JSON.stringify(user.licenseExpiery)},
                ${JSON.stringify(user.dateOfBirth)},
                ${JSON.stringify(user.city)},
                ${JSON.stringify(user.area)},
                ${JSON.stringify(user.street)},
                ${JSON.stringify(user.houseNumber)},
                ${JSON.stringify(user.email)},
                ${JSON.stringify(user.phone)},
                ${JSON.stringify(user.password)},
                0)`);
        }
    } catch (err) {
        console.log("err: " + err);
    }
}

module.exports = {
    getUsers, getUser, getUserById, addUser
}