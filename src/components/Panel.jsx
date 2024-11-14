import { useEffect, useState } from 'react';
import useForecast from '../hooks/useForecast';
import { formateDate, formateTime } from '../utils/formateDate';
import getWeatherDescription from '../utils/getWeatherDescription';
import getWeatherMediaName from '../utils/getWeatherMediaName';
import getWeatherIconUrl from '../utils/getWeatherIconUrl';

const Panel = () => {
  const { forecast, locationInfo } = useForecast();
  const { temperature_2m, weather_code, is_day } = forecast.current;
  const { temperature_2m_min, temperature_2m_max } = forecast.daily;
  const [currentDate, setCurrentDate] = useState(
    formateDate(locationInfo.timezone)
  );
  const [currentTime, setCurrentTime] = useState(
    formateTime(locationInfo.timezone)
  );
  const [weatherInfo, setWeatherInfo] = useState({
    bg: null,
    icon: null,
    description: null,
  });

  const updateTime = () => {
    setCurrentTime(formateTime(locationInfo.timezone));
  };

  const updateDate = () => {
    setCurrentDate(formateDate(locationInfo.timezone));
  };

  useEffect(() => {
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;
    const timeout = setTimeout(() => updateTime(), delay);
    const interval = setInterval(updateTime, 60000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [locationInfo.timezone]);

  useEffect(() => {
    const now = new Date();
    const delay =
      ((24 - now.getHours() - 1) * 60 * 60 +
        (60 - now.getMinutes() - 1) * 60 +
        (60 - now.getSeconds())) *
      1000;
    const timeout = setTimeout(() => updateDate(), delay);
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [locationInfo.timezone]);

  useEffect(() => {
    (async () => {
      try {
        const weatherName = getWeatherMediaName(weather_code, is_day);

        setWeatherInfo({
          bg: getWeatherIconUrl(weatherName, true),
          icon: getWeatherIconUrl(weatherName),
          description: getWeatherDescription(weather_code),
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [weather_code, is_day]);

  return (
    <div
      className="panel"
      style={{
        backgroundImage: `url(${weatherInfo.bg})`,
      }}
    >
      <div className="panel__top">
        <div className="panel__col">
          <div className="panel__location">{locationInfo.name}</div>
          <div className="panel__date">{currentDate}</div>
        </div>

        <div className="panel__time">{currentTime}</div>
      </div>

      <div className="panel__bottom">
        <div className="panel__col">
          <div className="panel__current-temperature">
            {temperature_2m}
            ºC
          </div>

          <div className="panel__row">
            <div className="panel__temperature-gradation">
              {temperature_2m_min[0]}ºC / {temperature_2m_max[0]}ºC
            </div>
            <div className="panel__description">{weatherInfo.description}</div>
          </div>
        </div>

        <div
          className="panel__icon"
          style={{
            backgroundImage: `url(${weatherInfo.icon})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Panel;
