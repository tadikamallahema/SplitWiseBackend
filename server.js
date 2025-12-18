import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import groupRoutes from './routes/groupRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import settleRoutes from './routes/settleRoutes.js';

const dburl='mongodb://localhost:27017/credresolveassessment';

mongoose.connect(dburl).then (()=>{
    console.log("Connected to Database Successfully")
}).catch((err)=>{
    console.log(err.message);
});

const app=express();

app.use(express.json());
app.get('/',(req,res)=>res.send("API WORKING"));
app.use('/user/',userRoutes);
app.use('/g',groupRoutes);
app.use('/ee',expenseRoutes);
app.use('/settle',settleRoutes);
const PORT = process.env.PORT || 2026;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
