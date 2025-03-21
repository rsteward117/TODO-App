const Task = require('../models/Task');
const { body, validationResult } = require("express-validator");
require('dotenv').config();
const asyncHandler = require("express-async-handler");
const { findByIdAndUpdate } = require('../models/User');

exports.get_Task_by_id = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    res.json({task});
});

exports.get_user_tasks = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.json({ tasks });
  });


  exports.delete_task = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task was deleted" });
});


exports.complete_task = asyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;

    const task = await Task.findByIdAndUpdate(
        taskId,
        { completed: true },
        { new: true }
    );

    res.json({
        success: true,
        data: task
    });
});


exports.create_task = [
    body("title")
    .notEmpty().withMessage("A Title is required")
    .escape(),
    body("description")
    .notEmpty().withMessage("Some content is required")
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({message: errors.errors[0].msg })    
        } else{
            const {title, description } = req.body;
            const user = req.user.id;
            const newPost = new Task({title, description, user});
            await newPost.save();
        }
    })
];

exports.update_task = [
    body("title")
    .notEmpty().withMessage("A Title is required")
    .escape(),
    body("description")
    .notEmpty().withMessage("Some content is required")
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({message: errors.errors[0].msg})    
        } else{
            const taskId = req.params.taskId;
            const {title, description } = req.body;
            const user = req.user.id;

            const UpdatedTask = await Task.findByIdAndUpdate(
                taskId,
                { title, description },
                { new: true }
            );
            
            res.status(200).json({ message: "Task updated successfully", task: UpdatedTask });
        }
    })
];

