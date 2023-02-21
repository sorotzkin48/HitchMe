const express = require("express");
const app = express();
const port = 8080;
const carsRouter = require("./Routers/carsRouter");
const usersRouter = require("./Routers/usersRouter");
const ordersRouter = require("./Routers/ordersRouter");
const faqRouter= require('./Routers/faqRouter')
const contactRouter= require('./Routers/contactRouter')

let cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cors())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.get("/users/:name", (req, res) => {
//   debugger
//   res.json({ message: "ok" });
// });

console.log("in index.js");

app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/cars", carsRouter);
app.use("/api/faq", faqRouter);
app.use("/api/contact", contactRouter);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.error(err.message, err.stack);
//   res.status(statusCode).json({ message: err.message });
//   return;
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
