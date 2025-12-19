import express from 'express';
import { getUserBalance, settleUp, simplifyGroupBalances } from '../controllers/settlementController.js';
//import { simplifyBalances } from '../service/balanceService.js';

const settleRoutes=express.Router();

settleRoutes.post('/se',settleUp);
settleRoutes.post('/gr/:groupId/simplify',simplifyGroupBalances);
settleRoutes.get('/gr/:userId/balances',getUserBalance)
export default settleRoutes;