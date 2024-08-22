import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <h2 className="text-xl mb-4">
        Welcome Back, <strong>{user && user.name}</strong> <input type="text" placeholder="Search..." className="p-2 rounded" />
      </h2>
    </div>
  );
};

export default Welcome;
np