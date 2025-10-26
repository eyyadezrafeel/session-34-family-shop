import { useState, FormEvent } from "react";
import Header from "../components/Header";

function CreateFamily() {
  const [familyName, setFamilyName] = useState("");
  const [message, setMessage] = useState("");
  const [family, setFamily] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) return;

    try {
      const res = await fetch("http://localhost:4000/family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add auth token here if needed
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: familyName.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.massage);
        setFamily(data.family);
        setFamilyName(""); // clear input
      } else {
        setMessage(data.massage || "Error creating family");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="max-w h-screen mx-auto bg-[#F4F6F8]">
        <Header></Header>
    <div className="p-4 mt-40">
      <h1 className="text-xl font-bold mb-2 text-[#B9A2E1]">Create Family</h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter family name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          className="border p-2 rounded flex-1 border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-[#A7E8BD] cursor-pointer text-white px-4 rounded hover:bg-[#8ED9A2]"
        >
          Create
        </button>
      </form>

      {message && <p className="text-green-600 mt-2">{message}</p>}

      {family && (
        <div className="border p-2 rounded mt-2">
          <p><strong>Name:</strong> {family.name}</p>
          <p><strong>Code:</strong> {family.code}</p>
          <p><strong>Invite Link:</strong> {family.inviteLink}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default CreateFamily;
