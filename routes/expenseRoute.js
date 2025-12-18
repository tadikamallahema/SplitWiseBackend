import express from 'express';
import { addExpenses } from '../controllers/expenseController.js';

const expenseRoutes=express.Router();

expenseRoutes.post('/groups/:groupId/expenses',addExpenses);


export default expenseRoutes;