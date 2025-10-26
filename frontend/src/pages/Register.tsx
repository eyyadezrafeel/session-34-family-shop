import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [familyCode, setFamilyCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password, familyCode });
      localStorage.setItem("token", res.data.token);
      navigate("/shopping");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-96 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Family code (optional)"
          value={familyCode}
          onChange={(e) => setFamilyCode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded">Register</button>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
