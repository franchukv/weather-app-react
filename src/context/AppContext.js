import { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  const [isForecastActive, setIsForecastActive] = useState(false);

  const toggleIsForecastLoading = (boolean) => {
    setIsForecastLoading(boolean);
  };

  const toggleIsForecastActive = (boolean) => {
    setIsForecastActive(boolean);
  };

  const value = {
    isForecastLoading,
    isForecastActive,
    toggleIsForecastLoading,
    toggleIsForecastActive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
