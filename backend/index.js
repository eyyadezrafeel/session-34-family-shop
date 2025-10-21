import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authR.js';
import familyRouter from './routers/familyR.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('api/auth',authRouter);
app.use('api/family',familyRouter);

app.listen(PORT,()=>{
    console.log(`server is runnning on port http://localhost:${PORT}`)
})