import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  return (
    <PromptContext.Provider value={{ deferredPrompt, setDeferredPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};


//전역으로 deferredPrompt 사용
