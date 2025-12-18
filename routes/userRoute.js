import express from 'express';
import { createUser, getUserById } from '../controllers/userController.js';
const userRoutes=express.Router();

userRoutes.post('/add-user',createUser);
userRoutes.get('/getUser/:userId',getUserById);


export default userRoutes;