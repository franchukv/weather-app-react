const getWeatherIconUrl = (weatherName, isBg = false) => {
  const bg = isBg ? 'backgrounds' : 'weather-icons';

  try {
    return require(`../assets/images/svg/${bg}/${weatherName}.svg`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getWeatherIconUrl;
