const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// creating model
const todoSchema = require("../schema/todo.schema.js");
const Todo = new mongoose.model("Todo", todoSchema);

// defining all the routes

// POST A TODO
router.post("/create", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
});

// GET ALL TODO
router.get("/get", async (req, res) => {
    try{
        let data = await Todo.find({}).select({
            _id: 0,
            __v: 0,
            date: 0
        });

        res.status(200).json({
            result: data
        })
        
    }
    catch(error){
        console.log(error.message)
    }
});

// UPDATE A TODO
router.put("/update/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.status(200).json({
      message: "Todo updated successfully!!",
    });
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE A TODO
router.delete("/delete/:id", async (req, res) => {
    await Todo.deleteOne({_id: req.params.id})
    res.status(200).json({
        message: "Todo deleted successfuly"
    })
});

module.exports = router;
