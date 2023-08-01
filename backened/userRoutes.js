const express = require('express');
const mongoose = require("mongoose");
// const User = require('./Models/userModel');
const userModel = require('./Models/userModel');

const Router = express.Router();
//Create Operation

Router.post("/", async(req,res)=>{
    const {task, description, deadline, status} = req.body;
    const User = require("./Models/userModel");
 
    try{
    const userData = await User.create({
         task: task,
         description: description,
         deadline: deadline,
         status: status,
    });
 
    res.status(201).json(userData);
 } catch(error){
 
     console.log(error);
     res.status(400).json({error: error.message});
 }
 });

 
 
 //Get Operation
 Router.get("/",async(req,res) => {
 try{
     const showAll = await userModel.find();
     res.status(200).json(showAll);
 } catch{
     console.log(error);
     res.status(500).json({error: error.message});
 }
 });

 //Get Single Task
 
Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  
  try {
    const singleTask = await userModel.findById(id);
    if (!singleTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


//Delete Operation
Router.delete("/:id",async(req,res) => {
    const {id} = req.params;
    try{
        const singleTask = await userModel.findByIdAndDelete({_id: id});
        res.status(200).json(singleTask);
    } catch{
        console.log(error);
        res.status(500).json({error: error.message});
    }
    });

//Put/Patch/Update Operation
Router.patch("/:id",async(req,res) => {
    const {id} = req.params;
    const {task, description, deadline, status} = req.body;
    try{
        const userUpdate = await userModel.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.status(200).json(userUpdate);
    } catch{
        console.log(error);
        res.status(500).json({error: error.message});
    }
    });

 module.exports = Router;