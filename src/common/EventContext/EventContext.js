import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the EventContext
export const EventContext = createContext();

export const useEventContext = () => {
    return useContext(EventContext);
}

export const EventProvider = ({ children }) => {
    const [event, setEvent] = useState({
        isEvent:false,
        type: "default",
        message:""
    });



  return (
    <EventContext.Provider value={{ event,setEvent }}>
      {children}
    </EventContext.Provider>
  );
};



