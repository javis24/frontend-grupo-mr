import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchClients = async () => {
  const response = await axios.get('https://backend-grupo-mr-production-2c03.up.railway.app/clients');
  return response.data;
};

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredClients = data.filter(client =>
    client.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClient = (id) => {
    navigate(`/client-tasks/${id}`); // Redirige a la página de ClientTasks con el uuid del cliente
  };

  const handleEditClient = (id) => {
    navigate(`/clients/edit/${id}`);
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`https://backend-grupo-mr-production-2c03.up.railway.app/clients/${id}`);
      // Refresh the list after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Clientes</h2>
      <input
        type="text"
        placeholder="Buscar cliente..."
        className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-64">
        <ul className="space-y-2">
          {filteredClients.map(client => (
            <li key={client.uuid} className="bg-gray-700 p-4 rounded-md">
              <p className="font-bold text-lg">{client.fullName}</p>
              <p className="text-sm text-gray-400">Contacto: {client.contactName}</p>
              <p className="text-sm text-gray-400">Teléfono: {client.contactPhone}</p>
              <p className="text-sm text-gray-400">Posición: {client.position}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleViewClient(client.uuid)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Ver
                </button>
                <button
                  onClick={() => handleEditClient(client.uuid)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClient(client.uuid)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Clients;
