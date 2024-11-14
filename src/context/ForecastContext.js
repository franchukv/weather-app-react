import { createContext, useState } from 'react';

const ForecastContext = createContext();

const ForecastContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [locationInfo, setLocationInfo] = useState({ name: '', timezone: '' });

  const addForecast = (newForecast) => {
    setForecast({ ...forecast, ...newForecast });
  };

  const addLocationInfo = (newLocationInfo) => {
    setLocationInfo({ ...locationInfo, ...newLocationInfo });
  };

  const value = { forecast, locationInfo, addLocationInfo, addForecast };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};

export { ForecastContext, ForecastContextProvider };
