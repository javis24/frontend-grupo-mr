import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBusinessUnits = async () => {
  const response = await axios.get('https://backend-grupo-mr-production-2c03.up.railway.app/business-units');
  return response.data;
};

const BusinessUnits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['business-units'],
    queryFn: fetchBusinessUnits,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredUnits = data.filter(unit =>
    unit.unitName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Unidades de Negocio</h2>
      <input
        type="text"
        placeholder="Buscar unidad de negocio..."
        className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-64"> {/* Aquí se limita la altura y se agrega el scroll */}
        <ul className="space-y-2">
          {filteredUnits.map(unit => (
            <li key={unit.uuid} className="bg-gray-700 p-4 rounded-md">
              <p className="font-bold text-lg">{unit.unitName}</p>
              <p className="text-sm text-gray-400">{unit.description}</p>
              <p className="text-sm text-gray-400">Ventas: ${unit.sales}</p>
              <p className="text-sm text-gray-400">Responsable: {unit.user.name}</p>
              <p className="text-sm text-gray-400">Email: {unit.user.email}</p>
              <p className="text-sm text-gray-400">Role: {unit.user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusinessUnits;
