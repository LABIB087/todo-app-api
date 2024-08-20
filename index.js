// importing express and mongoose pakg.
const express = require("express");
const mongoose = require("mongoose");

// importing todoHandler route
const todoHandler = require('./routes/todoHandler')

const app = express();
app.use(express.json());
// mongodb url
const dbUrl =
  "mongodb+srv://labibahammed087:R26E0gzj3zBGMp8p@todo.ec4zh1n.mongodb.net/todos";
// connecting to the mongodb useing mongoose
mongoose
  .connect(dbUrl)
  .then(() => console.log("DB connection successfull"))
  .catch((error) => console.log(error));


// All routes
app.use('/todo', todoHandler)
// starting the express server
app.listen(5000, () => {
  console.log("app listening at port 5000");
});
