import express from 'express';
import { createGroup } from '../controllers/groupController.js';

const groupRoutes=express.Router();

groupRoutes.post('/groups',createGroup);


export default groupRoutes;