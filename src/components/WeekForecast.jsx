import { useState, useEffect } from 'react';
import useForecast from '../hooks/useForecast';
import getWeekForecast from '../utils/getWeekForecast';

const WeekForecast = () => {
  const { forecast } = useForecast();
  const [weekForecast, setWeekForecast] = useState(getWeekForecast(forecast));

  useEffect(() => {
    if (forecast) {
      setWeekForecast(getWeekForecast(forecast));
    }
  }, [forecast]);

  return (
    <div className="week-forecast">
      {weekForecast !== null &&
        weekForecast.map(
          ({
            id,
            weekday,
            weather_icon,
            weather_description,
            temperature_2m_min,
            temperature_2m_max,
          }) => {
            return (
              <div className="week-forecast__item" key={id}>
                <h6 className="week-forecast__title">{weekday}</h6>

                <div
                  className="week-forecast__icon"
                  style={{
                    backgroundImage: `url(${weather_icon})`,
                  }}
                ></div>

                <span className="week-forecast__description">
                  {weather_description}
                </span>

                <div className="week-forecast__temperatures">
                  <span className="week-forecast__temperature week-forecast__temperature--max">
                    {temperature_2m_min}ºC
                  </span>
                  <span className="week-forecast__temperature week-forecast__temperature--min">
                    {temperature_2m_max}ºC
                  </span>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default WeekForecast;
