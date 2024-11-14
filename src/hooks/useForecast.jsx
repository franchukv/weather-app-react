import { useContext } from 'react';
import { ForecastContext } from '../context/ForecastContext';

const useForecast = () => {
  const forecastContext = useContext(ForecastContext);

  if (!forecastContext) {
    console.error('useForecast must be used within a ForecastContextProvider');
  }

  return forecastContext;
};

export default useForecast;
