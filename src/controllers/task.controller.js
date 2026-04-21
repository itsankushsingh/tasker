import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {canAccessTask} from '../utils/canAccessTask.js'


// Creating New Task
const newTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title) {
        throw new ApiError(400,"Title is Required")
    }

    const task = await Task.create({
        title,
        description,
        dueDate,
        assignedTo: req.user._id,
        createdBy: req.user._id
    });

    return res
    .json(new ApiResponse(200,{task},"Task Created Successfully"))
})

//Assign Task
const assignTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!(req.user.role === "admin")) {
        throw new ApiError(403,"Forbidden: Access Denied")
    }

    if (!title) {
        throw new ApiError(400,"Title is Required")
    }
    if (!assignedTo) {
        throw new ApiError(400,"Please Assign A User")
    }

    // const user = await User.findOne({ _id:assignedTo }).select("fullName, username,email")
    const user = await User.findById(assignedTo)
    
    if (!user) {
        throw new ApiError(404,"User Not Found")
    }

    const task = await Task.create({
        title,
        description,
        dueDate,
        assignedTo,
        createdBy: req.user._id
    });

    return res
    .json(new ApiResponse(200,{task},"Task Created Successfully"))
})

// Fetching All Tasks
const getTask = asyncHandler(async (req, res) => {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "username email");
    } else {
      tasks = await Task.find({ assignedTo: req.user._id });
    }

    return res
        .json(
        new ApiResponse(200,{tasks},"Fetched All Tasks")
    )
})

//Update Task
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        throw new ApiError(404,"Task Not Found")
    }

    if (!canAccessTask(req.user,task)) {
        throw new ApiError(403,"Forbidden: Access Denied")
    }
    const { title, description, dueDate,status } = req.body;

    if (!title) {
        throw new ApiError(404,"Title is Required")
    }
    if (!status) {
        throw new ApiError(404,"Status is Required")
    }
    

    const updatedTask = await Task.findByIdAndUpdate(
        task._id,
        {
            title,
            description,
            dueDate,
            status
        },
        { new: true, runValidators: true }
    )
    return res
    .json(new ApiResponse(200,{updatedTask},"Updated Successfully"))
})

// Update Status of Task
const updateStatus = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    const status = req.body.status;

    if (!task) {
        throw new ApiError(404,"Task Not Found")
    }

    if (!status) {
        throw new ApiError(400, "Status Can Not Be Empty");
    }
    if (!canAccessTask(req.user, task)) {
            throw new ApiError(403, "Forbidden: Access Denied");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        task._id,
        {
            status
        },
        {
            new: true,
            runValidatorr:true
        }
    )

    return res
    .json (new ApiResponse(200,{updatedTask},"Task Updated"))

})

//Delete Task
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        throw new ApiError(404, "Task Not Found")
    }
    if (!canAccessTask(req.user, task)) {
        throw new ApiError(403, "Forbidden: Access Denied")
    }

    await task.deleteOne();

    return res.json(
        new ApiResponse(200, {deletedTask:task},"Task Deleted Successfully")
    )
})

export {
    newTask,
    assignTask,
    getTask,
    updateTask,
    updateStatus,
    deleteTask

}