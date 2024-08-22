import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';
import Layout from '../pages/Layout';

moment.locale('es');
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onEventAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      start: selectedSlot.start,
      end: selectedSlot.end,
    };
    onEventAdd(newEvent);
  };

  return (
    <Layout>
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        messages={{
          next: "Sig",
          previous: "Ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango.",
          showMore: total => `+ Ver más (${total})`
        }}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
    </Layout>
  );
};

export default MyCalendar;
