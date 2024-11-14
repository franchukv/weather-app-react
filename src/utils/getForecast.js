const getForecast = async (latitude, longitude) => {
  const endpoint = `https://api.open-meteo.com/v1/forecast`;
  const params = `latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m,wind_speed_10m,temperature_2m,apparent_temperature,is_day,weather_code&daily=precipitation_probability_max,weather_code,temperature_2m_max,temperature_2m_min,uv_index_max`;

  try {
    const response = await fetch(`${endpoint}?${params}`);

    if (!response.ok) {
      console.error(response.statusText);
      return null;
    }

    return (await response.json()) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getForecast;
