import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authR.js';
import familyRouter from './routers/familyR.js';
import shoppingRouter from './routers/shoppingR.js';
import itemRouter from './routers/itemR.js';

import  helmet from 'helmet';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(helmet());

const PORT = process.env.PORT || 4000;

app.get('/status',(req , res) =>{
    res.send("OK");
} )

app.use('/api/auth',authRouter);
app.use('/api/family',familyRouter);
app.use('/api/shopping',shoppingRouter);
app.use('/api/item',itemRouter);


app.get('/',(req,res)=>{
    res.send('Family Shopping List API is running');
});

app.listen(PORT,()=>{
    console.log(`server is runnning on port http://localhost:${PORT}`)
})