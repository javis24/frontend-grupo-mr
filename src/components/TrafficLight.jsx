import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrafficLight = ({ trafficLightId }) => {
  const [status, setStatus] = useState('red');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`https://backend-grupo-mr-production-2c03.up.railway.app/traffic-light/${trafficLightId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error al obtener el estado del semáforo:', error);
      }
    };
    fetchStatus();
  }, [trafficLightId]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Estado del Semáforo</h1>
      <div className={`w-32 h-32 rounded-full ${status === 'red' ? 'bg-red-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
      <p className="mt-4 text-xl">{status === 'red' ? 'Rojo' : status === 'yellow' ? 'Amarillo' : 'Verde'}</p>
    </div>
  );
};

export default TrafficLight;
