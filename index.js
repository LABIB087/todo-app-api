// importing express and mongoose pakg.
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
// importing todoHandler route
const todoHandler = require('./routes/todoHandler')
const userHandler = require('./routes/userHandler')
const app = express();
dotenv.config();
app.use(express.json());

// MONGO DB url
const dbUrl = process.env.MONGO;
// connecting to the mongodb useing mongoose
mongoose
  .connect(dbUrl)
  .then(() => console.log("DB connection successfull"))
  .catch((error) => console.log(error));


// All routes
app.use('/todo', todoHandler)
app.use('/user', userHandler)
// starting the express server
app.listen(5000, () => {
  console.log("app listening at port 5000");
});
