import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    const response = await axios.get("https://backend-grupo-mr-production-2c03.up.railway.app/clients");
    setClients(response.data);
  };

  const deleteClient = async (clientId) => {
    await axios.delete(`https://backend-grupo-mr-production-2c03.up.railway.app/clients/${clientId}`);
    getClients(); // Llama a getClients para actualizar la lista después de eliminar
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <h2 className="text-xl mb-4">List of Clients</h2>
      <Link
        to="/clients/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block transition duration-300"
      >
        Add New
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Contacto</th>
            <th className="px-4 py-2 border-b">Teléfono de Contacto</th>
            <th className="px-4 py-2 border-b">Posición</th>
            <th className="px-4 py-2 border-b">Actions</th> {/* Añadido */}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.uuid}>
              <td className="px-4 py-2 border-b text-center">{index + 1}</td>
              <td className="px-4 py-2 border-b">{client.fullName}</td>
              <td className="px-4 py-2 border-b">{client.contactName}</td>
              <td className="px-4 py-2 border-b">{client.contactPhone}</td>
              <td className="px-4 py-2 border-b">{client.position}</td>
              <td className="px-4 py-2 border-b text-center space-x-2">
                <Link
                  to={`/clients/edit/${client.uuid}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded transition duration-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteClient(client.uuid)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
