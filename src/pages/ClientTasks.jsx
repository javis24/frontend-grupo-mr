import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchClients = async () => {
  const response = await axios.get('http://localhost:5000/clients');
  return response.data;
};

const addTask = async (newTask) => {
  const response = await axios.post('http://localhost:5000/visits', newTask);
  return response.data;
};

const ClientTasks = () => {
  const { clientId } = useParams(); // Captura el uuid del cliente desde la URL
  const [clientData, setClientData] = useState(null);
  const { data: clients, error, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/clients/${clientId}`);
        setClientData(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleAddTask = (client) => {
    mutation.mutate({
      clientId: client.uuid,
      description: taskDescription,
    });
    setTaskDescription('');
  };

  if (isLoading || !clientData) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Clientes y Visitas</h1>

      <div className="p-6 bg-gray-800 text-white mb-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Detalles del Cliente</h2>
        <p><strong>Nombre:</strong> {clientData.fullName}</p>
        <p><strong>Contacto:</strong> {clientData.contactName}</p>
        <p><strong>Teléfono:</strong> {clientData.contactPhone}</p>
        <p><strong>Posición:</strong> {clientData.position}</p>
      </div>

      <div className="flex justify-between mb-4">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
          onClick={() => setSelectedClient(null)}
        >
          Agregar Tarea
        </button>
        <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
          Colaboradores
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">Tareas</h2>
      <div className="grid grid-cols-5 gap-4">
        {['Pendiente', 'En Espera', 'En Progreso', 'En Revisión', 'Completado'].map(
          (status) => (
            <div key={status} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{status}</h3>
              <div className="border-t-2 border-gray-300 mb-2"></div>
              {clients
                .filter((client) => client.status === status) // Filtrado por estado
                .map((client) => (
                  <div key={client.uuid} className="mb-2">
                    <p>{client.fullName}</p>
                    <button
                      className="text-blue-500 underline"
                      onClick={() => setSelectedClient(client)}
                    >
                      Agregar Descripción
                    </button>
                  </div>
                ))}
              <div className="text-center text-gray-500">No Hay tareas</div>
            </div>
          )
        )}
      </div>

      {selectedClient && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">
              Agregar Tarea para {selectedClient.fullName}
            </h3>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Descripción de la tarea..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => handleAddTask(selectedClient)}
            >
              Guardar Tarea
            </button>
            <button
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => setSelectedClient(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTasks;
