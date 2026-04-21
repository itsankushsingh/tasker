import { Router } from 'express'
import {verifyUser} from '../middlewares/auth.middleware.js'

import {
    registerUser,
    loginUser,
    logoutUser,
    allUsers
} from '../controllers/user.controller.js'


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyUser,logoutUser)
router.route("/all-users").get(verifyUser,allUsers)


export default router