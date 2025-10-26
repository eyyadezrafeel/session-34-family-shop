import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const existing = await prisma.user.findMany({ where:{email}});
if (!existing) {return res.status(400).json({massage:"User already exists"})};

const hashedPassword = await bcrypt.hash(password,10);
const user = await prisma.user.create({
    data:{name,email,password:hashedPassword},
});
const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{ expiresIn:"1d"});

res.status(201).json({token,user:{id:user.id,name,email}});

    }catch(err){
        console.error(err);
        res.status(500).json({massage:"Server error"});
    }
};

export const loginUser = async (req,res)=>{
const {email,password} = req.body;
try{
const user = await prisma.user.findUnique({where:{email}});
if(!user) return res.status(400).json({massage:"Invalid credentials"});

const isMatch = await bcrypt.compare(password,user.password);
if (!isMatch) return res.status(400).json({massage:"Invalid credentials"});

const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
    expiresIn:"1d",
});
res.json({token,user:{id:user.id, name:user.name, email:user.email}})
}catch(err){
    console.error(err);
    res.status(500).json({massage:"Server error"});
}


}