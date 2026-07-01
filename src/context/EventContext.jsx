import React, { createContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

export const EventContext = createContext({
  activeEvent: null,
  isLoading: true,
  switchEvent: async () => {},
  refreshActiveEvent: async () => {},
  activeEventId: null
});

export const EventProvider = ({ children }) => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDefaultEvent = async () => {
    setIsLoading(true);
    try {
      const events = await StorageService.getEvents();
      if (events.length > 0) {
        setActiveEvent(events[0]); // Auto-select the newest/most recently created event
      } else {
        setActiveEvent(null);
      }
    } catch (error) {
      console.error("Failed to load default active event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultEvent();
  }, []);

  const switchEvent = async (eventId) => {
    if (!eventId) {
      setActiveEvent(null);
      return;
    }
    setIsLoading(true);
    try {
      const event = await StorageService.getEventById(eventId);
      setActiveEvent(event);
    } catch (error) {
      console.error("Failed to switch active event:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshActiveEvent = async () => {
    if (!activeEvent?.id) return;
    try {
      const event = await StorageService.getEventById(activeEvent.id);
      setActiveEvent(event);
    } catch (error) {
      console.error("Failed to refresh active event:", error);
    }
  };

  return (
    <EventContext.Provider value={{
      activeEvent,
      activeEventId: activeEvent?.id || null,
      isLoading,
      switchEvent,
      refreshActiveEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};
