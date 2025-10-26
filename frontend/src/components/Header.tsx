import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api/axiosInstance";
import { Menu } from "lucide-react";

type UserInfo = {
  email: string;
  family?: { name: string };
};

const Header = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const location = useLocation(); // 👈 get current path

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const navLinks = [
    { name: "Shopping", path: "/shopping" },
    { name: "Included", path: "/included" },
    { name: "Archived", path: "/archivedList" },
    { name: "Join Family", path: "/join" },
    { name: "Create Family", path: "/create" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F4F6F8] shadow-md z-51 p-4 flex flex-col gap-4 ">
      <div className="flex w-full justify-between items-center border-b p-2">
        <h1 className="text-xl font-bold text-[#B9A2E1]">{user?.email || "Guest"}</h1>
        {user?.family && <h3 className="text-gray-400">{user.family.name}</h3>}
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>

      <nav className="flex gap-4 items-center mt-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`font-normal px-3 py-1 rounded transition-colors duration-200
              ${
                location.pathname === link.path
                  ? "bg-[#5DADEC] text-white" // active link
                  : "text-[#5DADEC] hover:bg-[#A7E8BD] hover:text-white"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
