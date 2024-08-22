import React, { useState } from "react";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Mañana");

  const handleSave = () => {
    onSave({ description, timeOfDay });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-6 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Agregar Nuevo Evento</h3>
          <div className="mt-2">
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Descripción del Evento"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="mt-2 p-2 w-full border rounded"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
            >
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Guardar Evento
            </button>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
