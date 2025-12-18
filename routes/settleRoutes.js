import express from 'express';
import { settleUp } from '../controllers/settlementController.js';

const settleRoutes=express.Router();

settleRoutes.post('/se',settleUp);

export default settleRoutes;