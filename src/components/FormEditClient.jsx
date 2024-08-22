import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditClient = () => {
    const [fullname, setFullname] = useState("");
    const [contactname, setContactname] = useState("");
    const [contactphone, setContactphone] = useState("");
    const [position, setPosition] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

  useEffect(() => {
    const getClientById = async () => {
      try {
        const response = await axios.get(`https://backend-grupo-mr-production-2c03.up.railway.app/clients/${id}`);
        setFullname(response.data.fullname);
        setContactname(response.data.contactname);
        setContactphone(response.data.contactphone);
        setPosition(response.data.position);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getClientById();
  }, [id]);

  const updateClient = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://backend-grupo-mr-production-2c03.up.railway.app/clients/${id}`, {
        fullname: fullname,
        contactname: contactname,
        contactphone: contactphone,
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
    <h1 className="text-2xl font-bold mb-6">Edit Client</h1>
    <form onSubmit={saveClient}>
      {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Contacto</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={contactname}
          onChange={(e) => setContactname(e.target.value)}
          placeholder="Contacto"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Teléfono de Contacto</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={contactphone}
          onChange={(e) => setContactphone(e.target.value)}
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

export default FormEditClient;
