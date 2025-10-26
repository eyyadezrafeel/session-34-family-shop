import { useState } from "react";
import API from "../api/axiosInstance";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const JoinFamily = () => {
  const [familyCode, setFamilyCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyCode.trim()) return;

    try {
      const res = await API.post(
        "/family/join",
        { code: familyCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Successfully joined the family!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to join family. Check the code.");
    }
  };

  return (
   <div className=" max-w h-screen mx-auto mt-40 bg-[#F4F6F8]">
    <Header></Header>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-2 text-[#B9A2E1]">Join Family</h2>
        {message && <p className="mb-4">{message}</p>}
        <form onSubmit={handleJoin} className="flex gap-2">
          <input
            type="text"
            value={familyCode}
            onChange={e => setFamilyCode(e.target.value)}
            placeholder="Enter family code"
            className="flex-1 border p-2 rounded border-gray-300"
            required
          />
          <button type="submit" className="bg-[#A7E8BD] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#8ED9A2]">
            Join
          </button>
        </form>


      </div>
    </div>
  );
};

export default JoinFamily;
