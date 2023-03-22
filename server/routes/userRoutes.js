import express from "express";
import { registerUser, loginUser, signOutUser, routeGuard } from "../controller/userController.js";

const router = express.Router()


// Register a user
router.post('/register', registerUser)

// Login a user
router.post('/login', loginUser)

// Sign out a user
router.post('/signout', signOutUser)

// Route guard
router.post('/route-guard', routeGuard )






export default router