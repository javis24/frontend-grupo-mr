import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddClient = () => {
  const [fullName, setFullName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [position, setPosition] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-grupo-mr-production-2c03.up.railway.app/clients", {
        fullName: fullName,
        contactName: contactName,
        contactPhone: contactPhone,
        position: position,
      });
      navigate("/clients");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Client</h1>
      <form onSubmit={saveClient}>
        {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contacto</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Contacto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teléfono de contacto</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Teléfono..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Posición</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Posición"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddClient;
