import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-blue-600 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1">
              <Mail className="text-blue-500" size={20} />
              <input
                type="email"
                className="ml-2 w-full focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1">
              <Lock className="text-blue-500" size={20} />
              <input
                type="password"
                className="ml-2 w-full focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
