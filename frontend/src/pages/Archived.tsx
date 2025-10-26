import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  status: "PENDING" | "INCLUDED" | "SKIPPED";
};

type ShoppingList = {
  id: number;
  weekStart: string;
  weekEnd: string;
  archived: boolean;
  items: Item[];
};

const ArchivedLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");

    const fetchArchivedLists = async () => {
      try {
        const res = await API.get("/archiveList", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLists(res.data.lists || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArchivedLists();
  }, []);

  return (
    <div className=" max-w h-screen mx-auto   bg-[#F4F6F8]">
      <Header />
      <div className="p-4 max-w-2xl mx-auto mt-40">
        <h2 className="text-xl font-bold mb-2 text-[#B9A2E1]">Archived Shopping Lists</h2>

        {lists.length === 0 && (
          <p className="text-gray-600">No archived lists yet.</p>
        )}

        <div className="space-y-6">
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-gray-100 rounded-lg p-4 shadow-sm border"
            >
              <div className="mb-2">
                <h3 className="font-semibold text-lg">
                  Week of{" "}
                  {new Date(list.weekStart).toLocaleDateString()} -{" "}
                  {new Date(list.weekEnd).toLocaleDateString()}
                </h3>
                <p className="text-sm text-gray-500">
                  {list.items.length} items archived
                </p>
              </div>

              <ul className="pl-4 space-y-1">
                {list.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-gray-800 bg-white rounded px-3 py-1 shadow-sm"
                  >
                    {item.name}{" "}
                    <span className="text-xs text-gray-500">
                      ({item.status})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedLists;
