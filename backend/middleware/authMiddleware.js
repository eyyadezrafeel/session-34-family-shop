import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protect = async (req,res,next)=>{
let token;
if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
){
    token = req.headers.authorization.split(" ")[1];
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({where:{id:decoded.id}});
    if(!req.user){
        return res.status(401).json({message:"User not found"});
    }
    next();
}catch(err){
    console.error(err);
    res.status(401).json({massage:"Not authorized"});
  }
}
if(!token){
    return res.status(401).json({massage:"Not authorized,no token"});
}
}