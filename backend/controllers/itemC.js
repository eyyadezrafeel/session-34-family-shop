import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Add a new item to the current week's shopping list
export const addItem = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { family: true },
    });

    if (!user?.family) {
      return res.status(400).json({ message: "User not in a family" });
    }

    const activeList = await prisma.shoppingList.findFirst({
      where: { familyId: user.family.id, archived: false },
    });

    if (!activeList) {
      return res.status(404).json({ message: "No active shopping list" });
    }

    const item = await prisma.item.create({
      data: {
        name,
        addedById: userId,
        shoppingListId: activeList.id,
      },
      include: { addedBy: true },
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Update item status (PENDING / INCLUDED / SKIPPED)
export const updateItemStatus = async (req, res) => {
  const { itemId, status } = req.body;

  try {
    const item = await prisma.item.update({
      where: { id: itemId },
      data: { status },
    });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getItems = async (req, res) => {
  const userId = req.user.id; // from your auth middleware
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { family: { include: { shoppingLists: { include: { items: true } } } } },
  });

  if (!user?.family) return res.json([]);

  const latestList = user.family.shoppingLists.find(list => !list.archived);
  if (!latestList) return res.json([]);

  res.json(latestList.items);
};
