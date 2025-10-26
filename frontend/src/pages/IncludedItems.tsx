import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  status: "PENDING" | "INCLUDED" | "SKIPPED";
};

const IncludedItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");

    const fetchItems = async () => {
      try {
        const res = await API.get("/item", { headers: { Authorization: `Bearer ${token}` } });
        
        const included = res.data.filter((item: Item) => item.status === "INCLUDED");
        setItems(included);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className=" max-w h-screen mx-auto mt-40  bg-[#F4F6F8]">
      <Header></Header>
      <div className="p-4 max-w-xl mx-auto ]">
        <h2 className="text-2xl font-bold mb-4 text-[#B9A2E1]">Included Items</h2>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="bg-gray-100 p-2 rounded shadow-sm text-[#2D2D2D]">
              {item.name}
            </li>
          ))}
          {items.length === 0 && <p>No included items yet.</p>}
        </ul>
      </div>
    </div>
  );
};

export default IncludedItems;
