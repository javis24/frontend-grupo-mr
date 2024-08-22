import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async () => {
  const response = await axios.get('https://backend-grupo-mr-production-2c03.up.railway.app/users');
  return response.data;
};

const GetAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'], // Nombre de la consulta
    queryFn: fetchUsers, // Función que realiza la consulta
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtra los usuarios según el término de búsqueda
  const filteredUsers = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md mx-4 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Usuarios Activos</h2>
      </div>
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="mb-4 w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-2 overflow-y-auto max-h-40">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <span className={`text-sm font-bold ${user.role === 'admin' ? 'text-green-400' : 'text-yellow-400'}`}>
                {user.role}
              </span>
            </li>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </ul>
    </div>
  );
};

export default GetAllUsers;
