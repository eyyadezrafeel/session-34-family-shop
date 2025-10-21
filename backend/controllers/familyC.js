import { PrismaClient } from "@prisma/client";
import {randomBytes} from "crypto";

const prisma = new PrismaClient();

export const createFamily = async (req,res) => {
    const {name} = req.body;
    const userId = req.user.id
    try{
        const code = "FAM-"+randomBytes(3).toString("hex").toUpperCase();
        const inviteLink = `http://localhost:3000/join/${code}`;

        const family = await prisma.family.create({
            data:{
                name,
                code,
                inviteLink,
                users:{connect:{id:userId}},
            },
        });
        await prisma.user.update({
            where:{id:userId},
            data:{familyId:family.id},
        });
        res.status(201).json({massage : "Family created successfully", family});

    }catch(err){
        console.error(err);
        res.status(500).json({massage:"Server error"});
    }
};

export const joinFamily = async (req,res) => {
    const {code} = req.body;
    const userId = req.user.id;
    try{
        const family = await prisma.family.findUnique({where:{code}});
        if(!family) return res.status(404).json({massage:"family not found"});

        await prisma.user.update({
        where : {id:userId},
        data : {familyId:family.id},
        });
        res.json({massage:"Joined family successfully", family});
    }catch(err){
        console.error(err);
        res.status(500).json({massage:"Server error"});
    }
}