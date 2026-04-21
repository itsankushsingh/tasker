import { Router } from 'express'
import {
    verifyUser,
 } from '../middlewares/auth.middleware.js'

import {
    newTask,
    assignTask,
    getTask,
    updateTask,
    updateStatus,
    deleteTask,
 } from '../controllers/task.controller.js'

const router = Router()

router.route("/new-task").post(verifyUser,newTask)
router.route("/assign-task").post(verifyUser,assignTask)
router.route("/all-tasks").get(verifyUser,getTask)
router.route("/update/:id").patch(verifyUser,updateTask)
router.route("/:id").patch(verifyUser,updateStatus)
router.route("/:id").delete(verifyUser,deleteTask)



export default router