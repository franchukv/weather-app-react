import useForecast from '../hooks/useForecast';

const Details = () => {
  const { forecast } = useForecast();
  const { apparent_temperature, wind_speed_10m, relative_humidity_2m } =
    forecast.current;
  const { precipitation_probability_max, uv_index_max } = forecast.daily;

  return (
    <dl className="details">
      <div className="details__item details__item--temperature">
        <dt className="details__title">Thermal sensation</dt>
        <dd className="details__value">{apparent_temperature}ºC</dd>
      </div>

      <div className="details__item details__item--rain">
        <dt className="details__title">Probability of rain</dt>
        <dd className="details__value">{precipitation_probability_max[0]}%</dd>
      </div>

      <div className="details__item details__item--wind">
        <dt className="details__title">Wind speed</dt>
        <dd className="details__value">{wind_speed_10m} km/h</dd>
      </div>

      <div className="details__item details__item--humidity">
        <dt className="details__title">Air humidity</dt>
        <dd className="details__value">{relative_humidity_2m}%</dd>
      </div>

      <div className="details__item details__item--sun">
        <dt className="details__title">UV Index</dt>
        <dd className="details__value">{uv_index_max[0]}</dd>
      </div>
    </dl>
  );
};

export default Details;
