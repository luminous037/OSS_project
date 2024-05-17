import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [percentage, setPercentage] = useState(() => {
    const savedPercentage = localStorage.getItem('cloudPercentage');
    return savedPercentage ? JSON.parse(savedPercentage) : 0;
  });

  const [rainCount, setRainCount] = useState(0);

  return (
    <StateContext.Provider value={{ percentage, setPercentage, rainCount, setRainCount }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
