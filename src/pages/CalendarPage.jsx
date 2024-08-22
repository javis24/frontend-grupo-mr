import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from '../components/Calendar';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        const fetchedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start),  // Convertir a objeto Date
          end: new Date(event.end),      // Convertir a objeto Date
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventAdd = async (event) => {
    try {
      const response = await axios.post('http://localhost:5000/events', {
        ...event,
        start: new Date(event.start),  // Convertir a objeto Date
        end: new Date(event.end),      // Convertir a objeto Date
      });
      setEvents([...events, {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      }]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return <MyCalendar events={events} onEventAdd={handleEventAdd} />;
};

export default CalendarPage;
