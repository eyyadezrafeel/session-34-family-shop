import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/shopping");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-96 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Login</button>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
