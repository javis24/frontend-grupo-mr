import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gradient-to-r bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
          <img src="/logo_mr.png" alt="Logo" className="h-24 w-24" />
        </div>
        <form onSubmit={Auth} className="space-y-4">
          {isError && <p className="text-center text-red-500">{message}</p>}
          <div>
            <label htmlFor="email" className="block text-sm text-black">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full h-12 border border-gray-800 px-3 rounded-lg text-black"
              placeholder="Ingresa tu correo corporativo"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full h-12 border border-gray-800 px-3 rounded-lg text-black"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#ffcd00] via-[#009ace] to-[#00cd0e] text-white font-semibold rounded-lg"
          >
            {isLoading ? "Loading..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
