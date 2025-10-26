import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrCreateShoppingList = async (req,res) => {
    const userId = req.user.id;

    try{
const user = await prisma.user.findUnique({
    where:{id:userId},
    include:{family:true},
});
if(!user?.family){
    return res.status(400).json({massage:"user not in a family"})
}
const familyId = user.family.id;

const today = new Date();


const dayOfWeek = today.getDay();

const weekStart = new Date(today);
weekStart.setDate(today.getDate() - dayOfWeek);
weekStart.setHours(0,0,0,0);

const weekEnd = new Date(weekStart);
weekEnd.setDate(weekStart.getDate() + 6);
weekEnd.setHours(23,59,59,999);


let shoppingList = await prisma.shoppingList.findFirst({
    where:{familyId,
        archived:false,
        weekStart:{lte:today},
        weekEnd:{gte:today},
    },
    include:{items:{include:{addedBy:true}}},
});
if(!shoppingList){
    shoppingList = await prisma.shoppingList.create({
        data:{
            weekStart,
            weekEnd,
            familyId,
        },
        include:{items:true},
    });
}
res.json({shoppingList});
    }catch(err){
        console.error(err);
        res.status(500).json({massage:"server error"});
    }
};

export const archiveList = async (req,res) =>{
    try{
        const result = await prisma.shoppingList.updateMany({
            where:{archived:false},
            data:{archiver:true},
        });
        res.json({massage:"Shopping list archived", result});
    }catch(err){
        console.error(err);
        res.status(500).json({massage:"server error"});
    }
};
export const getArchivedLists = async (req,res) =>{
    const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { family: true },
    });

    if (!user?.family) {
      return res.status(400).json({ message: "User not in a family" });
    }

    const familyId = user.family.id;

    const lists = await prisma.shoppingList.findMany({
      where: { familyId, archived: true },
      include: { items: true },
      orderBy: { weekStart: "desc" },
    });

    res.json({ lists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};