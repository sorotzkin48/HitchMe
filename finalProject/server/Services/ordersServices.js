const db = require('./db');
let nodemailer = require('nodemailer')


async function getAllOrders() {
    const AllOrders = await db.query(`select orderId, u.firstName , u.lastName, ct.brand, ct.model, ct.numberOfSeats, ct.color, o.insurance, o.pickUpDateTime,  o.returnDateTime,  o.numberOfHours, o.numberOfDays, dh.dayOrHourStatusName, os.orderStatusName, o.totalPrice
    from orders o
    join users u on u.userId=o.userId 
    join cars c on c.carId=o.carId
    join carType ct on ct.carTypeId=c.carTypeId
    join dayOrHourStatus dh on dh.dayOrHourStatusId=o.dayOrHourStatusId
    join orderStatus os on o.orderStatusId = os.orderStatusId `);
    return AllOrders;
}

async function getUserOrders(id) {

    const userOrders = await db.query(`select orderId, u.firstName , u.lastName, ct.brand, ct.model, ct.numberOfSeats, ct.color, o.insurance,  o.pickUpDateTime,  o.returnDateTime, o.numberOfHours, o.numberOfDays, dh.dayOrHourStatusName, os.orderStatusName, o.totalPrice
    from orders o
    join users u on u.userId=o.userId 
    join cars c on c.carId=o.carId
    join carType ct on ct.carTypeId=c.carTypeId
    join dayOrHourStatus dh on dh.dayOrHourStatusId=o.dayOrHourStatusId
    join orderStatus os on o.orderStatusId = os.orderStatusId 
    where u.userId=${id}`);
    return userOrders;
}


async function calculateTotalPrice(order) {
    try {
        let totalPrice
        let prices = await db.query(`SELECT ct.pricePerHour , ct.pricePerDay, ct.insurancePerHour, ct.insurancePerDay
        FROM cars c
        join carType ct on c.carTypeId=ct.carTypeId
        where c.carId=${order.carId}`)
        totalPrice = order.numberOfDays * (prices[0].pricePerDay) + order.numberOfHours * (prices[0].pricePerHour)
        if (order.insurance) totalPrice += order.numberOfDays * (prices[0].insurancePerDay) + order.numberOfHours * (prices[0].insurancePerHour)
        return totalPrice
    }
    catch (err) {
        console.log("error from check availability: " + err);
    }
}

async function checkCarAvailability(order) {
    try {
        let carBookings = await db.query(`SELECT o.orderId
        FROM orders o
        where (o.carId=${order.carId} and
           (('${order.pickUpDateTime}'>= o.pickUpDateTime
            and '${order.pickUpDateTime}' < o.returnDateTime)      
            or
            ('${order.returnDateTime}' > o.pickUpDateTime
            and '${order.pickUpDateTime}' < o.returnDateTime )
            or
            ('${order.pickUpDateTime}' >= o.pickUpDateTime
            and '${order.returnDateTime}' <= o.returnDateTime )
            or
            ('${order.pickUpDateTime}' < o.pickUpDateTime
            and '${order.returnDateTime}' > o.returnDateTime  )
            )
            )`)
        if (carBookings[0])
            return false
        return true
    }
    catch (err) {
        console.log("error from check availability: " + err);
    }
}

async function addOrder(order) {

    try {
        let able = await checkCarAvailability(order)
        if (!able) {
            return "your order  didnt go through successfully"//לא פנוי
        }
        else {
            let totalPrice = await calculateTotalPrice(order)
            await db.query(`insert into orders values(
            default,
            ${JSON.stringify(order.userId)},
            ${JSON.stringify(order.carId)},
            ${JSON.stringify(order.insurance)},
            '${order.pickUpDateTime}',
            '${order.returnDateTime}',
            ${JSON.stringify(order.numberOfHours)},
            ${JSON.stringify(order.numberOfDays)},
            1,
            ${JSON.stringify(order.dayOrHourStatusId)},
            ${JSON.stringify(totalPrice)})`);
            await db.query(`update users 
            set amountOfOrders= amountOfOrders+1 
            where userId=${order.userId}`)
            return "your order went through successfully"

        }

    } catch (err) {
        console.log("err:" + err);
    }
}
function sendEmail(price, emailAddress) {

    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'hitchme@outlook.co.il',
            pass: 'hitch100'
        }
    });

    let mailOptions = {
        from: 'hitchme@outlook.co.il',
        to:  emailAddress ,
        subject: 'Sending Email using Node.js',
        text: `your order was completed \n your total price is ${price}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function returnCar(orderId) {
    await db.query(`update orders 
     set orderStatusId= 2
     where orderId=${orderId}`);
    let emailAddress = await db.query(`SELECT users.email FROM users
    join orders on orders.userId=users.userId
    where orders.orderId=${orderId}`)
    let price = await db.query(`select totalPrice from orders where orderId=${orderId}`)
    price = Math.round(price[0].totalPrice)
    sendEmail(price, emailAddress[0].email)

}


module.exports = {
    getUserOrders, getAllOrders, addOrder, returnCar, checkCarAvailability
}


