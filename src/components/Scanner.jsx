import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const Scanner = ({ trafficLightId }) => {
  const [result, setResult] = useState('');

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      try {
        await axios.patch(`https://backend-grupo-mr-production-2c03.up.railway.app/traffic-light/${trafficLightId}`, {
          status: 'green'
        });
        alert('Código escaneado correctamente. Semáforo en verde.');
      } catch (error) {
        console.error('Error al actualizar el semáforo:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Escanear Código</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
};

export default Scanner;
