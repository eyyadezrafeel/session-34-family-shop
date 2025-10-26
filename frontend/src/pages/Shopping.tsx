import { useState, useEffect, FormEvent } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface Item {
  id: number;
  name: string;
  status: "PENDING" | "INCLUDED" | "SKIPPED" | string;
}

const ShoppingList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const fetchItems = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await API.get("/item", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : res.data?.items ?? [];
        const pendingItems = data.filter((it: Item) => it.status === "PENDING");
        setItems(pendingItems);
      } catch (err) {
        console.error(err);
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [token]);

  
  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!newItem.trim() || !token) return;

    try {
      const res = await API.post(
        "/item",
        { name: newItem },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const created: Item = res.data;
      if (created?.status === "PENDING") setItems(prev => [...prev, created]);
      setNewItem("");
    } catch (err) {
      console.error(err);
      setError("Failed to add item");
    }
  };

  
  const handleStatusToggle = async (itemId: number, currentStatus: string) => {
    if (!token) return;
    const newStatus = currentStatus === "PENDING" ? "INCLUDED" : "PENDING";

    try {
      await API.post(
        "/item/updateItemStatus",
        { itemId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(prev =>
        prev.map(it =>
          it.id === itemId ? { ...it, status: newStatus } : it
        ).filter(it => it.status === "PENDING") // Keep only pending in this list
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update item status");
    }
  };

  return (
    <div className="max-w-xl  mx-auto mt-35 bg-[#F4F6F8]">
      <Header />
      <div className="p-8 ">
        <div className="fixed top-40 left-0 w-full bg-[#F4F6F8] shadow z-50 p-4">
        <h2 className="text-3xl font-bold mb-6 text-[#A7E8BD]">Shopping List</h2>

        <form onSubmit={handleAddItem} className="flex mb-6 ">
          <input 
            type="text"
            placeholder="Add new item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 border p-2 rounded-l border-gray-300 "
          />
          <button className="bg-[#5DADEC] cursor-pointer text-white px-4 py-2 rounded-r hover:bg-[#4A9DD9]">Add</button>
        </form>
        </div>
        <div className="p-8 max-w-xl mx-auto mt-30">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="flex justify-between bg-gray-100 p-2 rounded shadow-sm"
            >
              <span className="text-[#2D2D2D]">{item.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    item.status === "INCLUDED"
                      ? "text-green-600"
                      : "text-[#B9A2E1]"
                  }`}
                >
                  {item.status}
                </span>
                <button
                  onClick={() => handleStatusToggle(item.id, item.status)}
                  className=" cursor-pointer bg-[#5DADEC] text-white px-2 py-1 rounded hover:bg-[#4A9DD9]"
                >
                  {item.status === "PENDING" ? "Include" : "Pending"}
                </button>
              </div>
            </li>
          ))}
          {items.length === 0 && <p>No pending items yet.</p>}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
