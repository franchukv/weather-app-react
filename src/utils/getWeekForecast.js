import { v4 as uuidv4 } from 'uuid';
import getWeatherMediaName from './getWeatherMediaName';
import getWeatherDescription from './getWeatherDescription';
import getWeatherIconUrl from './getWeatherIconUrl';

const getWeekForecast = (forecast) => {
  const { weather_code, temperature_2m_max, temperature_2m_min } =
    forecast.daily;

  return forecast.daily.time.slice(0, 5).map((date, index) => {
    return {
      id: uuidv4(),
      weekday: new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
      }),
      weather_icon: getWeatherIconUrl(
        getWeatherMediaName(weather_code[index], 1)
      ),
      weather_description: getWeatherDescription(weather_code[index], true),
      temperature_2m_max: temperature_2m_max[index],
      temperature_2m_min: temperature_2m_min[index],
    };
  });
};

export default getWeekForecast;
